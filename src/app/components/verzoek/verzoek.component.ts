import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-verzoek',
  templateUrl: './verzoek.component.html',
  styleUrls: ['./verzoek.component.scss']
})
export class VerzoekComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
