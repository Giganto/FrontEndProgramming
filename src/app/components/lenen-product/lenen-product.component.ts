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
  selector: 'app-lenen-product',
  templateUrl: './lenen-product.component.html',
  styleUrls: ['./lenen-product.component.scss']
})
export class LenenProductComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  product: Product;

  @Input() Product = {id: this.id, Naam: '', Type: '', Status: ''};
  @Input() Verzoek = {id: null, Blok: '', Status: '', Email: '', Product: '', Datum: null};

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
    this.getProduct(this.id);
  }

  toDateTime(secs: any) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  getProduct(id: string) {
    this.productService.getProduct(id).subscribe(data => {
      this.product = new Product();
      this.product.Naam = data.payload.data()['Naam'];
      this.product.Type = data.payload.data()['Type'];
      this.product.id = data.payload.data()['id'];
      this.product.Status = data.payload.data()['Status'];
      console.log('Product has been loaded');
    });
  }

  lenenProduct() {
    this.Verzoek.Product = this.id;
    this.Verzoek.Status = 'In behandeling';

    this.Product.Naam = this.product.Naam;
    this.Product.Status = 'Deels beschikbaar';
    this.Product.Type = this.product.Type;
    this.Product.id = this.id;

    this.productService.updateProduct(this.Product);
    this.verzoekService.createVerzoek(this.Verzoek);
    this.router.navigate(['/lenen']);
  }

  logout() {
    this.authService.logout();
  }

}
