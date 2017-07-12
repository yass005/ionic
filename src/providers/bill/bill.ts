import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
AngularFireDatabase,
FirebaseListObservable,
FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';


/*
  Generated class for the BillProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BillProvider {
public billList: FirebaseListObservable<any>;
public billDetail: FirebaseObjectObservable<any>;
public userId: string;

  constructor(public afAuth: AngularFireAuth, public afDatabase:
AngularFireDatabase){
this.userId = this.afAuth.auth.currentUser.uid
this.billList = this.afDatabase
.list(`/userProfile/${this.afAuth.auth.currentUser.uid}/billList`);
}

getBillList(): FirebaseListObservable<any> {
return this.billList;
}
getBill(billId: string): FirebaseObjectObservable<any> {
return this.billDetail = this.afDatabase
.object(`/userProfile/${this.userId}/billList/${billId}`);
}
createBill(name: string, amount: number, dueDate: string = null,
paid: boolean = false):firebase.Promise<any>{
return this.billList.push({ name, amount, dueDate, paid });
}

removeBill(billId: string): firebase.Promise<any> {
return this.billList.remove(billId);
}
payBill(billId: string): firebase.Promise<any> {
return this.billList.update(billId, {paid: true});
}
takeBillPhoto(billId: string, imageURL: string): any {
const storageRef = firebase.storage().ref(this.userId);
return storageRef.child(billId).child('billPicture')
.putString(imageURL, 'base64', {contentType: 'image/png'})
.then( pictureSnapshot => {
this.billList.update(billId, { picture: pictureSnapshot.downloadURL });
});
}
}
