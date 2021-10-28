import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // signUpForm!: FormGroup
  public signUpForm = this.formBuilder.group({
    name: ['',
     [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40)
    ]],
    email: ['',
    [Validators.required,
    Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    phone: ['', [Validators.required]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  })
  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    
  }
  //create user
  signUp(){
    this._http.post<any>("http://localhost:3000/signup", this.signUpForm.value).subscribe(res => {
      alert("ok");
      this.signUpForm.reset();
      this.router.navigate(['login']);
    },
    err => {
      alert("no ok");
    })
  }

}
