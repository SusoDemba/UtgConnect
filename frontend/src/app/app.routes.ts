import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProductListingComponent } from './products/product-listing/product-listing.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AuthGuard } from './shared/auth.guard';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';

export const routes: Routes = [

//   { path: 'admin/dashboard', 
//     component: DashboardComponent,  
//   canActivate:[AuthGuard],
// data: {role:'admin'}},
//   { path: '', 
//     component: ProductListingComponent },
//   { path: 'login', 
//     component: LoginComponent },
//   { path: 'signup', 
//     component: SignupComponent },
//   { path: 'products/:id', 
//     component: ProductDetailComponent },
  
 
  { path: 'admin',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
     
  },
//   {

//     path: 'add-product', 
//      component: AddProductComponent, 
//    canActivate:[AuthGuard]
//  },
//   { path: '**', redirectTo: '' }

{ path: '', component: ProductListingComponent },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
{path:"navBar",
  component: NavbarComponent, canActivate:[AuthGuard]
}

,
{path:"manageProduct", component:ManageProductsComponent},

{path:"manageUser", component:ManageUsersComponent}

 ];
