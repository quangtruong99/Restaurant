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
  formValue!: FormGroup
  restaurantModelObj : RestaurantData = new RestaurantData
  allRestaurantData: any 
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
  
  addRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.name;
    this.restaurantModelObj.phone = this.formValue.value.phone;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.service;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res =>{
      console.log(res);
      alert("ok nè");
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
    })
  }

}


