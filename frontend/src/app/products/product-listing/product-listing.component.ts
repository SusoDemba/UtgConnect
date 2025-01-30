import { Component ,OnInit} from '@angular/core';
import { ProductService, Product } from '../../shared/product.service';


@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})

export class ProductListingComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => (this.products = data),
      error: (err: any) => console.error('Failed to load products:', err),
    });
  }
}
