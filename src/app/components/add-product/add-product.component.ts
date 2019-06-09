import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthenticationService } from '../../services/authentication.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

// Models
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Input() Product = {id: '', Naam: '', Type: '', Status: '', Status1: '', Status2: '', Status3: '', Status4: ''};

  producten: Product[];
  id: string;

  constructor(
    private authService: AuthenticationService,
    private productService: ProductServiceService,
    public router: Router,
  ) { }

  ngOnInit() {
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

  createProduct() {
    this.Product.id = this.id;
    if (this.Product.Status == 'Beschikbaar') {
      this.Product.Status1 = 'Beschikbaar';
      this.Product.Status2 = 'Beschikbaar';
      this.Product.Status3 = 'Beschikbaar';
      this.Product.Status4 = 'Beschikbaar';
    } else {
      this.Product.Status1 = 'Niet Beschikbaar';
      this.Product.Status2 = 'Niet Beschikbaar';
      this.Product.Status3 = 'Niet Beschikbaar';
      this.Product.Status4 = 'Niet Beschikbaar';
    }
    this.productService.createProduct(this.Product);
    this.router.navigate(['/producten']);

  }

  logout() {
    this.authService.logout();
  }

}
