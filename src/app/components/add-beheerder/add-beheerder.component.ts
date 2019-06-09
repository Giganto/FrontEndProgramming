import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthenticationService } from '../../services/authentication.service';
import { DocentService } from 'src/app/services/docent.service';

// Models
import { Docent } from 'src/app/models/docent.model';

@Component({
  selector: 'app-add-beheerder',
  templateUrl: './add-beheerder.component.html',
  styleUrls: ['./add-beheerder.component.scss']
})
export class AddDocentComponent implements OnInit {
  @Input() Docent = {naam: '', email: '', rol: 'Beheerder', password: ''};

  docenten: Docent[];

  constructor(
    private authService: AuthenticationService,
    private docentService: DocentService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.docentService.getDocenten().subscribe(data => {
      this.docenten = data.map(e => {
        return {
          email: e.payload.doc.data()['email'],
          naam: e.payload.doc.data()['naam'],
          rol: e.payload.doc.data()['rol']
        } as Docent;
      });
    });
  }

  async createBeheerder() {
    await this.authService.createUser(this.Docent.email, this.Docent.password);
    this.docentService.createDocent(this.Docent);
    this.router.navigate(['/dashboard']);

  }

  logout() {
    this.authService.logout();
  }
}
