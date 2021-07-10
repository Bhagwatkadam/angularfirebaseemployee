import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { employee } from '../interface/employee';
@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  constructor(private angularFirestore: AngularFirestore) { }

  saveEmployee(data: employee) {
    return this.angularFirestore.collection("Employee").add(data);
  }

  updateEmployee(data: employee) {
    let employeeId = data.id;
    delete data.id;  
    return this.angularFirestore.doc('Country/' + employeeId).update(data); 
  }
  getEmployee() {
    return this.angularFirestore.collectionGroup("Employee").snapshotChanges();
  }
  deleteEmployee(id: string) {
    return this.angularFirestore.doc("Employee/" + id).delete();
  }
}
