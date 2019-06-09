import { Component, OnInit, HostListener } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { VerzoekService } from 'src/app/services/verzoek.service';
import { Verzoek } from 'src/app/models/verzoek.model';

import * as $ from 'jquery';

@Component({
  selector: 'app-verzoek',
  templateUrl: './verzoek.component.html',
  styleUrls: ['./verzoek.component.scss']
})
export class VerzoekComponent implements OnInit {

  verzoeken: Verzoek[];

  constructor(
    private authService: AuthenticationService,
    private verzoekService: VerzoekService,
  ) { }

  ngOnInit() {
    this.verzoekService.getVerzoeken().subscribe(data => {
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
        }
        const newDate = null;
        return {
          id: e.payload.doc.id,
          Email: e.payload.doc.data()['Email'],
          Datum: newDate,
          Blok: e.payload.doc.data()['Blok'],
          Product: e.payload.doc.data()['Product'],
          Status: e.payload.doc.data()['Status'],
        } as Verzoek;
      });
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
