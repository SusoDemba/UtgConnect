import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProductListingComponent } from './products/product-listing/product-listing.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [

  { path: '', 
    component: LoginComponent },
  { path: 'products', 
    component: ProductListingComponent },
  { path: 'login', 
    component: LoginComponent },
  { path: 'signup', 
    component: SignupComponent },
  { path: 'products/:id', 
    component: ProductDetailComponent },
  { path: 'add-product', 
    component: AddProductComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'admin', 
    component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/dashboard',
    component: DashboardComponent },
  { path: '**', redirectTo: 'login' }
];
