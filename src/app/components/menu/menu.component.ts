import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {userLogin} from "../../store/selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  subscription: Subject<boolean> = new Subject<boolean>();
  loggedIn: boolean | undefined = false;

  constructor(private readonly store: Store, private router: Router) {
    this.store.select(userLogin).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      this.loggedIn = data.isLoggedIn;
    });
  }


  logout() {
    localStorage.removeItem('access_token');
    window.location.reload();
  }
}
