import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as characterActions from '../actions';
import {CharacterService} from "../../services/character.service";

@Injectable()
export class CharacterEffects {

  constructor(
    private actions$: Actions,
    private characterService: CharacterService
  ) {}

  characterList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(characterActions.find),
      exhaustMap(action =>
        this.characterService.find(action).pipe(
          map(response => characterActions.findSuccess(response)),
          catchError((error: any) => of(characterActions.findFailure(error))))
      )
    )
  );

  characterDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(characterActions.detail),
      exhaustMap(action =>
        this.characterService.detail(action).pipe(
          map(response => characterActions.detailSuccess(response)),
          catchError((error: any) => of(characterActions.detailFailure(error))))
      )
    )
  );

}
