import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.request.dto';
import { writeFile } from 'fs/promises';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    console.log(user);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new UnauthorizedException(`AUTHORIZATION_ERROR`);
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateUserDto, userImg: Express.Multer.File) {
    const userImgUrl = uuid4() + userImg.originalname;
    const userDb = await this.findByEmail(dto.email);
    if (userDb) {
      throw new HttpException(
        `${dto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.age = dto.age;
    user.username = dto.username;
    user.password = await bcrypt.hash(dto.password, 10);
    user.userImg = userImgUrl;

    const [newUser] = await Promise.all([
      this.userRepository.save(user),
      writeFile(`src/images/${userImgUrl}`, userImg.buffer),
    ]);
    return newUser;
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
