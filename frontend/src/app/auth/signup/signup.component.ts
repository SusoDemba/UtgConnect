import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../model/user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  signUpForm= new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ]),
    password: new FormControl('',[Validators.required]),

    confirmPassword: new FormControl('',[Validators.required]),
    termsAccepted: new FormControl(false,[Validators.required])
  })
 

 private authService= inject(AuthService)
  private router= inject(Router) 



  constructor() {}
  ngOnInit(): void {
   
  
  }

  onSubmit() {

    

    const formValue= this.signUpForm.value;

    // password mismatch validation
    
    if (formValue.password !== formValue.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // User object to send to the backend

    
     const userData = {
      username: formValue.username || '', 
      email: formValue.email || '',
      password: formValue.password || '',
    };

    this.authService.signup(userData).subscribe({
      next: () => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Registration failed. Please try again.');
        console.error(err);
      },
    });
   }

}

