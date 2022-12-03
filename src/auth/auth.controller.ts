import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseUserDto } from '../user/dto/user.response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/:register')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('userImg'))
  @ApiOkResponse({ type: ResponseUserDto })
  async register(
    @Body(new ValidationPipe({ transform: true })) dto: CreateUserDto,
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
    const user = await this.authService.register(dto, userImg);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('/:login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }
}
