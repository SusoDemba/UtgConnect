import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

}


// import { Component } from '@angular/core';
// import { AuthService } from '../../shared/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   fullName: string = '';
//   email: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   termsAccepted: boolean = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit() {
//     if (this.password !== this.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     const userData = {
//       fullName: this.fullName,
//       email: this.email,
//       password: this.password,
//     };

//     this.authService.signup(userData).subscribe({
//       next: () => {
//         alert('Registration successful! Please log in.');
//         this.router.navigate(['/login']);
//       },
//       error: (err) => {
//         alert('Registration failed. Please try again.');
//         console.error(err);
//       },
//     });
//   }
// }