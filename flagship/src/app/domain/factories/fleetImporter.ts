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
            return factionLine.includes('Rebel') ? Faction.Rebels : Faction.Empire;
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
                for (let i = 0; i < count; i++)
                    fleet.addSquadron(squadron);
            }
        }
    }

    private getSquadron(line: string, fleet: Fleet): Squadron {
        if (!line || !line.match(/^\d/)) return null;

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
        if (!line) return null;
        if (!line.startsWith('-')) return null;

        let name = line.substring(line.indexOf('-') + 1, line.indexOf('(')).trim();
        let points = +(line.substring(line.indexOf('(') + 1, line.indexOf('p', line.indexOf('('))).trim());

        return this.upgradeFactory.getUpgradeMatchingCriteria(fleet.faction, name, points);
    }

    private getShip(line: string, fleet: Fleet): Ship {
        if (!line) return null;
        let ships = this.shipFactory.getShips(fleet.faction);
        let shipData = ships.find(x => line.includes(x.name));
        if (!shipData) return null;

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
        if (!line) return null;

        let name = line.substring(line.indexOf(':') + 1).trim();
        return this.objectiveFactory.getObjectiveByName(name);
    }
}
/*

World test 2 rebels

Faction: Rebel Alliance
Points: 386/400
Commander: Admiral Raddus

Assault Objective: Surprise Attack
Defense Objective: Capture the VIP
Navigation Objective: Superior Positions


[ flagship ] MC75 Ordnance Cruiser (100 points)
-  Admiral Raddus  ( 26  points)
-  Profundity  ( 7  points)
-  Ordnance Experts  ( 4  points)
-  Early Warning System  ( 7  points)
-  External Racks  ( 3  points)
-  Flechette Torpedoes  ( 3  points)
= 150 total ship cost


GR-75 Medium Transports (18 points)
= 18 total ship cost


MC80 Assault Cruiser (114 points)
-  Home One  ( 7  points)
-  Slaved Turrets  ( 6  points)
-  Leading Shots  ( 4  points)
= 131 total ship cost


1 Dash Rendar ( 24 points)
1 Corran Horn ( 22 points)
1 Ketsu Onyo ( 22 points)
1 Kanan Jarrus ( 19 points)
= 87 total squadron cost

*/