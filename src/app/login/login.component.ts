import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  register = false;
  loginForm = new FormGroup({
    name: new FormControl(''),
    tel: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {
  }

}
