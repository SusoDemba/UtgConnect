import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from './product.model';
import { ProductService } from '../../shared/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = [];
  productForm!: FormGroup;
  editingProduct: Product | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['null', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  
  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:3000/api/products').subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        this.errorMessage = 'Error fetching products';
      }
    );
  }

   addProduct(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.http.post<Product>('http://localhost:3000/api/products', product).subscribe(
        (response) => {
          this.successMessage = 'Product added successfully';
          this.fetchProducts();
          this.productForm.reset();
        },
        (error) => {
          this.errorMessage = 'Error adding product';
        }
      );
    }
   }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.patchValue(product);
  }

   updateProduct(): void {
    if (this.productForm.valid && this.editingProduct) {
      const updatedProduct = this.productForm.value;
      this.http
        .put<Product>(`http://localhost:3000/api/products/${this.editingProduct._id}`, updatedProduct)
        .subscribe(
          (response) => {
            this.successMessage = 'Product updated successfully';
            this.fetchProducts();
            this.editingProduct = null;
            this.productForm.reset();
          },
          (error) => {
            this.errorMessage = 'Error updating product';
          }
        );
    }
   }

   deleteProduct(productId: any): void {
    
    console.log("Deleting product with ID:",productId); // Debugging

    if (!productId) {
      console.error("Error: Product ID is undefined or empty!");
      return;
    }

    this.http.delete(`http://localhost:3000/api/products/${productId}`).subscribe(
      () => {
        this.successMessage = 'Product deleted successfully';
        this.fetchProducts();
      },
      (error) => {
        this.errorMessage = 'Error deleting product';
      }
    );
   }

   cancelEdit(): void {
    this.editingProduct = null;
    this.productForm.reset();
   }
}
