import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from '../app/auth/login/login.component';
import { VerzoekComponent } from './components/verzoek/verzoek.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductenComponent } from './components/producten/producten.component';
import { SingleVerzoekComponent } from './components/single-verzoek/single-verzoek.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { LenenComponent } from './components/lenen/lenen.component';
import { LenenProductComponent } from './components/lenen-product/lenen-product.component';

// Guards
import { DocentGuard } from './guards/docent.guard';



const routes: Routes = [
  { path: '', redirectTo: '/lenen' , pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'lenen', component: LenenComponent},
  { path: 'lenen/:id', component: LenenProductComponent},
  { path: 'producten', component: ProductenComponent, canActivate: [DocentGuard]},
  { path: 'producten/:id', component: SingleProductComponent, canActivate: [DocentGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [DocentGuard]},
  { path: 'verzoek/:id', component: SingleVerzoekComponent, canActivate: [DocentGuard]},
  { path: 'verzoek', component: VerzoekComponent, canActivate: [DocentGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [DocentGuard]},
  { path: 'add-product', component: AddProductComponent, canActivate: [DocentGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
