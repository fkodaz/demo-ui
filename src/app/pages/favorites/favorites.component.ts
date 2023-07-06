import {Component, OnDestroy} from '@angular/core';
import {Store} from "@ngrx/store";
import {characterFavorite} from "../../store/selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ICharacter} from "../../interfaces/character.interface";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnDestroy {
  subscription: Subject<boolean> = new Subject<boolean>();
  favoriteCharacters: ICharacter[] = [];

  constructor(private readonly store: Store) {
    this.store.select(characterFavorite).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      this.favoriteCharacters = data.favoriteCharacters
    });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
