import { Component, OnInit, HostListener } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Services
import { VerzoekService } from 'src/app/services/verzoek.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { DocentService } from 'src/app/services/docent.service';

// Models
import { Verzoek } from 'src/app/models/verzoek.model';
import { Product } from 'src/app/models/product.model';
import { Docent } from 'src/app/models/docent.model';
import { RentSaveStructure } from 'src/app/models/rent-save-structure.model';
import { VerzInfoStructure } from 'src/app/models/verz-info-structure.model';

// ETC
import * as $ from 'jquery';
import { async } from '@angular/core/testing';
import { locateHostElement } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  verzoeken: Verzoek[];
  listverzoeken: Verzoek[];
  producten: Product[];
  defproducten: Product[];
  listproducten: Product[];
  docenten: Docent[];
  dataSource: RentSaveStructure[];
  dataSource2: VerzInfoStructure[];

  userName: string;

  // Length checks
  verzoekLength = 0;
  productLength = 0;
  defProductLength = 0;

  // Counts for products
  rentCount1 = 0;
  reserveCount1 = 0;
  rentCount2 = 0;
  reserveCount2 = 0;
  rentCount3 = 0;
  reserveCount3 = 0;
  rentCount4 = 0;
  reserveCount4 = 0;

  // Counts for verzoeken
  verzoekRentedCount = 0;
  verzoekCheckedCount = 0;
  verzoekReturnedCount = 0;

  constructor(
    private authService: AuthenticationService,
    private verzoekService: VerzoekService,
    private productService: ProductServiceService,
    private docentService: DocentService,
  ) { }

  ngOnInit() {
    this.getOpenVerzoeken();
    this.getNonProducten();
    this.getDefectProducten();
    this.getCountReservedAndRentedProducts();
    this.getInfoVerzoeken();
    this.loadChart();

    const user = JSON.parse(localStorage.getItem('docent'));

    this.loadUser(user["email"] as string);

    console.log(user["email"]);
        
    
  }

  async getOpenVerzoeken() {
    await this.verzoekService.getOpenVerzoeken().subscribe(data => {
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

  async getDefectProducten() {
    await this.productService.getDefectProducts().subscribe(data => {
      this.defproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.defProductLength = this.defproducten.length;
    });
  }

  getCountReservedAndRentedProducts() {
    this.productService.getBlok1RentedProducts().subscribe(data => {
      this.listproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.rentCount1 = this.rentCount1 + this.listproducten.length;
    }).add(this.productService.getBlok1ReserverdProducts().subscribe(data => {
      this.listproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.reserveCount1 = this.reserveCount1 + this.listproducten.length;
    }));

    this.productService.getBlok2RentedProducts().subscribe(data => {
      this.listproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.rentCount2 = this.rentCount2 + this.listproducten.length;
    }).add(this.productService.getBlok2ReserverdProducts().subscribe(data => {
      this.listproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.reserveCount2 = this.reserveCount2 + this.listproducten.length;
    }));

    this.productService.getBlok3RentedProducts().subscribe(data => {
      this.listproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.rentCount3 = this.rentCount3 + this.listproducten.length;
    }).add(this.productService.getBlok3ReserverdProducts().subscribe(data => {
      this.listproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.reserveCount3 = this.reserveCount3 + this.listproducten.length;
    }));

    this.productService.getBlok4RentedProducts().subscribe(data => {
      this.listproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.rentCount4 = this.rentCount4 + this.listproducten.length;
    }).add(this.productService.getBlok4ReserverdProducts().subscribe(data => {
      this.listproducten = data.map(e => {
        return {
          id: e.payload.doc.id,
          Naam: e.payload.doc.data()['Naam'],
          Type: e.payload.doc.data()['Type'],
          Status: e.payload.doc.data()['Status'],
        } as Product;
      });
      this.reserveCount4 = this.reserveCount4 + this.listproducten.length;
    }));
  }

  async getInfoVerzoeken() {
    await this.verzoekService.getRentedVerzoeken().subscribe(data => {
      this.listverzoeken = data.map(e => {
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
      this.verzoekRentedCount = this.verzoekRentedCount + this.listverzoeken.length;
    });

    await this.verzoekService.getCheckedVerzoeken().subscribe(data => {
      this.listverzoeken = data.map(e => {
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
      this.verzoekCheckedCount = this.verzoekCheckedCount + this.listverzoeken.length;
    });

    await this.verzoekService.getReturnedVerzoeken().subscribe(data => {
      this.listverzoeken = data.map(e => {
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
      this.verzoekReturnedCount = this.verzoekReturnedCount + this.listverzoeken.length;
    });

  }


  async loadChart() {
    await this.delay(2000);

    // Structure + Data for the products bar chart
    const structureData: RentSaveStructure[] = [{
        blok: '1',
        rented: this.rentCount1,
        reserved: this.reserveCount1,
    }, {
        blok: '2',
        rented: this.rentCount2,
        reserved: this.reserveCount2,
    }, {
        blok: '3',
        rented: this.rentCount3,
        reserved: this.reserveCount3,
    }, {
        blok: '4',
        rented: this.rentCount4,
        reserved: this.reserveCount4,
    }];

    // Structure + Data for the verzoeken pie chart
    const structureData2: VerzInfoStructure[] = [{
      status: 'In Behandeling',
      count: this.verzoekLength,
    }, {
      status: 'Goedgekeurd',
      count: this.verzoekCheckedCount,
    }, {
      status: 'Uitgeleend',
      count: this.verzoekRentedCount,
    }, {
      status: 'Teruggebracht',
      count: this.verzoekReturnedCount,
    }];

    this.dataSource = structureData;
    this.dataSource2 = structureData2;
  }

  async loadUser(email: string) {
    console.log('test');
    console.log(email);
    
    await this.docentService.getDocent(email).subscribe(data => {
      console.log('test2');
      console.log(data);
      
      this.docenten = data.map(e => {
        console.log(e.payload.doc.data()['Naam']);
        return {
          naam: e.payload.doc.data()['Naam'],
          email: e.payload.doc.data()['Email'],
          rol: e.payload.doc.data()['Rol'],
        } as Docent;
      });
    });
  }

  delay(milliseconds: number) {
      return new Promise<void>(resolve => {
          setTimeout(resolve, milliseconds);
      });
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
