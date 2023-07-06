import {Component} from '@angular/core';
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {userLogin} from "../../store/selectors";
import {takeUntil} from "rxjs/operators";
import {IUser} from "../../interfaces/user.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  subscription: Subject<boolean> = new Subject<boolean>();
  email: string = '';

  constructor(private readonly store: Store) {
    this.store.select(userLogin).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      this.email = data.profile.email;
    });
  }
}
