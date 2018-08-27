import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Station } from '../../app/station.interface';
/*
  Generated class for the StationsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StationsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StationsServiceProvider Provider');
  }

  getStations() {
    return new Promise(resolve => {
      this.http.get('assets/data.json')
      .map( (response:any) => {
        const stations: Station[] = response.stations;
        return stations;
      })
      .subscribe(
        (stations: Station[]) => {
          resolve(stations);
      }, err => {
          console.log(err);
      }); 
    });  
  }
  
}
