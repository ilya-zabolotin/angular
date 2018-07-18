///<reference path="message.service.ts"/>
import { Injectable } from '@angular/core';
import {Champion} from './champion';
import {CHAMPIONS} from './mock-champions';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  constructor(private messageService: MessageService) { }

  getChampions(): Observable<Champion[]> {
    this.messageService.add('ChampionService: fetched champions');
    return of (CHAMPIONS);
  }
  getChampion (id: number): Observable <Champion> {
    this.messageService.add(`ChampionService: fetched hero id=${id}`);
    return of(CHAMPIONS.find(champion => champion.id === id));
  }
}
