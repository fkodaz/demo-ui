import {Component, OnDestroy} from '@angular/core';
import {Store} from "@ngrx/store";
import {characterFind} from "../../store/selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import * as characterActions from "../../store/actions";
import {ISearchResult} from "../../interfaces/search.interface";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnDestroy {
  subscription: Subject<boolean> = new Subject<boolean>();
  searchResult: ISearchResult = <ISearchResult>{results: [], totalSize: 0};
  filter: { page?: number } | undefined;

  constructor(private readonly store: Store) {
    this.store.select(characterFind).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      this.searchResult = data.result;
      this.filter = data.filter;
    });
  }

  async pageChange(page: number) {
    this.store.dispatch(characterActions.find({
      ...this.filter,
      page: page
    }));
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
