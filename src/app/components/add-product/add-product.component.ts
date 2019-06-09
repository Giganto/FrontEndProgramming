import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthenticationService } from '../../services/authentication.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

// Models
import { Product } from 'src/app/models/product.model';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Input() Product = {id: '', Naam: '', Type: '', Status: '', Status1: '', Status2: '', Status3: '', Status4: ''};

  addForm: FormGroup;
  producten: Product[];
  id: string;
  submitted = false;
  routerid: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private productService: ProductServiceService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.productService.getProducts().subscribe(data => {
      let new_id = data.length + 1;
      this.id = new_id as unknown as string;
      this.producten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          ...e.payload.doc.data()
        } as Product;
      });
    });
  }

  get f() { return this.addForm.controls; }

  async createProduct() {
    this.submitted = true;

    if (this.addForm.invalid){
      // Form is invalid, return without further action
      return;
    }

    // Create Product Object to pass on to the service
    this.Product.id = this.id;
    this.Product.Naam = this.f.name.value;
    this.Product.Type = this.f.type.value;
    this.Product.Status = 'Non-actief';
    this.Product.Status1 = 'Beschikbaar';
    this.Product.Status2 = 'Beschikbaar';
    this.Product.Status3 = 'Beschikbaar';
    this.Product.Status4 = 'Beschikbaar';
    await this.productService.createProduct(this.Product).then(docRef => {
      this.routerid = (docRef) ? (docRef as DocumentReference).id : 'void';
    });
    this.router.navigate(['/producten/' + this.routerid]);
    this.Product.id = this.routerid;
    await this.productService.updateProduct(this.Product);

  }

  logout() {
    this.authService.logout();
  }

}
