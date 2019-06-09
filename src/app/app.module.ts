import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';


// Bootstrap Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

// Forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AuthModule } from '../app/auth/auth.module';
import { ProfileComponent } from './components/profile/profile.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { VerzoekComponent } from './components/verzoek/verzoek.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductenComponent } from './components/producten/producten.component';
import { SingleVerzoekComponent } from './components/single-verzoek/single-verzoek.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { LenenComponent } from './components/lenen/lenen.component';
import { LenenProductComponent } from './components/lenen-product/lenen-product.component';
import { AddDocentComponent} from './components/add-beheerder/add-beheerder.component';

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
    VerzoekComponent,
    ProfileComponent,
    AddProductComponent,
    DashboardComponent,
    ProductenComponent,
    SingleVerzoekComponent,
    SingleProductComponent,
    LenenComponent,
    LenenProductComponent,
    AddDocentComponent
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
    AngularFireDatabaseModule,
    BrowserAnimationsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
