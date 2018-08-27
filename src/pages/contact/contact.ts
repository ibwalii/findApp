import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('pnum') pnum;
  @ViewChild('name') cname;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  contact() {
    const alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Your request has been received!',
      buttons: ['OK']
    });
    alert.present();
    this.cname.value = "";
    this.pnum.value = "";
  }
}
