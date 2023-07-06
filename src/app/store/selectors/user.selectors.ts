import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromUser from './../reducers/user.reducer';


export const getLoginState = createFeatureSelector<fromUser.State>('user');

export const userLogin = createSelector(
  getLoginState,
  fromUser.userLogin
);

export const userSignup = createSelector(
  getLoginState,
  fromUser.userSignup
);
