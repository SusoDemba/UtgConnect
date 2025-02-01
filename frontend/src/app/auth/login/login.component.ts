import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string="";

  
   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if(this.loginForm.invalid){
      this.errorMessage="Please fill in all the field correctly"

      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response: any) => {


        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

          if (response.role === 'admin') {
          this.router.navigate(['/add-product']);  // Redirect to add product page
        } else {
          this.router.navigate(['/']);  // Redirect normal users to homepage
        }



        // this.authService.saveToken(response.token,response.role); // Store the JWT

        // if (response.role === 'admin') {
        //   this.router.navigate(['/add-product']);
        // } else {
        //   this.router.navigate(['']);
        //   console.log(localStorage.getItem('token'))
        // }


        // this.router.navigate(['/dashboard']); // Navigate it was navigate admin and dasboard to the home page
      },
      error: (err) => {
        this.errorMessage='Invalid email or password'; // Display an error message
      },
    });
  }
}
