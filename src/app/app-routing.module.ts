import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {DetailComponent} from "./pages/detail/detail.component";
import {LoginGuard} from "./guards/auth.guard";
import {ModalComponent} from "./components/modal/modal.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'register',
        component: ModalComponent, data: {
          component: RegisterComponent, className: 'login-modal'
        }
      },
      {
        path: 'login',
        component: ModalComponent,
        data: {component: LoginComponent, className: 'login-modal'}
      },
      {
        path: 'favorites',
        component: ModalComponent,
        data: {component: FavoritesComponent, className: 'favorites-modal'}
      },
      {
        path: 'profile',
        component: ModalComponent,
        canActivate: [LoginGuard],
        data: {component: ProfileComponent, className: 'profile-modal'}
      },
      {
        path: 'detail/:id',
        component: ModalComponent,
        data: {component: DetailComponent, className: 'detail-modal'}
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
