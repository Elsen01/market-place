import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

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
}
