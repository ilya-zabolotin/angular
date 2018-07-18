///<reference path="message.service.ts"/>
import { Injectable } from '@angular/core';
import {Champion} from './champion';
import {CHAMPIONS} from './mock-champions';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  private championsUrl = 'api/champions';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService,
              ) { }

  getChampions(): Observable<Champion[]> {
    return this.http.get<Champion[]>(this.championsUrl);
  }

  /*getChampions(): Observable<Champion[]> {
    return of(CHAMPIONS);
  }*/
  getChampion (id: number): Observable <Champion> {
    this.messageService.add(`ChampionService: fetched hero id=${id}`);
    return of(CHAMPIONS.find(champion => champion.id === id));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
