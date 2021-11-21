import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private router: Router) {

  }
  redirectToHome() {
    this.router.navigate(['/location']);
  }
  onClick(action: string) {
    switch (action) {
      case 'A PROPOS':
        break;
      case 'CONNEXION':
      case 'INSCRIPTION':
        this.router.navigate(['/connexion']);
        break;
      case 'DECONNEXION':
        this.router.navigate(['/connexion']);
        break;

    }
  }
}
