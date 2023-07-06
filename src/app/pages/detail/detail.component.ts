import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {characterDetail} from "../../store/selectors";
import {takeUntil} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as characterActions from "../../store/actions";

import {Location} from '@angular/common';
import {ICharacter} from "../../interfaces/character.interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy {

  subscription: Subject<boolean> = new Subject<boolean>();
  detail: ICharacter = <ICharacter>{};

  constructor(private route: ActivatedRoute, private location: Location, private readonly store: Store) {
    this.store.dispatch(characterActions.detail({
      id: route.snapshot.firstChild?.firstChild?.params['id']
    }));

    this.store.select(characterDetail).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      this.detail = data.detail;
    });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
