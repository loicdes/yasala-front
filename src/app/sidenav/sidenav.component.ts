import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CATEGORIES } from '../const'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() sidenav: MatDrawer;
  categories = CATEGORIES;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectTo(categorie: string) {
      this.router.navigate(['/location/categorie/' + categorie]);
      this.sidenav.close();
  }
}
