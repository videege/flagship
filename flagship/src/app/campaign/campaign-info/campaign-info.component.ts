import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignUser } from 'src/app/domain/campaign/campaignUser';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Phase } from 'src/app/domain/campaign/phase';
import { MatDialog } from '@angular/material';
import { SetCampaignPointsDialogComponent, SetCampaignPointsDialogData } from '../set-campaign-points-dialog/set-campaign-points-dialog.component';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { CampaignEvent, CampaignEventType } from 'src/app/domain/campaign/campaignEvent';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'flagship-campaign-info',
  templateUrl: './campaign-info.component.html',
  styleUrls: ['./campaign-info.component.scss']
})
export class CampaignInfoComponent implements OnInit, OnChanges {

  @Input() campaign: Campaign;

  public ownerUser: CampaignUser;
  public invitedUsers: CampaignUser[] = [];
  public currentState: CampaignState;
  public showCurrentActStats = false;
  user: firebase.User;

  constructor(private dialog: MatDialog, private campaignService: CampaignService,
    private afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((user) => {
      this.user = user;
    })
  }

  ngOnInit() {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setup();
  }

  setup() {
    this.ownerUser = this.campaign.campaignOwner();
    this.invitedUsers = this.campaign.invitedUsers();
    this.currentState = this.campaign.currentState();
    this.showCurrentActStats = this.currentState.phase !== Phase.CampaignSetup &&
      this.currentState.phase !== Phase.Finished;
  }

  setActScore() {
    let ref = this.dialog.open(SetCampaignPointsDialogComponent, {
      data: new SetCampaignPointsDialogData(this.currentState.act, this.currentState.imperialPointsScored,
        this.currentState.rebelPointsScored),
      maxWidth: '350px'
    });
    ref.afterClosed().subscribe((data: SetCampaignPointsDialogData) => {
      if (!data) return;

      if (this.currentState.imperialPointsScored !== data.empireScore) {
        let difference = this.currentState.imperialPointsScored - data.empireScore;
        this.campaign.empire.campaignPoints -= difference;
        this.currentState.addEvent(new CampaignEvent(CampaignEventType.ManualScoreChange,
          `Imperial Point Score Change from ${this.currentState.imperialPointsScored} to ${data.empireScore}.`,
          this.user.uid, new Date()));
        this.currentState.imperialPointsScored = data.empireScore;

      }
      if (this.currentState.rebelPointsScored !== data.rebelScore) {
        let difference = this.currentState.rebelPointsScored - data.rebelScore;
        this.campaign.rebels.campaignPoints -= difference;
        this.currentState.addEvent(new CampaignEvent(CampaignEventType.ManualScoreChange,
          `Rebel Point Score Change from ${this.currentState.rebelPointsScored} to ${data.rebelScore}.`,
          this.user.uid, new Date()));
        this.currentState.rebelPointsScored = data.rebelScore;
      }
      this.campaignService.updateCampaign(this.campaign).then();
      /*
      winningTeam.campaignPoints += winningResult.earnedPoints;
        losingTeam.campaignPoints += losingResult.earnedPoints;
        currentState.imperialPointsScored += winningFaction === Faction.Empire ? winningResult.earnedPoints : losingResult.earnedPoints;
        currentState.rebelPointsScored += winningFaction === Faction.Empire ? losingResult.earnedPoints : winningResult.earnedPoints;
*/
    });
  }

  setCampaignScore() {
    let ref = this.dialog.open(SetCampaignPointsDialogComponent, {
      data: new SetCampaignPointsDialogData(null, this.campaign.empire.campaignPoints, this.campaign.rebels.campaignPoints),
      maxWidth: '350px'
    });
    ref.afterClosed().subscribe((data: SetCampaignPointsDialogData) => {
      if (!data) return;

      if (this.campaign.empire.campaignPoints !== data.empireScore) {
        this.currentState.addEvent(new CampaignEvent(
          CampaignEventType.ManualScoreChange,
          `Imperial Campaign Point Score Change from ${this.campaign.empire.campaignPoints} to ${data.empireScore}.`,
          this.user.uid,
          new Date()));
        this.campaign.empire.campaignPoints = data.empireScore;
      }

      if (this.campaign.rebels.campaignPoints !== data.rebelScore) {
        this.currentState.addEvent(new CampaignEvent(
          CampaignEventType.ManualScoreChange,
          `Rebel Campaign Point Score Change from ${this.currentState.rebelPointsScored} to ${data.rebelScore}.`,
          this.user.uid,
          new Date()));
        this.campaign.rebels.campaignPoints = data.rebelScore;
      }
      this.campaignService.updateCampaign(this.campaign).then();
    });
  }
}
