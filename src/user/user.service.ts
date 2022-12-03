import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { unlink, writeFile } from 'fs/promises';
import { UpdateUserDto } from './dto/user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'email', 'password'],
    });
  }
  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
    }
    if (user.id) {
      await this.userRepository.remove(user);
      return;
    }
    throw new BadRequestException(`User Not Found`);

    try {
      await unlink(`src/images/${user.userImg}`);
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUser() {
    return await this.userRepository.find();
  }

  async getByUserId(id) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
    }
    return findUser;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(id, dto: UpdateUserDto, userImg: Express.Multer.File) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
    }

    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.username = dto.username;
    user.email = dto.email;
    user.age = dto.age;
    user.userImg = dto.userImg;

    if (userImg) {
      const image = uuid4() + userImg.originalname;
      try {
        await unlink(`src/images/${user.userImg}`);
      } catch (err) {
        console.log(err);
      }
      user.userImg = image;
      await writeFile(`src/images/${image}`, userImg.buffer);
    }
    return await this.userRepository.save(user);
  }
}
