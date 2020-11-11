import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invite } from 'src/app/domain/campaign/invite';
import { AngularFireAuth } from '@angular/fire/auth';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { indeterminateOptions } from 'src/app/shared/utils/progressButtonConfigs';

@Component({
  selector: 'flagship-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  public invite: Invite;
  user: firebase.User;

  public inviteValid = true;

  public saving = false;
  public submitButtonOptions = indeterminateOptions('Join Campaign');

  constructor(private route: ActivatedRoute, private campaignService: CampaignService,
    private snackbar: MatSnackBar, private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
    this.invite = this.route.snapshot.data.invite;
    this.afAuth.user.subscribe(user => {
      this.user = user;
      this.initInvite();
    })
  }

  private initInvite() {
    if (this.invite.acceptedUsers.map(x => x.uid).indexOf(this.user.uid) >= 0) {
      this.inviteValid = false;
      this.submitButtonOptions.disabled = true;
    }
  }

  public acceptInvitation() {
    this.submitButtonOptions.active = true;
    this.campaignService.acceptCampaignInvite(this.invite).then(() => {
      setTimeout(() => {
        this.submitButtonOptions.active = false;
        this.snackbar.open('Successfully joined campaign!', 'OK', {
          duration: 1500
        });
        this.router.navigate(['campaigns', this.invite.campaignId]);
      }, 5000);      
    }, (err) => {
      this.submitButtonOptions.active = false;
      this.snackbar.open('Something went wrong - try again later.', 'OK', {
        duration: 1500
      });
    })
  }

}
