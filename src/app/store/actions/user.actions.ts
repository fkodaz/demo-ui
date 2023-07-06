import { props, createActionGroup} from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Login': props<{ email: string, password: string }>(),
    'Login Success': (response:any) => response,
    'Login Failure': (error:any) => error,
    'Sign Up': props<{ email: string, password: string }>(),
    'Sign Up Success': (response:any) => response,
    'Sign Up Failure': (error:any) => error,
  },
});
