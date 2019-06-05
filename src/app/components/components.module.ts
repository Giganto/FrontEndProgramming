import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerzoekComponent } from './verzoek/verzoek.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductenComponent } from './producten/producten.component';
import { SingleVerzoekComponent } from './single-verzoek/single-verzoek.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { LenenComponent } from './lenen/lenen.component';
import { LenenProductComponent } from './lenen-product/lenen-product.component';


@NgModule({
  declarations: [
    VerzoekComponent,
    ProfileComponent,
    AddProductComponent,
    DashboardComponent,
    ProductenComponent,
    SingleVerzoekComponent,
    ModalComponent,
    SingleProductComponent,
    LenenComponent,
    LenenProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
