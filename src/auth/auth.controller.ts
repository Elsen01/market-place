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
  @ApiOkResponse({ type: ResponseUserDto })
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('/:login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }
}
