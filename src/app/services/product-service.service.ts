import { Injectable } from '@angular/core';

// Firebase and model import
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
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

  // Returns Products that are non-active, is used in the dashboard
  getNonProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status', '==', 'Non-actief')).snapshotChanges();
  }

  // Returns Products that are defect, is used in the dashboard
  getDefectProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status', '==', 'Reparatie Nodig')).snapshotChanges();
  }

  // Returns the products filtered that are being RESERVERD in period 1, is used in the dashboard
  getBlok1ReserverdProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status1', '==', 'Gereserveerd')).snapshotChanges();
  }

  // Returns the products filtered that are being RENTED in period 1, is used in the dashboard
  getBlok1RentedProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status1', '==', 'Uitgeleend')).snapshotChanges();
  }

  // Returns the products filtered that are being RESERVERD in period 2, is used in the dashboard
  getBlok2ReserverdProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status2', '==', 'Gereserveerd')).snapshotChanges();
  }

  // Returns the products filtered that are being RENTED in period 2, is used in the dashboard
  getBlok2RentedProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status2', '==', 'Uitgeleend')).snapshotChanges();
  }

      // Returns the products filtered that are being RESERVERD in period 3, is used in the dashboard
  getBlok3ReserverdProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status3', '==', 'Gereserveerd')).snapshotChanges();
  }

  // Returns the products filtered that are being RENTED in period 3, is used in the dashboard
  getBlok3RentedProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status3', '==', 'Uitgeleend')).snapshotChanges();
  }

  // Returns the products filtered that are being RESERVERD in period 4, is used in the dashboard
  getBlok4ReserverdProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status4', '==', 'Gereserveerd')).snapshotChanges();
  }

  // Returns the products filtered that are being RENTED in period 4, is used in the dashboard
  getBlok4RentedProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status4', '==', 'Uitgeleend')).snapshotChanges();
  }

  getViableProducts() {
    return this.firestore.collection('Producten', ref => ref.where('Status', '==', 'Beschikbaar')).snapshotChanges();
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
