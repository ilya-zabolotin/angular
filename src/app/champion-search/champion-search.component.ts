import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Champion } from '../champion';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'app-champion-search',
  templateUrl: './champion-search.component.html',
  styleUrls: [ './champion-search.component.css' ]
})
export class ChampionSearchComponent implements OnInit {
  champions$: Observable<Champion[]>;
  private searchTerms = new Subject<string>();

  constructor(private championService: ChampionService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.champions$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.championService.searchChampions(term)),
    );
  }
}
