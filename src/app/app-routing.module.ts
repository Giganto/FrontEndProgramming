import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from '../app/auth/login/login.component';
import { VerzoekComponent } from './components/verzoek/verzoek.component';

// Guards
import { DocentGuard } from './guards/docent.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login' , pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'verzoek', component: VerzoekComponent, canActivate: [DocentGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
