import { Fleet } from '../game/fleet';
import { Issue, IssueSeverity } from '../campaign/issue';
import { Faction } from '../game/faction';
import { ObjectiveFactory } from './objectiveFactory';
import { Objective } from '../game/objective';
import { Ship } from '../game/ship';
import { ShipFactory } from './shipFactory';
import { Upgrade } from '../game/upgrade';
import { UpgradeFactory } from './upgradeFactory';
import { SquadronFactory } from './squadronFactory';
import { Squadron } from '../game/squadron';

export interface ImportResult {
    fleet: Fleet;
    issues: Issue[];
}

export interface FleetImporter {
    import(): ImportResult;
}

class ImportError extends Error {
    public issues: Issue[] = [];

    constructor(issue: string) {
        super(issue);
        this.issues.push({
            severity: IssueSeverity.Error,
            text: issue
        });
    }
}

export class AWFleetImporter implements FleetImporter {
    private lines: string[] = [];
    private upgradeFactory = new UpgradeFactory();
    private shipFactory = new ShipFactory();
    private squadronFactory = new SquadronFactory();
    private objectiveFactory = new ObjectiveFactory();

    constructor(text: string) {
        this.lines = this.preProcess(text);
    }

    import(): ImportResult {
        try {
            let name = this.getName();
            let author = 'todo';
            let faction = this.getFaction();
            let pointLimit = this.getPointLimit();
            let squadronPointLimit = Math.ceil(pointLimit / 3.0);

            let fleet = new Fleet(null, name, author, faction, pointLimit, squadronPointLimit);

            this.setFleetObjectives(fleet);
            this.setFleetShips(fleet);
            this.setFleetSquadrons(fleet);

            return { fleet: fleet, issues: [] }
        } catch (error) {
            if (error instanceof ImportError) {
                return { fleet: null, issues: error.issues };
            }
            return {
                fleet: null, issues: [
                    { severity: IssueSeverity.Error, text: "An unknown error occurred while importing the fleet." }
                ]
            };
        }
    }

    private preProcess(text: string): string[] {
        return text.split('\n').filter(x => x && x.length > 0);
    }

    private getName(): string {
        return this.lines.length > 0 ? this.lines[0] : 'Unknown';
    }

    private getFaction(): Faction {
        let factionLine = this.lines.find(x => x.startsWith('Faction:'));
        if (factionLine) {
            if (factionLine.includes('Rebel')) {
                return Faction.Rebels;
            }
            if (factionLine.includes('Empire')) {
                return Faction.Empire;
            }
            if (factionLine.includes('Sep')) {
                return Faction.Separatists;
            }
            if (factionLine.includes('Rep')) {
                return Faction.Republic;
            }
        }
        throw new ImportError('Could not determine faction for imported fleet.');
    }

    private getPointLimit(): number {
        let pointLine = this.lines.find(x => x.startsWith('Points:'));
        if (!pointLine) {
            throw new ImportError('Could not determine the point limit for the imported fleet.');
        }

        let limit = pointLine.substring(pointLine.indexOf('/') + 1).trim();
        return +limit;
    }

    private setFleetSquadrons(fleet: Fleet) {
        for (const line of this.lines) {
            let squadron = this.getSquadron(line, fleet);
            if (squadron) {
                let count = +(line.substring(0, line.indexOf(' ')));
                for (let i = 0; i < count; i++) {
                    fleet.addSquadron(squadron);
                }
            }
        }
    }

    private getSquadron(line: string, fleet: Fleet): Squadron {
        if (!line || !line.match(/^\d/)) { return null; }

        let name = line.substring(line.indexOf(' ') + 1, line.indexOf('(')).trim();
        let data = this.squadronFactory.getSquadronByName(name);
        return data ? this.squadronFactory.instantiateSquadron(data.id) : null;
    }

    private setFleetShips(fleet: Fleet) {
        let ship: Ship = null;
        for (const line of this.lines) {
            let newShip = this.getShip(line, fleet);
            if (!ship && newShip) {
                ship = newShip;
                fleet.addShip(newShip);
            } else if (ship) {
                let upgrade = this.getUpgrade(line, fleet);
                if (upgrade) {
                    ship.equipUpgrade(upgrade);
                } else {
                    ship = null;
                }
            }
        }
    }

    private getUpgrade(line: string, fleet: Fleet): Upgrade {
        if (!line) { return null; }
        if (!line.startsWith('-')) { return null; }

        let name = line.substring(line.indexOf('-') + 1, line.indexOf('(')).trim();
        let points = +(line.substring(line.indexOf('(') + 1, line.indexOf('p', line.indexOf('('))).trim());

        return this.upgradeFactory.getUpgradeMatchingCriteria(fleet.faction, name, points);
    }

    private getShip(line: string, fleet: Fleet): Ship {
        if (!line) { return null; }
        let ships = this.shipFactory.getShips(fleet.faction);
        let shipData = ships.find(x => line.includes(x.name));
        if (!shipData) { return null; }

        return this.shipFactory.instantiateShip(shipData.id);
    }

    private setFleetObjectives(fleet: Fleet) {
        let assaultObj = this.getObjective(this.lines.find(x => x.startsWith('Assault Objective:')));
        let defenseObj = this.getObjective(this.lines.find(x => x.startsWith('Defense Objective:')));
        let navigationObj = this.getObjective(this.lines.find(x => x.startsWith('Navigation Objective:')));

        if (assaultObj) {
            fleet.setObjective(assaultObj);
        }
        if (defenseObj) {
            fleet.setObjective(defenseObj);
        }
        if (navigationObj) {
            fleet.setObjective(navigationObj);
        }
    }

    private getObjective(line: string): Objective {
        if (!line) { return null; }

        let name = line.substring(line.indexOf(':') + 1).trim();
        return this.objectiveFactory.getObjectiveByName(name);
    }
}
