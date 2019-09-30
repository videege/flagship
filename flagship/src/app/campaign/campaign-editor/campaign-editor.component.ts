import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampaignType } from 'src/app/domain/campaign/campaignType';

export class CampaignEditorData {
  name: string;
  type: CampaignType = CampaignType.RITR;
}

@Component({
  selector: 'flagship-campaign-editor',
  templateUrl: './campaign-editor.component.html',
  styleUrls: ['./campaign-editor.component.css']
})
export class CampaignEditorComponent implements OnInit {

  campaignForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    type: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<CampaignEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CampaignEditorData) { }

  ngOnInit() {
    this.campaignForm.patchValue({
      name: this.data.name,
      type: this.data.type.toString()
    });
  }

  getData() : CampaignEditorData {
    return {
      name: this.campaignForm.get('name').value,
      type: +this.campaignForm.get('type').value
    }
  }
}
