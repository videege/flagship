import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignEvent, CampaignEventType } from 'src/app/domain/campaign/campaignEvent';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Battle } from 'src/app/domain/campaign/battle';
import { CampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';
import { BattleState } from 'src/app/domain/campaign/battleState';
import { Faction } from 'src/app/domain/faction';
import { Phase } from 'src/app/domain/campaign/phase';

interface TimelineEvent {
  title: string;
  side: string;
  content: string;
  dot: TimelineDot;
}

interface TimelineDot {
  icon: string;
  dotSize: number;
  dotClass: string;
}

@Component({
  selector: 'flagship-event-timeline',
  templateUrl: './event-timeline.component.html',
  styleUrls: ['./event-timeline.component.scss']
})
export class EventTimelineComponent implements OnInit, OnChanges {


  @Input() campaign: Campaign;

  events: TimelineEvent[] = [];
  players: { [id: string]: CampaignPlayer; };

  constructor() { }

  ngOnInit() {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setup();
  }

  setup() {
    this.events = [];
    this.players = this.campaign.getPlayersMap();
    let states = this.campaign.history;
    let act = 1;
    let lastState: CampaignState = states[0];
    for (const state of states) {
      if (state.act > act) {
        act = state.act;
        this.events.push({
          title: `End of Act ${lastState.actInRomanNumerals()}`,
          content: `Rebels scored ${lastState.rebelPointsScored} points - Empire scored ${lastState.imperialPointsScored} points.`,
          side: null,
          dot: {
            icon: null,
            dotSize: 60,
            dotClass: 'accent'
          }
        });
      }
      
      this.events.push(...state.events.map(x => this.createTimelineEvent(state, x)));
      lastState = state;

      if (state.phase === Phase.Finished) {
        this.events.push({
          title: `End of Campaign`,
          content: `Rebels scored ${this.campaign.rebels.campaignPoints} points - Empire scored ${this.campaign.empire.campaignPoints} points.`,
          side: null,
          dot: {
            icon: null,
            dotSize: 60,
            dotClass: 'accent'
          }
        })
      }
    }
  }

  createTimelineEvent(state: CampaignState, event: CampaignEvent): TimelineEvent {
    let content = this.getContent(event);
    return {
      title: event.title,
      side: `Act ${state.actInRomanNumerals()} Turn ${state.turn}`,
      content: content,
      dot: this.getDot(event)
    }
  }

  getDot(event: CampaignEvent): TimelineDot {
    if (event.eventType === CampaignEventType.Battle) {
      let battle = <Battle>event;
      if (battle.state === BattleState.Declared) {
        return {
          icon: null,
          dotClass: 'accent',
          dotSize: 30
        };
      } else {
        return {
          icon: battle.getWinnerFaction(this.campaign.empire) === Faction.Empire
            ? 'ffi ffi-imperial faction-timeline-icon' : 'ffi ffi-rebel faction-timeline-icon',
          dotClass: 'primary',
          dotSize: 45
        };
      }
    }
    return {
      icon: null,
      dotClass: 'accent',
      dotSize: 30
    };
  }

  getContent(event: CampaignEvent): string {
    if (event.eventType === CampaignEventType.Battle) {
      let battle = <Battle>event;
      let attackers = battle.attackingPlayers.map(x => this.players[x.playerId].name).join(", ");
      let defenders = battle.defendingPlayers.map(x => this.players[x.playerId].name).join(", ");
      if (battle.state === BattleState.Declared) {
        return `This battle has been declared but not yet fought.`;
      } else if (battle.state === BattleState.AttackersWon) {
        return `Attacker(s) win: ${attackers} defeats ${defenders} ${battle.attackerResult.score} to ${battle.defenderResult.score}.`
      } else {
        return `Defender(s) win: ${defenders} defeats ${attackers} ${battle.defenderResult.score} to ${battle.attackerResult.score}.`
      }
    }
    return `Event was performed by ${this.campaign.campaignUsers.find(x => x.uid === event.userUid).displayName}.`;
  }
}
