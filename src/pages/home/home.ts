import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '../../../node_modules/@ionic-native/geolocation';
import { StationsServiceProvider } from '../../providers/stations-service/stations-service';
import { Station } from '../../app/station.interface';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  myLocation;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  setmarker: any = [
    {"name":"Shell", "lat":9.055035, "lng":7.460785, "content": "mobil maitama", "icon":1},
    {"name":"Total", "lat":10.531850, "lng":7.429470, "content": "texaco ", "icon":2},
    {"name":"Mobil", "lat":10.531850, "lng":7.429470, "content": "NNPC Mega", "icon":3}
];


  constructor(public navCtrl: NavController, 
              private geolocation:Geolocation,
              private platform: Platform,
              private stationsProvider: StationsServiceProvider) {

                this.platform.ready().then(
                  () => {
                   this.initMap();
                   this.onGetStations();
                  });
                  
    
  }  

  
  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
    .then((resp) => {
      this.myLocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: this.myLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.directionsDisplay.setMap(this.map);


      let marker = new google.maps.Marker({
        position: this.myLocation,
        map: this.map,
        title: 'Me',
        animation: google.maps.Animation.DROP
      });

      this.onAddMarkers(this.setmarker);

    }).catch(()=>{
      console.log("Failed to get Map");
    });

  }  

  onGetStations(){
    this.stationsProvider.getStations()
    .then((resp) => {
      this.setmarker.push(resp);
    }).catch((err)=>{
      console.log(err)+" From get observable";
    });
    
  }

  onAddMarkers(markers){
    for(let marker of markers){
      var loc = { lat : marker.lat, lng: marker.lng}
      var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      marker = new google.maps.Marker({
        position: loc,
        map: this.map,
        icon: image,
        animation: google.maps.Animation.DROP,
        title: marker.content
      });
    }
  }
  
  calcRoute(){

    let destination = new google.maps.LatLng(9.055035, 7.460785);
    this.directionsService.route({
      origin: this.myLocation,
      destination: '9.055035, 7.460785',
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
