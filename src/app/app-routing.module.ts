import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProposeProductComponent } from './propose-product/propose-product.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'connexion',
    component: LoginComponent
  },
  {
    path:'proposer',
    component: ProposeProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'location',
    component: ProductListComponent
  },
  {
    path:'location/categorie/:categorie',
    component: ProductListComponent
  },
  {
    path:'location/:id',
    component: ProductDetailsComponent
  },
  {
    path:'**',
    redirectTo: 'location',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
