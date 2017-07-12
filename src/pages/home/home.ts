import { Component } from '@angular/core';
import {
NavController,
ActionSheetController,
Platform } from 'ionic-angular';

import { BillProvider } from '../../providers/bill/bill';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public billList: any;

constructor(public navCtrl: NavController,
public actionCtrl: ActionSheetController, public platform: Platform,
public billProvider: BillProvider) {

}
ionViewDidLoad(){
this.billList = this.billProvider.getBillList();
}
createBill(): void { this.navCtrl.push('CreateBillPage'); }

goToPaidBill(billId: string): void {
this.navCtrl.push('BillDetailPage', { 'billId': billId });
}

moreBillOptions(billId){

let action = this.actionCtrl.create({
title: 'Modify your bill',
buttons: [
{
text: 'Delete',
role: 'destructive',
icon: !this.platform.is('ios') ? 'trash' : null,
handler: () => {
this.billProvider.removeBill(billId);
}
},
{
text: 'More details',
icon: !this.platform.is('ios') ? 'play' : null,
handler: () => {
this.navCtrl.push('BillDetailPage', {
'billId': billId
});
}
},


]
});
action.present();
}

}
