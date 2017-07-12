import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { BillProvider } from '../../providers/bill/bill';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera } from '@ionic-native/camera'
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
public placeholderPicture: string="http://via.placeholder.com/350x150";

constructor(public navCtrl: NavController, public navParams: NavParams,
public actionCtrl: ActionSheetController, public platform: Platform,
public alertCtrl: AlertController, public billProvider: BillProvider, private authProvider : AuthProvider,
public cameraPlugin: Camera) {}

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
uploadPicture(billId): void {
if (this.authProvider.getUser().isAnonymous == true){
const alert = this.alertCtrl.create({
message: `If you want to continue you will need to
provide an email and create a password`,
buttons: [
{ text: "Cancel" },
{
text: "OK",
handler: data => {
this.navCtrl.push('SignupPage');
}
}
]
});
alert.present();
} else {
  this.cameraPlugin.getPicture({
quality : 95,
destinationType : this.cameraPlugin.DestinationType.DATA_URL,
sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
allowEdit : true,
encodingType: this.cameraPlugin.EncodingType.PNG,
targetWidth: 500,
targetHeight: 500,
saveToPhotoAlbum: true
}).then(imageData => {
this.billProvider.takeBillPhoto(billId, imageData);
}, error => {
console.log("ERROR -> " + JSON.stringify(error));
});
}
}
}
