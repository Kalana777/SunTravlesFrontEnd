import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { frontEndResultModel } from '../models/frontEndResultModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  flag:Boolean = true;
  searchForm: FormGroup;
  submitted = false;
  success = false;
  frontEndSearchResult: Object;
  results: frontEndResultModel;
  

  constructor( private data:DataService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      province: [''],
      singleRooms: [0],
      doubleRooms: [0],
      tripleRooms: [0],
      quadrupleRooms: [0],
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

   changeFlag(){
    this.flag =false;
   }

   submitHandler(){
     console.log(this.searchForm.value)
    this.data.getSearchResults(this.searchForm.value).subscribe(data => {
      this.results = data
      console.log(this.results);
      }
    );
    if(this.results ==null){
      this.changeFlag();
    }
   }

  ngOnInit() {
    
  }

}
