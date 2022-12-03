import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.request.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseOrderDto } from './dto/order.response.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  @ApiOkResponse({ type: ResponseOrderDto })
  async createdOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto);
  }
}
