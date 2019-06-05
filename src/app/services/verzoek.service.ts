import { Injectable } from '@angular/core';

// Firebase and model import
import { AngularFirestore, AngularFirestoreDocument, CollectionReference } from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Verzoek } from 'src/app/models/verzoek.model';

@Injectable({
  providedIn: 'root'
})
export class VerzoekService {

  constructor(
    private firestore: AngularFirestore,
    private afDatabase: AngularFireDatabase,
  ) { }

  getVerzoeken() {
    return this.firestore.collection('Verzoeken').snapshotChanges();
  }

  getOpenVerzoeken() {
    return this.firestore.collection('Verzoeken', ref => ref.where('Status', '==', 'In behandeling')).snapshotChanges();
  }

  getVerzoek(id: string) {
    return this.firestore.collection('Verzoeken').doc(id).snapshotChanges();
  }

  createVerzoek(verzoek: Verzoek) {
    return this.firestore.collection('Verzoeken').add(verzoek);
  }

  deleteVerzoek(verzoekId: string) {
    this.firestore.doc('Verzoeken/' + verzoekId).delete();
  }

  updateVerzoek(verzoek: Verzoek) {
    this.firestore.doc('Verzoeken/' + verzoek.id).update(verzoek);
  }

  acceptVerzoek(verzoek: Verzoek) {
    verzoek.Status = 'Goedgekeurd';
    console.log(verzoek.Status);
    this.firestore.doc('Verzoeken/' + verzoek.id).update(verzoek);
  }

  cancelVerzoek(verzoek: Verzoek) {
    verzoek.Status = 'Afgewezen';
    this.firestore.doc('Verzoeken/' + verzoek.id).update(verzoek);
  }

}
