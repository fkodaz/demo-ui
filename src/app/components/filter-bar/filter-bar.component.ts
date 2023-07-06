import {Component, OnDestroy} from '@angular/core';

import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import * as characterActions from "../../store/actions";
import {Store} from "@ngrx/store";
import {characterFind} from "../../store/selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnDestroy {
  validateForm: UntypedFormGroup;

  checkOptionsOne = [
    {label: 'A Game of Thrones', value: 1, checked: false},
    {label: 'A Clash of Kings', value: 2, checked: false},
    {label: 'A Storm of Swords', value: 3, checked: false},
    {label: 'The Hedge Knight', value: 4, checked: false},
    {label: 'A Feast for Crows', value: 5, checked: false},
    {label: 'The Sworn Sword', value: 6, checked: false},
    {label: 'The Mystery Knight', value: 7, checked: false},
    {label: 'A Dance with Dragons', value: 8, checked: false},
    {label: 'The Princess and the Queen', value: 9, checked: false},
    {label: 'The Rogue Prince', value: 10, checked: false},
    {label: 'The World of Ice and Fire', value: 11, checked: false},
    {label: 'A Knight of the Seven Kingdoms', value: 12, checked: false}
  ];

  tvSeriesOptions = [
    {label: 'Season 1', value: 'Season 1', checked: false},
    {label: 'Season 2', value: 'Season 2', checked: false},
    {label: 'Season 3', value: 'Season 3', checked: false},
    {label: 'Season 4', value: 'Season 4', checked: false},
    {label: 'Season 5', value: 'Season 5', checked: false},
    {label: 'Season 6', value: 'Season 6', checked: false},
  ];

  subscription: Subject<boolean> = new Subject<boolean>();
  filter: { page?: number } | undefined;

  constructor(private fb: UntypedFormBuilder, private readonly store: Store) {
    this.validateForm = this.fb.group({
      name: [''],
      gender: [null],
      books: [this.checkOptionsOne],
      series: [this.tvSeriesOptions]
    });

    this.store.select(characterFind).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      this.filter = data.filter;
    });

    let interval: any;

    this.validateForm.valueChanges.subscribe(() => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        this.store.dispatch(characterActions.find({
          page: 1,
          name: this.validateForm.value.name,
          gender: this.validateForm.value.gender,
          books: this.validateForm.value.books.filter((book: { checked: boolean }) => book.checked).map((book: { value: string }) => book.value),
          series: this.validateForm.value.series.filter((serie: { checked: boolean }) => serie.checked).map((serie: { value: string }) => serie.value)
        }));
      }, 600)
    });
  }

  submitForm(): void {

  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

}
