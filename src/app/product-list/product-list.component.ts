import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  filteredProducts: any[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirectTo(id?: number) {
    if (id) {
      this.router.navigate(['/location/' + id]);
    } else {
      this.router.navigate(['/proposer'])
    }
  }
}
