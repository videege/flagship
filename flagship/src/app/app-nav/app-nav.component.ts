import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FlagshipRouteData } from "../app.route-data";

@Component({
  selector: 'flagship-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public title: string;
  public parentLabel: string;
  public parentLink: string;

  constructor(private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth, private route: ActivatedRoute,
    private router: Router, private titleService: Title) {
  }

  private getChildRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) { route = route.firstChild; }
    return route;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map(route => this.getChildRoute(route)),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
        filter(data => data['nav'] != null),
      ).subscribe(data => {
        let routeData = data['nav'] as FlagshipRouteData;
        this.title = routeData.getTitle(data);
        this.parentLabel = routeData.getParentLabel(data);
        this.parentLink = routeData.getParentLink(data);

        this.titleService.setTitle(this.title);
      })
  }
}
