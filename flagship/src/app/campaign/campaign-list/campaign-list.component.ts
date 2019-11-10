import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignEditorComponent, CampaignEditorData } from '../campaign-editor/campaign-editor.component';
import { CampaignType } from 'src/app/domain/campaign/campaignType';

@Component({
  selector: 'flagship-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {

  displayedColumns = ['name', 'type', 'players'];
  
  public campaigns: Campaign[];
  public dataSource: MatTableDataSource<Campaign>;

  constructor(private campaignService: CampaignService, private dialog: MatDialog) { }

  ngOnInit() {
    this.campaigns = [];
    this.campaignService.getCampaignsForUser().subscribe((campaigns: Campaign[]) => {
      this.campaigns = campaigns;
      this.dataSource = new MatTableDataSource<Campaign>(this.campaigns);
    });
  }


  newCampaign() {
    let ref = this.dialog.open(CampaignEditorComponent, {
      width: '450px',
      data: <CampaignEditorData> {
        name: null,
        type: CampaignType.RITR
      }
    }); 
    ref.afterClosed().subscribe((data: CampaignEditorData) => {
      if (data) {
        this.campaignService.createCampaign(data.name, data.type)
          .then(() => {
            //this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
            
          });
      }
    });
  }

}
