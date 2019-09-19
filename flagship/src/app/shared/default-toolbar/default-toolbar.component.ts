import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'flagship-default-toolbar',
  templateUrl: './default-toolbar.component.html',
  styleUrls: ['./default-toolbar.component.css']
})
export class DefaultToolbarComponent implements OnInit {

  public title: string = null;

  constructor(private router: Router, private titleService: Title,
    private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef) { }

  private getChildRoute(route: ActivatedRoute) {
    while (route.firstChild) { route = route.firstChild; }
    return route;
  }

  ngOnInit() {
    // let startRouteData = this.getChildRoute(this.activatedRoute).data;
    // if (startRouteData['title']) {
    //   this.titleService.setTitle(startRouteData['title'])
    //   this.title = startRouteData['title'];
    // }
    // this.router.events
    //   .pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     map(() => this.router.routerState.root),
    //     map(route => this.getChildRoute(route)),
    //     filter(route => route.outlet === 'primary'),
    //     mergeMap(route => route.data)
    //   ).subscribe(event => {
    //     console.log(event);
    //     if (event['title']) {
    //       this.titleService.setTitle(event['title'])
    //       this.title = event['title'];
    //       //todo: fix this - thee destroyed component screws with angulars
    //       //mechanisms.  Probably should just make this the parent toolbar to 
    //       //child toolbar outlets
    //     }
    //   })
  }

}
