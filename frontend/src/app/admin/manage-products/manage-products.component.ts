import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './product.model';
import { ProductService } from '../../shared/product.service';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  editingProduct: Product | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
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
        .put<Product>(`http://localhost:3000/api/products/${this.editingProduct.id}`, updatedProduct)
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

   deleteProduct(productId: string): void {
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
