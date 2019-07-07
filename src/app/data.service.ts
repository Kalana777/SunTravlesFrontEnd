import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelModel } from './models/hotelmodel';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getHotels(){
    return this.http.get('http://localhost:8080/hotel/all')

  }

  getHotelNames(){
     return this.http.get('http://localhost:8080/hotel/all');
  }

  getRoomTypeNames(){
    return this.http.get('http://localhost:8080/roomType/getDistinct')
  }

  setContracts(model:FormData, bool:Boolean){
    console.log("asdsdsad");
    if(bool){
      console.log("logger")
      return this.http.post<any>("http://localhost:8080/contractForm/newHotel",model).subscribe(
      (res)=>console.log(res),
      //(err)=>console.log(err)
    );
    }
    else{
      console.log("logger2")
      return this.http.post<any>("http://localhost:8080/contractForm/existingHotel",model).subscribe(
      (res)=>console.log(res),
      //(err)=>console.log(err)
    );
    }
    

  }
}

//