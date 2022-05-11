import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const productId = new Date().toString();
    const newProduct = new Product(productId, title, description, price);
    this.products.push(newProduct);
    return productId;
  }

  getProducts() {
    return [...this.products];
  }
}
