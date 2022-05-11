import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, description, price);
    this.products.push(newProduct);
    return productId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      throw new NotFoundException("Could'n find product.");
    }
    return { ...product };
  }
}
