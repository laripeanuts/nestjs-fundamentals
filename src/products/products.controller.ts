import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body("title") productTitle: string,
    @Body("description") productDescription: string,
    @Body("price") productPrice: number,
  ) {
    const generatedId = this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(":id")
  getOneProduct(@Param("id") productId: string) {
    return this.productsService.getProduct(productId);
  }
}
