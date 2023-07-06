import {Component, OnDestroy} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {userLogin} from '../../store/selectors';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {userActions} from '../../store/actions';
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  validateForm: UntypedFormGroup;
  subscription: Subject<boolean> = new Subject<boolean>();

  constructor(private modal: NzModalService, private message: NzMessageService, private router: Router, private fb: UntypedFormBuilder, private userService: UserService, private readonly store: Store) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });

    this.store.select(userLogin).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      if (data.isLoggedIn && data.access_token) {
        this.message.create("success", "You have successfully logged in");
        this.modal.closeAll(),
          this.router.navigate(['/']);
      }

      if (data.message) {
        this.message.create("error", data.message);
      }
    });
  }

  submitForm(): void {
    this.store.dispatch(userActions.login({...this.validateForm.value}));
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
