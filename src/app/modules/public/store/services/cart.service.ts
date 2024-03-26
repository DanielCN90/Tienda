import { Injectable, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/models/cart.model';
import { ProductService } from 'src/app/modules/admin/products/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart[] = [];

  constructor(private productService: ProductService) {}

  storeInCart(id: string) {
    // Verificar si ya existe un elemento con el mismo id en el array
    const existingItem = this.cart.find(
      (item) => item.product.id?.toString() === id
    );

    // Si el elemento ya existe, aumenta la cantidad en uno
    if (existingItem) return existingItem.quantity++;

    //Si no existe el elemeto, se crea uno nuevo 
    const newCartItem: Cart = {
      product: {
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
      },
      quantity: 0,
    };
    newCartItem.quantity = 1;

    return this.productService.getProductById(id).subscribe((data) => {
      newCartItem.product = data;
      this.cart.push(newCartItem);
    });
  }
}