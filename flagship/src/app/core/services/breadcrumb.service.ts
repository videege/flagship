import { Injectable } from '@angular/core';
import { FlagshipRouteData } from 'src/app/app.route-data';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  public breadcrumbData$: Subject<FlagshipRouteData> = new Subject<FlagshipRouteData>();

  constructor() { }

  public setBreadcrumb(data: FlagshipRouteData) {
    this.breadcrumbData$.next(data);
  }
}
