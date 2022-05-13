import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body("title") productTitle: string,
    @Body("description") productDescription: string,
    @Body("price") productPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(":id")
  getOneProduct(@Param("id") productId: string) {
    return this.productsService.getProduct(productId);
  }

  @Patch(":id")
  async updateProduct(
    @Param("id") productId: string,
    @Body("title") productTitle: string,
    @Body("description") productDescription: string,
    @Body("price") productPrice: number,
  ) {
    await this.productsService.updateProduct(
      productId,
      productTitle,
      productDescription,
      productPrice,
    );
    return null;
  }

  @Delete(":id")
  async deleteProduct(@Param("id") productId: string) {
    await this.productsService.deleteProduct(productId);
    return null;
  }
}
