import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../model/product.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm: FormGroup
  selectedFile: File | null = null;

  constructor
  (private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,

  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Get selected file
  }







  onSubmit(): void {
   if(this.productForm.valid && this.selectedFile ){
    console.log('Form is valid')
    console.log("Sending product data:", this.selectedFile)
    


    const token= localStorage.getItem("token")
    console.log(token)

   
    
    this.productService.addProduct(this.productForm.value , this.selectedFile).subscribe({
      next: (newProduct) => {
        console.log('Product added:', newProduct);
       
        alert('Product added successfully!');
        this.router.navigate(['/products']); // Navigate to the product list
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product. Please login');
      },
    });
  }
   else{
    alert('Please fill out the form correctly.');
  } {
    alert('Please fill out the form correctly and upload an image.');
  }

   }
    
}