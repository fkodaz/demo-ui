import {
  ActionReducerMap,
} from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as fromCharacter from './character.reducer';


export interface State {
  user: fromUser.State;
  character: fromCharacter.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  character: fromCharacter.reducer
}
