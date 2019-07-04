import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  submitted = false;
  success = false;
  hotel: Object;

  constructor( private data:DataService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      province: [''],
      hotel_name: [''],
      roomSingle: [0],
      roomDouble: [0],
      roomTriple: [0],
      roomQuadruple: [0],
      check_in: [],
      no_nights: [1]
      
    })
   }

   onSubmit(){
     this.submitted= true;
     console.log("submitted");

     if(this.searchForm.invalid){
       return;
     }

   }
   firstClick(){
    this.data.getHotels().subscribe(data => {
      this.hotel = data
      console.log(this.hotel);
      }
    );
   }

  ngOnInit() {
    
  }

}
