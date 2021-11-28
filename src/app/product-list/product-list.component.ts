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
  categorie: string;
  cols: number;
  filter: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.calculateCols();
    window.addEventListener('resize', this.calculateCols);
    this.route.params.subscribe(param => {
      if (param.categorie && param.categorie !== '') {
        this.categorie = param.categorie;
        this.productService.getAllProductsByCategory(this.categorie).subscribe((res) => {
          this.allProducts = res;
        });
      } else {
        this.productService.getAllProducts().subscribe((res) => {
          this.allProducts = res;
        });
      }
    });
  }
  calculateCols() {
    this.cols = ~~(window.innerWidth/400);
  }
  redirectTo(id?: number) {
    if (id) {
      
    } else {
      this.router.navigate(['/proposer'])
    }
  }
  get filteredProducts() {
    return this.allProducts.filter(r => r.intitule?.toLowerCase().includes(this.filter.toLowerCase()) ||
    r.description.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
