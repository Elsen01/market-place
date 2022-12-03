import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCostumerDto } from './dto/costumer.request.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findByEmail(email: string) {
    return this.customerRepository.findOne({ where: { email } });
  }

  async createCostumer(dto: CreateCostumerDto) {
    const customer = await this.findByEmail(dto.email);
    if (customer) {
      throw new HttpException(
        `${dto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newCustomer = new Customer();
    newCustomer.lastName = dto.lastName;
    newCustomer.firstName = dto.firstName;
    newCustomer.email = dto.email;

    const saveCustomer = await this.customerRepository.save(newCustomer);
    return saveCustomer;
  }
}
