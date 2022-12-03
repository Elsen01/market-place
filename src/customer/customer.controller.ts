import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCostumerDto } from './dto/costumer.request.dto';
import { ResponseCustomerDto } from './dto/customer.response.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('')
  @ApiOkResponse({ type: ResponseCustomerDto })
  async createdCustomer(@Body() dto: CreateCostumerDto) {
    return await this.customerService.createCostumer(dto);
  }
}
