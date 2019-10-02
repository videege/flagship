import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/domain/campaign/team';
import { Faction } from 'src/app/domain/faction';
import { CampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlayerCreatorDialogComponent, PlayerCreatorDialogData } from '../player-creator-dialog/player-creator-dialog.component';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'flagship-campaign-team',
  templateUrl: './campaign-team.component.html',
  styleUrls: ['./campaign-team.component.css']
})
export class CampaignTeamComponent implements OnInit {
  @Input() campaign: Campaign;
  @Input() team: Team;

  public faction: string;
  public factionIcon: string;

  public displayedColumns = ['name', 'wins', 'losses', 'mov', 'actions'];
  public roster: MatTableDataSource<CampaignPlayer>;
  private user: firebase.User;

  constructor(private afAuth: AngularFireAuth, private campaignService: CampaignService,
    private dialog: MatDialog) { 
    this.afAuth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.faction = this.team.faction === Faction.Empire ? "Empire" : "Rebels";
    this.factionIcon = this.team.faction === Faction.Empire ? "ffi-imperial" : "ffi-rebel";
    this.roster = new MatTableDataSource<CampaignPlayer>(this.team.players);
  }

  setTeamName() {
    
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
        }
        player.fleetId = null;
        player.wins = player.losses = player.mov = 0;
        this.team.players.push(player);
        this.campaignService.updateCampaign(this.campaign).then(() => {
        
        });
      }
    });
  }

}
