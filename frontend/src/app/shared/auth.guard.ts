import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService) {}

  // canActivate(): boolean {
  //   const token = localStorage.getItem('token');
  //   // const role = localStorage.getItem("role")
  //   if (!token) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }
  canActivate(): boolean {
    const role = this.authService.getRole();
    
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (role === 'admin') {
      return true;  // Allow admins
    }

    this.router.navigate(['/']);  // Redirect normal users
    return false;
  }
    
   


  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const token = this.authService.getToken();
  //   const userRole = this.authService.getRole();
  //   const requiredRole = route.data['role']; 
  //   if (!token) {
  //         this.router.navigate(['/login']);
  //         return false;
  //       }
        // if (requiredRole && userRole !== requiredRole) {
        //   this.router.navigate(['/unauthorized']);
        //   return false;
        // }

        
      }

    

   

