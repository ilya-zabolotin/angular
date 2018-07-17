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
}
