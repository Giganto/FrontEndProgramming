import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerzoekComponent } from './components/verzoek/verzoek.component';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';


// Bootstrap Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

// Forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AuthModule } from '../app/auth/auth.module';

const config = {
  apiKey: 'AIzaSyBy5HECxahgfn-UtcFlWN_5JkXhdYTweYU',
  authDomain: 'uitleen-hu.firebaseapp.com',
  databaseURL: 'https://uitleen-hu.firebaseio.com',
  projectId: 'uitleen-hu',
  storageBucket: 'uitleen-hu.appspot.com',
  messagingSenderId: '532730608692',
  appId: '1:532730608692:web:8972b256450ac23d'
};

@NgModule({
  declarations: [
    AppComponent,
    VerzoekComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
