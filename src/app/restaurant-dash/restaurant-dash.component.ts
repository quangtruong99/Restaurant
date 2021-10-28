import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  popoverTitle = 'Cảnh báo !';
  popoverMessage = 'Bạn có chắc muốn xóa';
  confirmClicked = false;
  cancelClicked = false;
  formValue!: FormGroup
  restaurantModelObj : RestaurantData = new RestaurantData
  allRestaurantData: any 
  showAdd! : boolean
  showBtn!: boolean
  totalLength: any;
  page: number = 1;
  constructor( private formBuilder: FormBuilder, private api :ApiService) { }

  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      service: ['']
    })
    this.getAllData();
    
  }
  clickAddRes(){
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  } 
  addRestaurant(){
    this.showAdd = true;
    this.showBtn = false;
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.phone = this.formValue.value.phone;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.service;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res =>{
      
      console.log(res);
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    },
    err=>{
      alert("no ok");
    }
    )
  }

  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData = res;
      this.totalLength = res.length;
      console.log(res);
    })
  } 
  deleteRes(data: any){
    this.api.deleteRestaurant(data.id).subscribe(res =>{
     
        this.getAllData();
    })
  }
  updateRes(data: any){
    this.showAdd = false;
    this.showBtn = true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
    
  }
  onUpdateRes(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.phone = this.formValue.value.phone;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.service;
    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res =>{
          alert("update success");
          let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
      })
  }

}


