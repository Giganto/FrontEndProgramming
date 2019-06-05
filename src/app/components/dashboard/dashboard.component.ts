import { Component, OnInit, HostListener } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { VerzoekService } from 'src/app/services/verzoek.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

// Models
import { Verzoek } from 'src/app/models/verzoek.model';
import { Product } from 'src/app/models/product.model';

import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  verzoeken: Verzoek[];
  producten: Product[];
  defproducten: Product[];
  verzoekLength = 0;
  productLength = 0;
  defProductLength = 0;

  constructor(
    private authService: AuthenticationService,
    private verzoekService: VerzoekService,
    private productService: ProductServiceService,
  ) { }

  ngOnInit() {
    this.getOpenVerzoeken();
    this.getNonProducten();
    this.getDefectProducten();
  }

  getOpenVerzoeken() {
    this.verzoekService.getOpenVerzoeken().subscribe(data => {
      this.verzoeken = data.map(e => {
        if (e.payload.doc.data()['Datum'] !== null) {
          const date = e.payload.doc.data()['Datum']['seconds'];
          const newDate = this.toDateTime(date);
          return {
            id: e.payload.doc.id,
            Email: e.payload.doc.data()['Email'],
            Datum: newDate,
            Blok: e.payload.doc.data()['Blok'],
            Product: e.payload.doc.data()['Product'],
            Status: e.payload.doc.data()['Status'],
          } as Verzoek;
        } else {
          const newDate = null;
          return {
            id: e.payload.doc.id,
            Email: e.payload.doc.data()['Email'],
            Datum: newDate,
            Blok: e.payload.doc.data()['Blok'],
            Product: e.payload.doc.data()['Product'],
            Status: e.payload.doc.data()['Status'],
          } as Verzoek;
        }
      });
      this.verzoekLength = this.verzoeken.length;
    });
  }

  getNonProducten() {
    this.productService.getNonProducts().subscribe(data => {
      this.producten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.productLength = this.producten.length;
    });
  }

  getDefectProducten() {
    this.productService.getDefectProducts().subscribe(data => {
      this.defproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.defProductLength = this.defproducten.length;
    })
  }

  toDateTime(secs: any) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  logout() {
    this.authService.logout();
  }

}
