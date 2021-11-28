import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private router: Router, private userService: UserService) {

  }
  redirectToHome() {
    this.router.navigate(['/location']);
  }
  get userConnected() {
    return this.userService.currentUser;
  }
  onClick(action: string) {
    switch (action) {
      case 'A PROPOS':
        break;
      case 'CONNEXION':
        this.router.navigate(['/connexion']);
        break;
      case 'DECONNEXION':
        this.userService.currentUser = undefined;
        this.router.navigate(['/connexion']);
        break;

    }
  }
}
