import { Controller, Post } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { CreateProductOrder } from './dto/product-order.request.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('product-order')
@Controller('product-order')
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {}

  @Post('')
  async createdProductOrder(dto: CreateProductOrder) {
    return await this.productOrderService.createProductOrder(dto);
  }
}
