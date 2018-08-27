import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from './dashboard/dashboard';
// import { AngularFireAuth } from "angularfire2/auth";
// import * as firebase from "firebase";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('uname') uname;
  @ViewChild('upass') upass;

  constructor(public navCtrl: NavController, 
             ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignIn');
  }

  async signIn(){
    
    const result = this.uname;
    console.log(result);

    // try{
    //   const result = this.myAuth.auth.signInWithEmailAndPassword(this.uname, this.upass);
    //   console.log(result);
    // }
    // catch(e){
    //   console.log(e)
    // }
    
  
    console.log('sign');
    this.navCtrl.push(DashboardPage);
  }
}
