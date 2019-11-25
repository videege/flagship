import { Component, OnInit, Input } from '@angular/core';
import { Issue, IssueSeverity } from 'src/app/domain/campaign/issue';

@Component({
  selector: 'flagship-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  @Input() issues: Issue[];
  
  public issueIconMap = {
    [IssueSeverity.Info]: 'info',
    [IssueSeverity.Warning]: 'warning',
    [IssueSeverity.Error]: 'error'
  };

  constructor() { }

  ngOnInit() {
  }

}
