import {Action, createReducer, on} from '@ngrx/store';
import * as characterActions from '../actions';
import {ICharacter} from "../../interfaces/character.interface";

export interface State {
  result?: any;
  isLoading?: boolean;
  isLoggedIn?: boolean;
  isError?: boolean;
  filter?: object;
  favoriteCharacters?: any;
  detail: ICharacter;
}

export const initialState: State = {
  result: '',
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  filter: {page: 1},
  favoriteCharacters: [],
  detail: <ICharacter>{}
};

const characterReducer = createReducer(
  initialState,
  on(characterActions.find, (state, result) => {
    return {...state, filter: result}
  }),
  on(characterActions.findSuccess, (state, result) => ({
    ...state,
    result,
    isLoading: false,
    isLoggedIn: true,
    filter: state.filter
  })),
  on(characterActions.findFailure, (state, result) => ({
    ...state,
    result: result.error,
    isLoading: false,
    isLoggedIn: false,
    isError: true
  })),
  on(characterActions.detail, (state, result) => {
    return {...state, detail: result}
  }),
  on(characterActions.detailSuccess, (state, result) => ({
    ...state,
    detail: result
  })),
  on(characterActions.detailFailure, (state, result) => ({
    ...state,
    result: result.error,
    isError: true
  })),
  on(characterActions.addToFavorite, (state, {character, deleteAction}) => {
    let favoriteCharacters;
    if (!deleteAction) {
      favoriteCharacters = [...state.favoriteCharacters, character];
    } else {
      favoriteCharacters = state.favoriteCharacters.filter((item: any) => item._id !== character._id);
    }
    return {
      ...state,
      favoriteCharacters: favoriteCharacters,
    };
  }),
);

export function reducer(state: State | undefined, action: Action): any {
  return characterReducer(state, action);
}

export const characterFind = (state: State) => {
  return {
    result: state.result,
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    isError: state.isError,
    filter: state.filter
  }
};


export const characterDetail = (state: State) => {
  return {
    result: state.result,
    isError: state.isError,
    detail: state.detail
  }
};


export const characterFavorite = (state: State) => {
  return {
    favoriteCharacters: state.favoriteCharacters
  }
};
