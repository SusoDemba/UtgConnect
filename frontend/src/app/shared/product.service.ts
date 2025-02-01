import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products'; // Backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }


  // getProducts(): Observable<any> {
  //   return this.http.get(this.baseUrl);
  // }


  // Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // Add a product
  addProduct(productData: any,imageFile:File): Observable<Product> {


    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('image', imageFile);

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token})
      
      // .set('Authorization', `Bearer ${token}`).set("Content-Type","application/json");
    return this.http.post<Product>(this.baseUrl, formData,{ headers });
  }

  // Update a product
  updateProduct(productId: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, product);
  }

  // Delete: any a product
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }

}


export type { Product };

