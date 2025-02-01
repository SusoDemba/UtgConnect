// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';
// import { ProductListingComponent } from './products/product-listing/product-listing.component';
// import { ProductDetailComponent } from './products/product-detail/product-detail.component';
// import { AddProductComponent } from './products/add-product/add-product.component';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { AuthGuard } from './shared/auth.guard';

// export const routes: Routes = [
//   { path: '', component: ProductListingComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
//   { path: 'products/:id', component: ProductDetailComponent },
//   { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
//   { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: 'admin/dashboard', component: DashboardComponent },
//   { path: '**', redirectTo: '' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
