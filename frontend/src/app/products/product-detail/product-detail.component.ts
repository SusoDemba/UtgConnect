// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-detail',
//   standalone: true,
//   imports: [],
//   templateUrl: './product-detail.component.html',
//   styleUrl: './product-detail.component.css'
// })
// export class ProductDetailComponent {

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    // if (productId) {
    //   this.productService.getProductById(productId).subscribe({
    //     next: (data) => {
    //       this.product = data;
    //     },
    //     error: (err) => {
    //       console.error('Error fetching product:', err);
    //       alert('Product not found.');
    //       this.router.navigate(['/products']); // Navigate back if product is not found
    //     },
    //   });
    // } else {
    //   alert('Invalid product ID.');
    //   this.router.navigate(['/products']);
    // }
   }
}