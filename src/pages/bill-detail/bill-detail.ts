import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { BillProvider } from '../../providers/bill/bill';

/**
 * Generated class for the BillDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bill-detail',
  templateUrl: 'bill-detail.html',
})
export class BillDetailPage {

public bill: any;
constructor(public navCtrl: NavController, public navParams: NavParams,
public actionCtrl: ActionSheetController, public platform: Platform,
public alertCtrl: AlertController, public billProvider: BillProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillDetailPage');
  }
ionViewDidEnter(){
this.billProvider.getBill(this.navParams.get("billId"))
.subscribe( billSnap => {
this.bill = billSnap;
});
}
showOptions(billId): void{
const action = this.actionCtrl.create({
title: 'Modify your bill',
buttons: [
{
text: 'Delete',
role: 'destructive',
icon: !this.platform.is('ios') ? 'trash' : null,
handler: () => {
this.billProvider.removeBill(billId)
.then( () => { this.navCtrl.pop(); });
}
},
{
text: 'Mark as Paid!',
icon: !this.platform.is('ios') ? 'checkmark' : null,
handler: () => {
this.billProvider.payBill(billId);
}
},
{
text: 'Cancel',
role: 'cancel',
icon: !this.platform.is('ios') ? 'close' : null,
handler: () => {
console.log('Cancel clicked');
}
}
]
});
action.present();
}
}
