import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Team } from 'src/app/domain/campaign/team';
import { Faction } from 'src/app/domain/game/faction';
import { CampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlayerCreatorDialogComponent, PlayerCreatorDialogData } from '../player-creator-dialog/player-creator-dialog.component';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Guid } from 'guid-typescript';
import { FleetService } from 'src/app/core/services/fleet.service';
import { CampaignUser } from 'src/app/domain/campaign/campaignUser';
import { StrategicEffects, StrategicEffectType } from 'src/app/domain/campaign/strategicEffectType';
import { Phase } from 'src/app/domain/campaign/phase';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TokenCount {
  type: StrategicEffectType;
  effect: string;
  count: number;
}

@Component({
  selector: 'flagship-campaign-team',
  templateUrl: './campaign-team.component.html',
  styleUrls: ['./campaign-team.component.scss']
})
export class CampaignTeamComponent implements OnInit, OnChanges {
  
  @Input() campaign: Campaign;
  @Input() team: Team;

  public faction: string;
  public factionIcon: string;
  public playerMap: { [id: string] : CampaignUser } = {};
  public canAddPlayers = false;
  public tokenCounts: TokenCount[] = [];
  public canEditTokens = true;
  
  private user: firebase.User;

  isHandsetPortrait$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
  .pipe(
    map(result => result.matches)
  );

  constructor(private afAuth: AngularFireAuth, private campaignService: CampaignService,
    private dialog: MatDialog, private fleetService: FleetService, 
    private breakpointObserver: BreakpointObserver) { 
    this.afAuth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.team.currentValue !== changes.team.previousValue ||
      changes.campaign.currentValue !== changes.campaign.previousValue) {
      this.setup();
    }
  }

  private setup(): void {
    this.canAddPlayers = this.campaign.currentState().phase === Phase.CampaignSetup;
    this.faction = this.team.faction === Faction.Empire ? "Empire" : "Rebels";
    this.factionIcon = this.team.faction === Faction.Empire ? "ffi-imperial" : "ffi-rebel";
    this.playerMap = {};
    for (const player of this.team.players) {
      this.playerMap[player.id] = this.campaign.campaignUsers.find(x => x.uid === player.playerUid);
    }
    this.setupTokens();
  }

  private setupTokens() {
    this.tokenCounts = StrategicEffects.RITRStrategicEffects.map(x => <TokenCount>{
      type: x,
      effect: StrategicEffects.effectName(x),
      count: this.team.tokens[x] || 0
    });
  }

  setTeamName() {
    
  }

  increaseToken(effect: StrategicEffectType) {
    this.team.addToken(effect);
    this.canEditTokens = false;
    this.campaignService.updateCampaign(this.campaign).then()
      .finally(() => { this.canEditTokens = true; });
  }

  decreaseToken(effect: StrategicEffectType) {
    if (this.team.tokensOfType(effect) <= 0) return;

    this.team.removeToken(effect);
    this.canEditTokens = false;
    this.campaignService.updateCampaign(this.campaign).then()
      .finally(() => { this.canEditTokens = true; });
  }

  makeTeamLeader(player: CampaignPlayer) {
    if (player.isLeader) return;
    this.team.designateLeader(player);
    this.campaignService.updateCampaign(this.campaign).then(() => {

    });
  }
  
  addPlayer() {
    let ref = this.dialog.open(PlayerCreatorDialogComponent, {
      width: '450px',
      data: <PlayerCreatorDialogData> {
        name: null,
        campaignId: this.campaign.id
      }
    }); 
    ref.afterClosed().subscribe((data: PlayerCreatorDialogData) => {
      if (data) {
        let player = new CampaignPlayer();
        player.id = Guid.create().toString();
        player.playerUid = this.user.uid;
        player.name = data.name;
        if (!this.team.players.length) {
          player.isLeader = true;
        } else {
          player.isLeader = false;
        }
        player.fleetId = null;
        player.wins = player.losses = player.mov = 0;
        
        this.fleetService.createFleet(data.fleetName, null, this.team.faction,
          200, 200, { campaignId: this.campaign.id, commanderName: data.name }).then((fleet) => {
            player.fleetId = fleet.id;
            this.team.players.push(player);
            this.campaignService.updateCampaign(this.campaign).then(() => {
          
            });
          })
       
      }
    });
  }

}
