import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from './dashboard/dashboard';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('uname') uname;
  @ViewChild('upass') upass;

  constructor(public navCtrl: NavController,
              public myAuth : AngularFireAuth 
             ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignIn');
    this.myAuth.authState.subscribe( data => {
      if(data){
        this.navCtrl.push(DashboardPage);
      }
      else{ }
    });
  }

  async signIn(){
    try{
      const result = this.myAuth.auth.signInWithEmailAndPassword(this.uname.value, this.upass.value);
      if(result){
        this.navCtrl.push(DashboardPage);
      }
      else{
        console.log('Inside Try');
      }
    }
    catch(e){
      console.log('Error Message');
      console.log(e);
    }
    
  }
}
