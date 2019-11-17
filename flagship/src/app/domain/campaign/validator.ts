import { Campaign } from './campaign';
import { Issue, IssueSeverity } from './issue';
import { Team } from './team';
import { Faction } from '../game/faction';
import { CampaignLocation } from './campaignLocation';
import { LocationControlType } from './locationControlType';
import { CampaignUser } from './campaignUser';
import { FleetService } from 'src/app/core/services/fleet.service';
import { Fleet } from '../game/fleet';

export interface Validator {
    validateSetupPhase(campaign: Campaign): Issue[];
}

export class RITRValidator implements Validator {

    public validateSetupPhase(campaign: Campaign): Issue[] {
        let issues: Issue[] = [];

        // Errors
        if (!this.areTeamsBalanced(campaign)) {
            issues.push(this.error('Teams are unbalanced. Each team should have the same number of players.'));
        }
        if (!this.teamHasCorrectNumberOfPlayers(campaign.empire)) {
            issues.push(this.error('The Empire team has an incorrect number of players. Each team should have 2 or 3 players.'))
        }
        if (!this.teamHasCorrectNumberOfPlayers(campaign.rebels)) {
            issues.push(this.error('The Rebel team has an incorrect number of players. Each team should have 2 or 3 players.'))
        }
        if (!this.teamHasPlacedBases(campaign.empire, campaign.locations)) {
            issues.push(this.error('The Empire team has the incorrect number of bases placed.  Each team should have 1 base per player.'))
        }
        if (!this.teamHasPlacedBases(campaign.rebels, campaign.locations)) {
            issues.push(this.error('The Rebel team has the incorrect number of bases placed.  Each team should have 1 base per player.'))
        }

        let playersControllingBothSides = this.getPlayersControllingBothSides(campaign);
        for (const player of playersControllingBothSides) {
            issues.push(this.warning(`${player.displayName} is controlling players on each team.  This user will be able to see both teams' secret information.`))
        }

        if (campaign.fleets !== null) {
            // valdiate fleet issues
            let empireUniques: string[] = [];
            let rebelUniques: string[] = [];

            for (const player of campaign.getPlayers()) {
                let fleet = campaign.fleets[player.fleetId];

                if (!this.fleetHasObjectivesSet(fleet)) {
                    issues.push(this.warning(`${player.name}'s fleet does not have all objectives set.  This will impact Flagship's ability to record the correct objectives for battles.`))
                }

                if (!this.fleetHasReasonablePointsForSetup(fleet)) {
                    issues.push(this.warning(`${player.name}'s fleet currently has ${fleet.currentPoints()} - are you sure this is correct?`));
                }

                let fleetUniques = fleet.getEquippedUniqueNames();
                for (const unique of fleetUniques) {
                    if ((fleet.faction === Faction.Empire ? empireUniques : rebelUniques).includes(unique)) {
                        issues.push(this.error(`${player.name}'s fleet has ${unique} equipped, which is already equipped in a teammate's fleet.`));
                    }
                }
                if (fleet.faction === Faction.Empire) {
                    empireUniques = empireUniques.concat(fleetUniques);
                } else {
                    rebelUniques = rebelUniques.concat(fleetUniques);
                }
            }
        }

        return issues;
    }

    private info(text: string): Issue {
        return { text: text, severity: IssueSeverity.Info };
    }

    private warning(text: string): Issue {
        return { text: text, severity: IssueSeverity.Warning };
    }

    private error(text: string): Issue {
        return { text: text, severity: IssueSeverity.Error };
    }


    private areTeamsBalanced(campaign: Campaign): boolean {
        return campaign.empire.numberOfPlayers() === campaign.rebels.numberOfPlayers();
    }

    private teamHasCorrectNumberOfPlayers(team: Team): boolean {
        return team.players &&
            (team.numberOfPlayers() == 2 || team.numberOfPlayers() == 3);
    }

    private teamHasPlacedBases(team: Team, locations: CampaignLocation[]): boolean {
        let numBases = team.numberOfPlayers();
        let teamBases = locations.filter(x => x.controllingFaction === team.faction &&
            x.controlType === LocationControlType.Base);

        return teamBases.length === numBases;
    }

    private getPlayersControllingBothSides(campaign: Campaign): CampaignUser[] {
        let players = [];
        for (const player of campaign.campaignUsers) {
            let empirePlayer = campaign.empire.players.find(x => x.playerUid === player.uid);
            let rebelPlayer = campaign.rebels.players.find(x => x.playerUid === player.uid);
            if (empirePlayer && rebelPlayer) {
                players.push(player);
            }
        }
        return players;
    }

    private fleetHasObjectivesSet(fleet: Fleet): boolean {
        return fleet.objectives && fleet.objectives.length === 3;
    }

    private fleetHasReasonablePointsForSetup(fleet: Fleet): boolean {
        const points = fleet.currentPoints();
        return points >= 150 && points <= 200;
    }

}
