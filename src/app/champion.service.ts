///<reference path="message.service.ts"/>
import { Injectable } from '@angular/core';
import {Champion} from './champion';
import {CHAMPIONS} from './mock-champions';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';


const  httpOptions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json '})
};
@Injectable({
  providedIn: 'root'
})


export class ChampionService {

  private championsUrl = 'api/champions';  // URL to web api



  constructor(private http: HttpClient,
              private messageService: MessageService,
              ) { }

  getChampions(): Observable<Champion[]> {
    return this.http.get<Champion[]>(this.championsUrl).pipe(tap(champions => this.log('fetched champions')),
      catchError(this.handleError('getChampions', [])));
  }

  /*getChampion (id: number): Observable <Champion> {
    this.messageService.add(`ChampionService: fetched hero id=${id}`);
    return of(CHAMPIONS.find(champion => champion.id === id));
  }*/

  getChampion(id: number): Observable <Champion> {
    const url = `${this.championsUrl}/${id}`;
    return this.http.get<Champion>(url).pipe(
      tap(_ => this.log('fetched champion id=${id}')),
      catchError(this.handleError<Champion>('getChampion id=${id}'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ChampionService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateChampion (champion: Champion): Observable<any> {
    return this.http.put(this.championsUrl, champion, httpOptions).pipe(
      tap(_ => this.log('updated champion id=${champion.id}')),
      catchError(this.handleError<any>('updateChampion'))
    );
  }

  /** POST: add a new hero to the server */
  addChampion (champion: Champion): Observable<Champion> {
    return this.http.post<Champion>(this.championsUrl, champion, httpOptions).pipe(
      tap((champion: Champion) => this.log(`added hero w/ id=${champion.id}`)),
      catchError(this.handleError<Champion>('addChampion'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteChampion (champion: Champion | number): Observable<Champion> {
    const id = typeof champion === 'number' ? champion : champion.id;
    const url = `${this.championsUrl}/${id}`;

    return this.http.delete<Champion>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted champion id=${id}`)),
      catchError(this.handleError<Champion>('deleteChampion'))
    );
  }

  /* GET heroes whose name contains search term */
  searchChampions(term: string): Observable<Champion[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Champion[]>(`${this.championsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found champions matching "${term}"`)),
      catchError(this.handleError<Champion[]>('searchChampions', []))
    );
  }
}
