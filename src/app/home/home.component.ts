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
      singleRoom: [0],
      doubleRoom: [0],
      tripleRoom: [0],
      quadrupleRoom: [0],
      checkIn: [],
      checkOut:[]
      
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
