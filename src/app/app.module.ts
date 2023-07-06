import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NzConfig, NZ_CONFIG} from 'ng-zorro-antd/core/config';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './pages/register/register.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {CommonModule, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {LoginComponent} from "./pages/login/login.component";
import {CharacterCardComponent} from "./components/character-card/character-card.component";
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';

import {NzGridModule} from 'ng-zorro-antd/grid';
import {MenuComponent} from "./components/menu/menu.component";
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {HomeComponent} from "./pages/home/home.component";
import {SearchResultComponent} from "./components/search-result/search-result.component";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FilterBarComponent} from "./components/filter-bar/filter-bar.component";
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {StoreModule} from '@ngrx/store';
import {UserService} from "./services/user.service";
import {CharacterService} from "./services/character.service";

import {CharacterEffects, UserEffects} from './store/effects';
import {EffectsModule} from '@ngrx/effects';

import {NzDropDownModule} from 'ng-zorro-antd/dropdown';

import {reducers} from './store/reducers';
import {ProfileComponent} from "./pages/profile/profile.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {DetailComponent} from "./pages/detail/detail.component";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {ModalComponent} from "./components/modal/modal.component";

registerLocaleData(en);

const ngZorroConfig: NzConfig = {
  message: {nzMaxStack: 1, nzDuration: 3000},
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    CharacterCardComponent,
    ProfileComponent,
    FavoritesComponent,
    HomeComponent,
    SearchResultComponent,
    FilterBarComponent,
    DetailComponent,
    ModalComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzModalModule,
    NzLayoutModule,
    CommonModule,
    NzPaginationModule,
    NzSelectModule,
    NzDescriptionsModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzRadioModule,
    NzCheckboxModule,
    NzPageHeaderModule,
    NzResultModule,
    NzSpinModule,
    NzAvatarModule,
    FormsModule,
    NzInputModule,
    CommonModule,
    NzPaginationModule,
    NzSelectModule,
    NzDescriptionsModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzRadioModule,
    NzDropDownModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects, CharacterEffects])
  ],
  providers: [
    {provide: NZ_CONFIG, useValue: ngZorroConfig},
    {provide: NZ_I18N, useValue: en_US},
    UserService,
    NzMessageService,
    CharacterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
