import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '../../../node_modules/@ionic-native/geolocation';
import { StationsServiceProvider } from '../../providers/stations-service/stations-service';
import { Station } from '../../app/station.interface';
import { SelectSearchableComponent } from 'ionic-select-searchable';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  stations: Station[];
  station: Station;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  myLocation;
  dest: string;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  setmarker: any 
  = [
    {"name":"Shell", "lat":9.055035, "lng":7.460785, "content": "", "icon":1,  "status": 1},
    {"name":"Forte Oil", "lat":10.546735, "lng":7.439889, "content": "Ungwan Sarki", "icon":2, "status": 0},
    {"name":"Total Abakpa", "lat":10.542737, "lng":7.432937, "content": "Near Giwa Hospital", "icon":3, "status": 1}
];


  constructor(public navCtrl: NavController, 
              private geolocation:Geolocation,
              private platform: Platform,
              private stationsProvider: StationsServiceProvider) {

                this.stations ;

                this.platform.ready().then(
                  () => {
                   this.initMap();
                   this.onGetStations();
                  });

                  
                  
    
  }  

   stationChange(event: {
        component: SelectSearchableComponent,
        value: any 
    }) {
        let lat = event.value.lat.toString();
        let lng = event.value.lng.toString();
        this.dest = lat+", "+lng;
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
      this.setmarker = resp;
      this.stations = this.setmarker;
    }).catch((err)=>{
      console.log(err+" From get observable");
    });    
    //console.log(res);
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

    //new google.maps.LatLng(9.055035, 7.460785);
    this.directionsService.route({
      origin: this.myLocation,
      destination: this.dest,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log(this.dest);
      } else {
        window.alert('Directions request failed due to ' + status);
        console.log(this.dest);
      }
    });
  }
}
