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
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  product: Product;

  @Input() Product = {id: this.id, Naam: '', Type: '', Status: '', Status1: '', Status2: '', Status3: '', Status4: ''};

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
      this.Product.Naam = this.product.Naam;
      this.product.Type = data.payload.data()['Type'];
      this.Product.Type = this.product.Type;
      this.product.id = data.payload.data()['id'];
      this.product.Status = data.payload.data()['Status'];
      this.Product.Status = this.product.Status;
      this.product.Status1 = data.payload.data()['Status1'];
      this.Product.Status1 = this.product.Status1;
      this.product.Status2 = data.payload.data()['Status2'];
      this.Product.Status2 = this.product.Status2;
      this.product.Status3 = data.payload.data()['Status3'];
      this.Product.Status3 = this.product.Status3;
      this.product.Status4 = data.payload.data()['Status4'];
      this.Product.Status4 = this.product.Status4;
      console.log('Product has been loaded');
    });
  }

  updateProduct() {
    this.Product.id = this.id;
    if (this.Product.Status === '') {
      this.Product.Status = this.product.Status;
    }

    if (this.Product.Naam === '') {
      this.Product.Naam = this.product.Naam;
    }

    if (this.Product.Type === '') {
      this.Product.Type = this.product.Type;
    }
    this.productService.updateProduct(this.Product);
  }

  reparatieProduct(){
    this.Product.id = this.id;
    this.Product.Status = 'Reparatie Nodig';
    this.Product.Naam = this.product.Naam;
    this.Product.Type = this.product.Type;
    this.productService.updateProduct(this.Product);
  }

  acceptProduct() {
    this.Product.id = this.id;
    this.Product.Status = 'Beschikbaar';
    this.Product.Naam = this.product.Naam;
    this.Product.Type = this.product.Type;
    this.productService.updateProduct(this.Product);
  }

  nonactiefProduct() {
    this.Product.id = this.id;
    this.Product.Status = 'Non-actief';
    this.Product.Naam = this.product.Naam;
    this.Product.Type = this.product.Type;
    this.productService.updateProduct(this.Product);
  }

  async cancelProduct() {
    await this.productService.deleteProduct(this.id);
    this.router.navigate(['/producten']);
  }

  logout() {
    this.authService.logout();
  }

}
