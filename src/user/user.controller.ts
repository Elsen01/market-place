import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/user.request.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('/:id')
  async deletedUser(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.deleteUser(id);
  }
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUser();
  }

  @Get('/:id')
  async byUserId(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.getByUserId(id);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('userImg'))
  @Put('/:id')
  async updatedUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    dto: UpdateUserDto,
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
    userImg: Express.Multer.File,
  ) {
    return await this.userService.updateUser(id, dto, userImg);
  }
}
