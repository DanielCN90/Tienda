import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/core/models/cart.model';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/modules/admin/products/services/product.service';
import { CartService } from 'src/app/modules/public/store/services/cart.service';

@Component({
  selector: 'app-minicard',
  templateUrl: './minicard.component.html',
  styleUrls: ['./minicard.component.scss']
})
export class MinicardComponent {
  value: number = 4;
  
  @Input()
  cart!: Cart;

  product: Product = {
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: []
  };
  title: string = '';
  category: string = '';
  description: string = '';
  imageSrc: string = '';
  price: number = 0;

  constructor(private cartService: CartService){}
  
  ngOnInit(): void {
    this.updateProduct()
  }

  removeFromCart(){
    if ( this.cart.product.id !== undefined ){
      this.cartService.removeElementById(this.cart.product.id);
      this.cartService.storeInLocal();
    }
  
  }



  updateProduct(){
    this.title = this.cart.product.title
    this.category = this.cart.product.category
    this.description = this.cart.product.description
    this.imageSrc = this.cart.product.images[0]
    this.price = this.cart.product.price
  }
}
