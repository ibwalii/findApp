import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";

import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient, HttpClientModule } from '../../node_modules/@angular/common/http';
import { StationsServiceProvider } from '../providers/stations-service/stations-service';
import { DashboardPage } from '../pages/about/dashboard/dashboard';
import { FIRE_CONFIG } from './app.firebase.config';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SelectSearchableModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIRE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    HttpClient,
    StationsServiceProvider,
    AngularFireAuth
  ]
})
export class AppModule {}
