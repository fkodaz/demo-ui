import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {addToFavorite} from "../../store/actions";
import {Store} from "@ngrx/store";
import {characterFavorite} from "../../store/selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {ICharacter} from "../../interfaces/character.interface";

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit, OnDestroy {
  @Input() character: ICharacter = <ICharacter>{};
  subscription: Subject<boolean> = new Subject<boolean>();
  isFav: boolean = false;

  constructor(private readonly store: Store, private message: NzMessageService) {

  }

  addFavorite() {
    this.store.dispatch(addToFavorite({character: {...this.character}, deleteAction: this.isFav}));
    this.message.create("success", this.isFav ? "You added to favorites" : "You removed to favorites");
  }

  ngOnInit() {
    this.store.select(characterFavorite).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      this.isFav = data.favoriteCharacters.find((character: ICharacter) => character._id === this.character._id)
    });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
