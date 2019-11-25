import { Component, OnInit } from '@angular/core';
import { Fleet } from 'src/app/domain/game/fleet';
import { ActivatedRoute } from '@angular/router';
import { Faction } from 'src/app/domain/game/faction';
import { ObjectiveType } from 'src/app/domain/game/objective';
import { Ship } from 'src/app/domain/game/ship';
import { Squadron } from 'src/app/domain/game/squadron';

@Component({
  selector: 'flagship-fleet-exporter',
  templateUrl: './fleet-exporter.component.html',
  styleUrls: ['./fleet-exporter.component.scss']
})
export class FleetExporterComponent implements OnInit {
  public fleet: Fleet;

  public exportedText: string = 'Loading...';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.fleet = this.route.snapshot.data.fleet;
    this.setup();
  }

  setup() {
    let text = '';
    const newline = '\r\n';
    text += `${this.fleet.name}${newline}${newline}`;
    text += `Author: ${this.fleet.author}${newline}`;
    text += `Faction: ${this.fleet.faction === Faction.Empire ? 'Empire' : 'Rebels'}${newline}`;
    text += `Commander: ${this.fleet.getCommanderName()}${newline}${newline}`;

    text += this.addObjectives();
    text += this.addShips();
    text += this.addSquadrons();

    this.exportedText = text;
  }

  addSquadrons(): string {
    const newline = '\r\n';
    let text = '';

    let squadronCounts: { [id: number]: number } = {}
    let distinctSquadrons: { [id: number]: Squadron } = {}
    let squadronIds: number[] = [];

    this.fleet.squadrons.forEach(squadron => {
      if (squadronIds.indexOf(squadron.id) === -1) {
        squadronIds.push(squadron.id);
        distinctSquadrons[squadron.id] = squadron;
        squadronCounts[squadron.id] = 1;
      } else {
        squadronCounts[squadron.id] += 1;
      }
    });

    for (const id of squadronIds) {
      text += `${squadronCounts[id]} ${distinctSquadrons[id].name} (${distinctSquadrons[id].points})${newline}`
    }
    text += `= ${this.fleet.currentPointsFromSquadrons()} points${newline}`
    return text;
  }

  addShips(): string {
    const newline = '\r\n';
    let text = '';
    for (const ship of this.fleet.ships) {
      text += `${this.addShip(ship)}${newline}`;
    }
    return text;
  }

  addShip(ship: Ship): string {
    const newline = '\r\n';
    let text = '';

    text += `${ship.isFlagship() ? '[flagship] ' : ''}${ship.name} (${ship.points})${newline}`;
    
    for (const upgrade of ship.sortedUpgrades()) {
      text += `- ${upgrade.name} (${upgrade.points})${newline}`;
    }
    text += `= ${ship.currentPoints()} points${newline}`;
    return text;
  }

  addObjectives(): string {
    const newline = '\r\n';
    let assault = this.fleet.objectives.find(x => x.type === ObjectiveType.Assault);
    let defense = this.fleet.objectives.find(x => x.type === ObjectiveType.Defense);
    let navigation = this.fleet.objectives.find(x => x.type === ObjectiveType.Navigation);

    let text = `Assault Objective: ${assault ? assault.name : 'None'}${newline}`;
    text += `Defense Objective: ${defense ? defense.name : 'None'}${newline}`;
    text += `Navigation Objective: ${navigation ? navigation.name : 'None'}${newline}${newline}`;
    return text;
  }
}

/*

World test 2 rebels

Faction: Rebel Alliance
Points: 386/400
Commander: Admiral Raddus

Assault Objective: Surprise Attack
Defense Objective: Capture the VIP
Navigation Objective: Superior Positions


[ flagship ] MC75 Ordnance Cruiser (100 points)
-  Admiral Raddus  ( 26  points)
-  Profundity  ( 7  points)
-  Ordnance Experts  ( 4  points)
-  Early Warning System  ( 7  points)
-  External Racks  ( 3  points)
-  Flechette Torpedoes  ( 3  points)
= 150 total ship cost


GR-75 Medium Transports (18 points)
= 18 total ship cost


MC80 Assault Cruiser (114 points)
-  Home One  ( 7  points)
-  Slaved Turrets  ( 6  points)
-  Leading Shots  ( 4  points)
= 131 total ship cost


1 Dash Rendar ( 24 points)
1 Corran Horn ( 22 points)
1 Ketsu Onyo ( 22 points)
1 Kanan Jarrus ( 19 points)
= 87 total squadron cost

*/