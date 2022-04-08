import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignEvent, CampaignEventType } from 'src/app/domain/campaign/campaignEvent';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Battle } from 'src/app/domain/campaign/battle';
import { CampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';
import { BattleState } from 'src/app/domain/campaign/battleState';
import { Faction, factionNoun } from 'src/app/domain/game/faction';
import { Phase } from 'src/app/domain/campaign/phase';
import { ObjectiveFactory } from 'src/app/domain/factories/objectiveFactory';

interface TimelineEvent {
  title: string;
  side: string;
  content: string;
  dot: TimelineDot;
}

interface TimelineDot {
  icon: string;
  isMatIcon: boolean;
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
  public objectiveFactory = new ObjectiveFactory();

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
        let icon = 'looks_one';
        if (lastState.act === 2) {
          icon = 'looks_two';
        } else if (lastState.act === 3) {
          icon = 'looks_3';
        }
        this.events.push({
          title: `End of Act ${lastState.actInRomanNumerals()}`,
          content: `${factionNoun(this.campaign.rebels.faction)} scored ${lastState.rebelPointsScored} points - ${factionNoun(this.campaign.empire.faction)} scored ${lastState.imperialPointsScored} points.`,
          side: null,
          dot: {
            icon: icon,
            isMatIcon: true,
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
          content: `${factionNoun(this.campaign.rebels.faction)} scored ${this.campaign.rebels.campaignPoints} points - ${factionNoun(this.campaign.empire.faction)} scored ${this.campaign.empire.campaignPoints} points.`,
          side: null,
          dot: {
            icon: 'done_all',
            isMatIcon: true,
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
          icon: 'gps-fixed',
          isMatIcon: true,
          dotClass: 'accent',
          dotSize: 30
        };
      } else {
        const getIcon = () => {
          let factionIcon;
          switch (battle.getWinnerFaction(this.campaign.empire)) {
            case Faction.Empire:
              factionIcon = 'ffi ffi-imperial';
              break;
            case Faction.Rebels:
              factionIcon = 'ffi ffi-rebel';
              break;
            case Faction.Republic:
              factionIcon = 'swg swg-galrep';
              break;
            case Faction.Separatists:
              factionIcon = 'swg swg-separ';
              break;
          }

          return `${factionIcon} timeline-icon`;
        }
        return {
          icon: getIcon(),
          isMatIcon: false,
          dotClass: 'primary',
          dotSize: 45
        };
      }
    }
    return {
      icon: 'panorama_fish_eye',
      isMatIcon: true,
      dotClass: 'accent',
      dotSize: 30
    };
  }

  getContent(event: CampaignEvent): string {
    if (event.eventType === CampaignEventType.Battle) {
      let battle = <Battle>event;
      // map players
      let attackers = battle.attackingPlayers.map(x => this.players[x.playerId] ? this.players[x.playerId].name : "Missing Player").join(", ");
      let defenders = battle.defendingPlayers.map(x => this.players[x.playerId] ? this.players[x.playerId].name : "Missing Player").join(", ");
      let objectiveName = ``;
      if (battle.objectiveId) {
        const playedObjective = this.objectiveFactory.getObjective(battle.objectiveId);
        objectiveName = playedObjective.name;
      } else if (battle.pivotalObjective) {
        objectiveName = battle.pivotalObjective;
      }
      const playedObjectiveText = objectiveName ? ` playing ${objectiveName}` : ``;
      if (battle.state === BattleState.Declared) {
        return `This battle has been declared but not yet fought.`;
      } else if (battle.state === BattleState.AttackersWon) {
        return `Attacker(s) win: ${attackers} defeats ${defenders} ${battle.attackerResult.score} to ${battle.defenderResult.score}${playedObjectiveText}.`
      } else {
        return `Defender(s) win: ${defenders} defeats ${attackers} ${battle.defenderResult.score} to ${battle.attackerResult.score}${playedObjectiveText}.`
      }
    }
    return `Action performed by ${this.campaign.campaignUsers.find(x => x.uid === event.userUid).displayName}.`;
  }
}
