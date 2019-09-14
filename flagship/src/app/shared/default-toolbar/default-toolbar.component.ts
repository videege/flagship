import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'flagship-default-toolbar',
  templateUrl: './default-toolbar.component.html',
  styleUrls: ['./default-toolbar.component.css']
})
export class DefaultToolbarComponent implements OnInit {

  public title: string;

  constructor(private router: Router, private titleService: Title,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild)
            route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      ).subscribe(event => {
        console.log(event);
        if (event['title']) {
          this.titleService.setTitle(event['title'])
          this.title = event['title'];
        }
      })
  }

}
