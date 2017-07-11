import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public loadingCtrl : LoadingController,
   public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

goToLogin():void { this.navCtrl.push('LoginPage'); }

goToBillList():void {
this.authProvider.anonymousLogin().then( () => {
loading.dismiss().then( () => {
this.navCtrl.setRoot(HomePage);
});
});
const loading = this.loadingCtrl.create();
loading.present();
}
}
