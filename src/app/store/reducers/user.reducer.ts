import {Action, createReducer, on} from '@ngrx/store';
import {userActions} from '../actions';
import jwt_decode from 'jwt-decode';

const accessTokenDecode = () => {
  const token = localStorage.getItem('access_token');
  return token ? jwt_decode(token) : false;
}

const isAccessTokenValid = () => {
  const tokenInfo = <any>accessTokenDecode();
  const expireDate = tokenInfo.exp;
  return expireDate * 1000 > new Date().getTime();
}

export interface State {
  access_token?: any;
  isLoggedIn?: boolean;
  message?: string;
  profile?: any;
}

export const initialState: State = {
  access_token: localStorage.getItem('access_token'),
  isLoggedIn: isAccessTokenValid(),
  profile: accessTokenDecode(),
  message: ''
};

const loginReducer = createReducer(
  initialState,
  on(userActions.login, (state) => ({...state})),
  on(userActions.loginSuccess, (state, result) => ({access_token: result.access_token, isLoggedIn: true})),
  on(userActions.loginFailure, (state, result) => ({isLoggedIn: false, message: result.error.message})),
  on(userActions.signUp, (state) => ({...state})),
  on(userActions.signUpSuccess, (state, result) => ({access_token: result.access_token, isLoggedIn: true})),
  on(userActions.signUpFailure, (state, result) => ({isLoggedIn: false, message: result.error.message})),
);

export function reducer(state: State | undefined, action: Action): any {
  return loginReducer(state, action);
}

export const userLogin = (state: State) => {
  return {
    ...state,
    profile: <any>accessTokenDecode()
  }
};

export const userSignup = (state: State) => {
  return {
    ...state,
    profile: <any>accessTokenDecode()
  }
};
