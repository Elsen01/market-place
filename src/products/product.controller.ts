import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.request.dto';
import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseProductDto } from './dto/product.response.dto';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    return await this.productService.getProductAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.productService.getById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('prodImg'))
  @ApiOkResponse({ type: ResponseProductDto })
  async createdProduct(
    @Body(new ValidationPipe({ transform: true })) dto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp(`\.(gif|jpe?g|tiff?|png|webp|bmp)$`),
        })
        .addMaxSizeValidator({
          maxSize: 1000000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    prodImg: Express.Multer.File,
  ) {
    return await this.productService.createProduct(dto, prodImg);
  }

  @Delete('/:id')
  async deletedProduct(@Param('id', new ParseIntPipe()) id: number) {
    return await this.productService.deleteProduct(id);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('prodImg'))
  @Put('id')
  async updatedProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    dto: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp(`\.(gif|jpe?g|tiff?|png|webp|bmp)$`),
        })
        .addMaxSizeValidator({
          maxSize: 1000000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    prodImg: Express.Multer.File,
  ) {
    return await this.productService.updateProduct(id, dto, prodImg);
  }
}
