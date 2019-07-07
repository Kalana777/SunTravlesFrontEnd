import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { HotelModel } from 'src/app/models/hotelmodel';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit {


  newHotelCheck: Boolean = false;
  oldHotelCheck: Boolean = true;

  states: Array<String> = ['AR', 'AL', 'CA', 'DC'];
  fruits: Array<String> = ['Mango', 'Grapes', 'Strawberry', 'Oranges'];
  favFruitsError: Boolean = true;
  selectedFruitValues = [];

  
  hotels: Array<HotelModel>;
  obj: Object;
  obj2: Object;
  hotelNames: String[];
  

  nestedForm: FormGroup;
  constructor(private _fb: FormBuilder, private data:DataService) {
   }

  ngOnInit() {

    this.data.getHotelNames().subscribe(data =>{
      this.obj = data
      console.log(this.obj)
      console.log(data)
    });

    // this.data.getRoomTypeNames().subscribe(data =>{
    //   this.obj2 = data
    //   console.log(this.obj2)
    //   console.log(data)
    // });
    
      


    this.nestedForm = this._fb.group({
      startDate: [],
      endDate:[],
      markup:[],
      hotelName:[],
      regNo:[],
      province:[],
      hotelAddress:[],
      hotelTp:[],
      roomTypeDetails: this._fb.array([this.addRoomTypeDetailsGroup()]),

      // firstName: [null, [Validators.required, Validators.minLength(2)]],
      // lastName: [null, Validators.required],
      // favFruits: this.addFruitsControls(),
      // address: this._fb.array([this.addAddressGroup()])
    });
  }

  checkNewHotel(){
    this.newHotelCheck = !this.newHotelCheck;
    this.oldHotelCheck = !this.oldHotelCheck;
  }

  addRoomTypeDetailsGroup(){
    return this._fb.group({
      maxAdults:[],
      roomTypeName:[],
      numberOfRooms:[],
      numberAvailable:[],
      cost:[]
    })
  }

  addFruitsControls() {
    const arr = this.fruits.map(item => {
      return this._fb.control(false);
    });

    return this._fb.array(arr);
  }

  addAddressGroup() {
    return this._fb.group({
      primaryFlg: [],
      streetAddress: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipcode: [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  addRoomType() {
    this.roomTypeArray.push(this.addRoomTypeDetailsGroup());
  }

  removeRoomType(index) {
    this.roomTypeArray.removeAt(index);
  }
  get roomTypeArray() {
    return <FormArray>this.nestedForm.get('roomTypeDetails');
  }

  // addAddress() {
  //   this.addressArray.push(this.addRoomTypeDetailsGroup());
  // }
  // removeAddress(index) {
  //   this.addressArray.removeAt(index);
  // }
  // get addressArray() {
  //   return <FormArray>this.nestedForm.get('roomTypeDetails');
  // }

  get fruitsArray() {
    return <FormArray>this.nestedForm.get('favFruits');
  }
  get firstName() {
    return this.nestedForm.get('firstName');
  }

  get lastName() {
    return this.nestedForm.get('lastName');
  }

  checkFruitControlsTouched() {
    let flg = false;
    this.fruitsArray.controls.forEach(control => {
      if (control.touched) {
        flg = true;
      }
    });

    return flg;
  }

  getSelectedFruitsValue() {
    this.selectedFruitValues = [];
    this.fruitsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFruitValues.push(this.fruits[i]);
      }
    });

    this.favFruitsError =  this.selectedFruitValues.length > 0 ? false : true;
  }

  submitHandler() {
    
    this.data.setContracts(this.nestedForm.value, this.newHotelCheck);
    console.log(this.nestedForm.value);
    const newItem = this.selectedFruitValues;
    if (this.nestedForm.valid && this.favFruitsError) {
      console.log({...this.nestedForm.value, newItem});
    }

  }

}
