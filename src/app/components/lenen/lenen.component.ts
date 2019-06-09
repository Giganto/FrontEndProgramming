import { Component, OnInit, HostListener } from '@angular/core';

// Services
import { AuthenticationService } from '../../services/authentication.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

// Models
import { Product } from 'src/app/models/product.model';

import * as $ from 'jquery';


@Component({
  selector: 'app-lenen',
  templateUrl: './lenen.component.html',
  styleUrls: ['./lenen.component.scss']
})
export class LenenComponent implements OnInit {

  producten: Product[];

  constructor(
    private authService: AuthenticationService,
    private productService: ProductServiceService,
  ) { }

  ngOnInit() {
    this.productService.getViableProducts().subscribe(data => {
      this.producten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
    });
  }

  logout() {
    this.authService.logout();
  }

   // Listen for keyevents and pairs them with the search input, 
  // then searches the cards on the website for any ressemblance with the search value.
  // Then hides those with no ressemblance. (Does not check <p> tags only <h> tags)
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    var target = event.srcElement['name']

    if (target == 'search-input') {
      let searchVar = (<HTMLInputElement> document.getElementById("search-input")).value;
      var $rows = $('.child-card-search');
      
      var val = '^(?=.*\\b' + $.trim(searchVar).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
            reg = RegExp(val, 'i'),
            text;

        $rows.show().filter(function() {
            text = $(this).text().replace(/\s+/g, ' ');
            return !reg.test(text);
        }).hide();
    }
  }

}
