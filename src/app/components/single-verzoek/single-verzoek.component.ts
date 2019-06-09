import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthenticationService } from '../../services/authentication.service';
import { VerzoekService } from '../../services/verzoek.service';
import { ProductServiceService } from '../../services/product-service.service';
import { ModalService } from '../../services/modal.service';

// Models
import { Verzoek } from 'src/app/models/verzoek.model';
import { Product } from 'src/app/models/product.model';

// Etc
import * as $ from 'jquery';

@Component({
  selector: 'app-single-verzoek',
  templateUrl: './single-verzoek.component.html',
  styleUrls: ['./single-verzoek.component.scss']
})
export class SingleVerzoekComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  verzoek: Verzoek;
  verzoeken: Verzoek[];
  product: Product;

  @Input() Verzoek = {id: this.id, Blok: '', Status: '', Email: '', Product: '', Datum: null};

  @Input() Product = {id: '', Naam: '', Type: '', Status: '', Status1: '', Status2: '', Status3: '', Status4: ''};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private verzoekService: VerzoekService,
    private productService: ProductServiceService,
    private modalService: ModalService,
    public actRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getVerzoek(this.id);
  }

  toDateTime(secs: any) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  getVerzoek(id: string) {
    this.verzoekService.getVerzoek(id).subscribe(data => {
      this.verzoek = new Verzoek();
      this.verzoek.Blok = data.payload.data()['Blok'];
      if (data.payload.data()['Datum'] !== null) {
        this.verzoek.Datum = this.toDateTime(data.payload.data()['Datum']['seconds']);
      } else {
        this.verzoek.Datum = null;
      }
      this.verzoek.Email = data.payload.data()['Email'];
      this.verzoek.Product = data.payload.data()['Product'];
      this.verzoek.id = data.payload.data()['id'];
      this.verzoek.Status = data.payload.data()['Status'];
      this.verzoek.Status = data.payload.data()['Status'];
      this.getProduct(data.payload.data()['Product']);
    });
  }

  getProduct(id: string) {
    console.log(id);
    this.productService.getProduct(id).subscribe(data => {
      this.product = new Product();
      this.product.Naam = data.payload.data()['Naam'];
      this.product.Type = data.payload.data()['Type'];
      this.product.id = data.payload.data()['id'];
      this.product.Status = data.payload.data()['Status'];
      this.product.Status1 = data.payload.data()['Status1'];
      this.product.Status2 = data.payload.data()['Status2'];
      this.product.Status3 = data.payload.data()['Status3'];
      this.product.Status4 = data.payload.data()['Status4'];
      console.log('Product has been loaded');
    });
  }

  acceptVerzoek(blok: string) {
    this.Verzoek.Blok = this.verzoek.Blok;
    this.Verzoek.Datum = this.verzoek.Datum;
    this.Verzoek.Email = this.verzoek.Email;
    this.Verzoek.Product = this.verzoek.Product;
    this.Verzoek.Status = this.verzoek.Status;
    this.verzoekService.acceptVerzoek(this.Verzoek);
  }

  cancelVerzoek() {
    this.Verzoek.Blok = this.verzoek.Blok;
    this.Verzoek.Datum = this.verzoek.Datum;
    this.Verzoek.Email = this.verzoek.Email;
    this.Verzoek.Product = this.verzoek.Product;
    this.Verzoek.Status = this.verzoek.Status;
    this.verzoekService.cancelVerzoek(this.Verzoek);
  }

  productUitlenen(blok: string) {
    this.Product.id = this.product.id;
    this.Product.Naam = this.product.Naam;
    this.Product.Type = this.product.Type;
    this.Product.Status = 'Deels Beschikbaar';

    if (blok === '1') {
      this.Product.Status1 = 'Uitgeleend';
      this.Product.Status2 = this.product.Status2;
      this.Product.Status3 = this.product.Status3;
      this.Product.Status4 = this.product.Status4;
    } else if (blok === '2') {
      this.Product.Status1 = this.product.Status1;
      this.Product.Status2 = 'Uitgeleend';
      this.Product.Status3 = this.product.Status3;
      this.Product.Status4 = this.product.Status4;
    } else if (blok === '3'){
      this.Product.Status1 = this.product.Status1;
      this.Product.Status2 = this.product.Status2;
      this.Product.Status3 = 'Uitgeleend';
      this.Product.Status4 = this.product.Status4;
    } else if (blok === '4') {
      this.Product.Status1 = this.product.Status1;
      this.Product.Status2 = this.product.Status2;
      this.Product.Status3 = this.product.Status3;
      this.Product.Status4 = 'Uitgeleend';
    }

    this.Verzoek.Blok = this.verzoek.Blok;
    this.Verzoek.Datum = this.verzoek.Datum;
    this.Verzoek.Email = this.verzoek.Email;
    this.Verzoek.Product = this.verzoek.Product;
    this.Verzoek.Status = 'Uitgeleend';
    this.productService.updateProduct(this.Product);
    this.verzoekService.updateVerzoek(this.Verzoek);
  }

  afrondenVerzoek(blok: string) {
    this.Product.id = this.product.id;
    this.Product.Naam = this.product.Naam;
    this.Product.Type = this.product.Type;

    if (blok === '1') {
      this.Product.Status1 = 'Beschikbaar';
      this.Product.Status2 = this.product.Status2;
      this.Product.Status3 = this.product.Status3;
      this.Product.Status4 = this.product.Status4;
    } else if (blok === '2') {
      this.Product.Status1 = this.product.Status1;
      this.Product.Status2 = 'Beschikbaar';
      this.Product.Status3 = this.product.Status3;
      this.Product.Status4 = this.product.Status4;
    } else if (blok === '3'){
      this.Product.Status1 = this.product.Status1;
      this.Product.Status2 = this.product.Status2;
      this.Product.Status3 = 'Beschikbaar';
      this.Product.Status4 = this.product.Status4;
    } else if (blok === '4') {
      this.Product.Status1 = this.product.Status1;
      this.Product.Status2 = this.product.Status2;
      this.Product.Status3 = this.product.Status3;
      this.Product.Status4 = 'Beschikbaar';
    }

    if (this.Product.Status1 === 'Beschikbaar' &&
              this.Product.Status2 === 'Beschikbaar' &&
              this.Product.Status3 === 'Beschikbaar' &&
              this.Product.Status4 === 'Beschikbaar') {
      this.Product.Status = 'Beschikbaar';
    } else if (this.Product.Status1 === 'Gereserveerd' &&
              this.Product.Status2 === 'Gereserveerd' &&
              this.Product.Status3 === 'Gereserveerd' &&
              this.Product.Status4 === 'Gereserveerd') {
      this.Product.Status = 'Gereserveerd';
    } else if (this.Product.Status1 === 'Gereserveerd' ||
              this.Product.Status2 === 'Gereserveerd' ||
              this.Product.Status3 === 'Gereserveerd' ||
              this.Product.Status4 === 'Gereserveerd') {
      this.Product.Status = 'Deels Beschikbaar';
    } else if (this.Product.Status1 === 'Uitgeleend' ||
              this.Product.Status2 === 'Uitgeleend' ||
              this.Product.Status3 === 'Uitgeleend' ||
              this.Product.Status4 === 'Uitgeleend') {
      this.Product.Status = 'Deels Beschikbaar';
    }

    this.Verzoek.Blok = this.verzoek.Blok;
    this.Verzoek.Datum = this.verzoek.Datum;
    this.Verzoek.Email = this.verzoek.Email;
    this.Verzoek.Product = this.verzoek.Product;
    this.Verzoek.Status = 'Teruggebracht';
    this.productService.updateProduct(this.Product);
    this.verzoekService.updateVerzoek(this.Verzoek);
  }

  annulerenVerzoek() {
    this.verzoekService.deleteVerzoek(this.verzoek.id);
    this.router.navigate(['/verzoek']);
  }

  logout() {
    this.authService.logout();
  }

}
