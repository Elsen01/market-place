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

  @Put('/:id')
  async updatedUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body()
    dto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, dto);
  }
}
