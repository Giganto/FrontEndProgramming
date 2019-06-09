import { Injectable } from '@angular/core';

// Firebase and model import
import { AngularFirestore } from '@angular/fire/firestore';
import { Docent } from 'src/app/models/docent.model';

@Injectable({
  providedIn: 'root'
})
export class DocentService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getDocenten() {
    return this.firestore.collection('Docenten').snapshotChanges();
  }

  getDocent(email: string) {
    return this.firestore.collection('Docenten').doc(email).snapshotChanges();
  }

  createDocent(Docent: Docent) {
    return this.firestore.collection('Docenten').add(Docent);
  }

  deleteDocent(email: string) {
    this.firestore.doc('Docenten/' + email).delete();
  }

  updateDocent(Docent: Docent) {
    // delete Docent.id;
    this.firestore.doc('Docenten/' + Docent.email).update(Docent);
  }
}
