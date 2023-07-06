import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromCharacter from "../reducers/character.reducer";

export const getCharacterState = createFeatureSelector<fromCharacter.State>('character');

export const characterFind = createSelector(
  getCharacterState,
  fromCharacter.characterFind
)

export const characterDetail = createSelector(
  getCharacterState,
  fromCharacter.characterDetail
)

export const characterFavorite = createSelector(
  getCharacterState,
  fromCharacter.characterFavorite
)
