import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterLink } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  docent: User;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(docent => {
      if (docent) {
        this.docent = docent;
        localStorage.setItem('docent', JSON.stringify(this.docent));
      } else {
        localStorage.setItem('docent', null);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    } catch (e) {
      alert('Error!' + e.message);
    }
  }

  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('docent');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('docent'));
    return user !== null;
  }

  async createUser(email: string, password: string){
    // Known bug, that makes it create the user but also gives a error which results in the data being handled but freezing the website untill a reload or f5.
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(value => {
        console.log('Success!', value);
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
    });
    } catch (e) {
      console.log('Error!' + e.message);
    }
  }

}
