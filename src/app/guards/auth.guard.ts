import {inject} from '@angular/core';
import {Router} from '@angular/router';

export const LoginGuard = () => {

  const router = inject(Router);

  if (localStorage.getItem('access_token') !== null) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }

}
