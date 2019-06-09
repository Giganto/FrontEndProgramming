import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators';

// Firebase and model import
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getProducts() {
    return this.firestore.collection('Producten').snapshotChanges();
  }

  getNonProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status', '==', 'Non-actief')).snapshotChanges();
  }

  getDefectProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status', '==', 'Reparatie nodig')).snapshotChanges();
  }

  getViableProducts() {
    var beschikbareProducten = this.firestore.collection('Producten', ref => ref.where('Status', '==', 'Beschikbaar')).snapshotChanges(); 
    var deelsBeschikbareProducten = this.firestore.collection('Producten', ref => ref.where('Status', '==', 'Deels beschikbaar')).snapshotChanges(); 
    

    const combinedList = combineLatest<any[]>(beschikbareProducten, deelsBeschikbareProducten).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur) ) ),
    )
    return combinedList; 
  }

  getProduct(id: string) {
    return this.firestore.collection('Producten').doc(id).snapshotChanges();
  }

  createProduct(product: Product) {
    return this.firestore.collection('Producten').add(product);
  }

  deleteProduct(id: string) {
    this.firestore.doc('Producten/' + id).delete();
  }

  updateProduct(product: Product) {
    // delete product.id;
    this.firestore.doc('Producten/' + product.id).update(product);
  }
}
