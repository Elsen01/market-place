import { Body, Controller, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/basket.request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  async createdBasket(@Body() dto: CreateBasketDto) {
    return await this.basketService.createBasket(dto);
  }
}
