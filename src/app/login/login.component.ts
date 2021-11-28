import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { sha256 } from '../shared/utils';

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
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  get disabled() {
    return this.register ? !this.loginForm.valid || this.loginForm.get('password')?.value != this.loginForm.get('passwordConfirmation')?.value :
            !this.loginForm.get('tel')?.valid || !this.loginForm.get('password')?.valid;
  }
  submit() {
    const user = this.loginForm.value;
    user.tel = user.tel.replace(/ /g, '');
    user.password = sha256(user.password);
    if (this.register) {
      user.passwordConfirmation = user.password;
      this.userService.createUser(user).subscribe(() => {
        this.userService.currentUser = user;
        this.router.navigate(['/location']);
      });
    } else {
      this.userService.getByLoginPassword(user.tel, user.password).subscribe((res) => {
        this.userService.currentUser = res[0];
        this.router.navigate(['/location']);
      });
    }
  }
}
