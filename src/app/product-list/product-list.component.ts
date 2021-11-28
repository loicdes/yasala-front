import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  allProducts: any[] = [];
  filteredProducts: any[] = [];
  categorie: string;
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.categorie && param.categorie !== '') {
        this.categorie = param.categorie;
        this.productService.getAllProductsByCategory(this.categorie).subscribe((res) => {
          this.allProducts = res;
          this.filteredProducts = res;
        });
      }
    });
  }
  redirectTo(id?: number) {
    if (id) {
      this.router.navigate(['/location/' + id]);
    } else {
      this.router.navigate(['/proposer'])
    }
  }
}
