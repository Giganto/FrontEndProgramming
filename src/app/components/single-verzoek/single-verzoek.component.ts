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

  @Input() Product = {id: '', Naam: '', Type: '', Status: ''};

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
      console.log('Product has been loaded');
    });
  }

  acceptVerzoek() {
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

  productUitlenen() {
    this.Product.id = this.product.id;
    this.Product.Naam = this.product.Naam;
    this.Product.Type = this.product.Type;
    this.Product.Status = 'Deels beschikbaar';
    this.Verzoek.Blok = this.verzoek.Blok;
    this.Verzoek.Datum = this.verzoek.Datum;
    this.Verzoek.Email = this.verzoek.Email;
    this.Verzoek.Product = this.verzoek.Product;
    this.Verzoek.Status = 'Uitgeleend';
    this.productService.updateProduct(this.Product);
    this.verzoekService.updateVerzoek(this.Verzoek);
  }

  afrondenVerzoek() {
    this.Product.id = this.product.id;
    this.Product.Naam = this.product.Naam;
    this.Product.Type = this.product.Type;
    this.Product.Status = 'Deels beschikbaar';
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
