import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProductById(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(p => p.id === productId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException("Could'n find product.");
    }
    return [product, productIndex];
  }

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
    const product = this.findProductById(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProductById(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(productId: string) {
    const index = this.findProductById(productId)[1];
    this.products.splice(index, 1);
  }
}
