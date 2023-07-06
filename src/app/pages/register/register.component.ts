import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Subject} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {userSignup} from "../../store/selectors";
import {takeUntil} from "rxjs/operators";
import {userActions} from "../../store/actions";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  validateForm: UntypedFormGroup;
  subscription: Subject<boolean> = new Subject<boolean>();

  constructor(private modal: NzModalService, private message: NzMessageService, private router: Router, private fb: UntypedFormBuilder, private userService: UserService, private readonly store: Store) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });

    this.store.select(userSignup).pipe(
      takeUntil(this.subscription)
    ).subscribe(data => {
      if (data.isLoggedIn && data.access_token) {
        this.message.create("success", "You have successfully registered and logged in");
        this.modal.closeAll(),
          this.router.navigate(['/']);
      }

      if (data.message) {
        this.message.create("error", data.message);
      }
    });
  }

  submitForm() {
    this.store.dispatch(userActions.signUp({...this.validateForm.value}));
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
