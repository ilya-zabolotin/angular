import { Component, OnInit, Input } from '@angular/core';
import { Champion } from '../champion';

@Component({
  selector: 'app-champion-detail',
  templateUrl: './champion-detail.component.html',
  styleUrls: ['./champion-detail.component.css']
})
export class ChampionDetailComponent implements OnInit {

  @Input() champion: Champion;

  constructor() { }

  ngOnInit() {
  }

}
