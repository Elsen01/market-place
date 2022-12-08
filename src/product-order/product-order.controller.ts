import { Body, Controller, Post } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductOrder } from './dto/product-order.request.dto';

@ApiTags('product-order')
@Controller('product-order')
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {}

  @Post('')
  async createdProductOrder(@Body() dto: CreateProductOrder) {
    return this.productOrderService.createProductOrder(dto);
  }
}
