import { Component } from '@angular/core';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent {

}

// import { Component, OnInit } from '@angular/core';
// import { ProductService, Product } from '../shared/product.service';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css'],
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.productService.getProducts().subscribe({
//       next: (data: Product[]) => (this.products = data),
//       error: (err: any) => console.error('Failed to load products:', err),
//     });
//   }
// }
