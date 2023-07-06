import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, exhaustMap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from "../../services/user.service";
import {userActions} from "../actions";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.login),
      exhaustMap(action =>
        this.userService.login({...action}).pipe(
          map((response: any) => {
            localStorage.setItem('access_token', response?.access_token);
            return userActions.loginSuccess(response)
          }),
          catchError((error: any) => of(userActions.loginFailure(error))))
      )
    )
  );

  userSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.signUp),
      exhaustMap(action =>
        this.userService.signup({...action}).pipe(
          map((response: any) => {
            localStorage.setItem('access_token', response?.access_token);
            return userActions.signUpSuccess(response)
          }),
          catchError((error: any) => of(userActions.signUpFailure(error))))
      )
    )
  );

}
