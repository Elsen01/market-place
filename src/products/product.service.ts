import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.request.dto';
import { v4 as uuid4 } from 'uuid';
import { unlink, writeFile } from 'fs/promises';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getProductAll() {
    return await this.productRepository.find();
  }

  async getById(id: number) {
    const prod = await this.productRepository.findOne({ where: { id } });
    if (!prod) {
      throw new HttpException(`Product Not Found`, HttpStatus.NOT_FOUND);
    }
    return prod;
  }

  async createProduct(dto: CreateProductDto, prodImg: Express.Multer.File) {
    const prodImgUrl = uuid4() + prodImg.originalname;

    const product = new ProductEntity();
    product.createdAt = dto.createdAt;
    product.name = dto.name;
    product.price = dto.price;
    product.prodImg = prodImgUrl;

    const [newProd] = await Promise.all([
      this.productRepository.save(product),
      writeFile(`src/images/${prodImgUrl}`, prodImg.buffer),
    ]);
    return newProd;
  }
  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException(`Product Not Found`, HttpStatus.NOT_FOUND);
    }
    if (product.id) {
      await this.productRepository.remove(product);
      return;
    }
    throw new BadRequestException(`Product Not Found`);

    try {
      await unlink(`src/images/${product.prodImg}`);
    } catch (err) {
      console.log(err);
    }
  }
  async updateProduct(id, dto: UpdateProductDto, prodImg: Express.Multer.File) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException(`Product Not Found`, HttpStatus.NOT_FOUND);
    }
    product.name = dto.name;
    product.price = dto.price;
    product.prodImg = dto.prodImg;

    if (prodImg) {
      const image = uuid4() + prodImg.originalname;
      try {
        await unlink(`src/images/${product.prodImg}`);
      } catch (err) {
        console.log(err);
      }
      product.prodImg = image;

      await writeFile(`src/images/${image}`, prodImg.buffer);
    }

    return await this.productRepository.save(product);
  }
}
