import { Component, OnInit } from '@angular/core';
import { Champion } from '../champion';
import { ChampionService } from '../champion.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  champions: Champion[] = [];

  constructor(private championService: ChampionService,
              private location: Location) { }

  ngOnInit() {
    this.getChampions();
  }

  getChampions(): void {
    this.championService.getChampions().subscribe(champions => this.champions = champions.slice(0, 33));
  }
  goBack(): void {
    this.location.back();
  }

}
