import { Component, OnInit, Input } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { Faction, oppositeFaction } from 'src/app/domain/game/faction';

@Component({
  selector: 'flagship-finished-campaign',
  templateUrl: './finished-campaign.component.html',
  styleUrls: ['./finished-campaign.component.scss']
})
export class FinishedCampaignComponent implements OnInit {
  @Input() campaign: Campaign;

  factions = Faction;

  winner: Faction;
  marginOfVictory: number;
  outcomes = {
    stalemate: {
      label: "Stalemate",
      text: "The outcome of the wider war will be decided in a different theater than the Mid and Outer Rim. The seasoned commanders of each side prepare for greater challenges."
    },
    minor: {
      label: "Minor Victory",
      text: "The winning faction has achiefed superiority in the Rim. Its commanders know that their efforts have pleased their superiors. The losing faction's commanders must regroup, but defeat is often a greater teacher than victory."
    },
    major: {
      label: "Major Victory",
      text: "The winning faction has scattered the enemy from the Mid and Outer Rim and gained upper hand in the Galactic Civil War. Its commanders have earned lasting fame (or infamy) for their actions. The losing faction withdraws to rebuild, its commanders summoned to headquarters for a tense meeting with command... or an audience with Lord Vader."
    }
  }
  outcome: any;

  constructor() { }

  ngOnInit() {
    this.winner = oppositeFaction(this.campaign.getLosingFaction())
    this.marginOfVictory = Math.abs(this.campaign.empire.campaignPoints - this.campaign.rebels.campaignPoints);
    if (this.marginOfVictory <= 1) {
      this.outcome = this.outcomes.stalemate;
    } else if (this.marginOfVictory <= 3) {
      this.outcome = this.outcomes.minor;
    } else {
      this.outcome = this.outcomes.major;
    }
  }

}
