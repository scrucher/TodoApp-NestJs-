import { EntityRepository, Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  //ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignInDto } from './dto/signing.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signupDto: SignUpDto): Promise<void> {
    const { name, username, email, password } = signupDto;
    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashpassword(password, user.salt);
    const savedUser = await user.save();
    if (!savedUser) {
      throw new InternalServerErrorException('Please Try Again');
    }
    /*try {
      await user.save();
    } catch (error) {
      if (error.code === 2305) {
        throw new ConflictException('Username Already Token');
      } else {
        throw new InternalServerErrorException(
          'something went wrong Please try again',
        );
      }
    }*/
  }
  async validateUser(signInDto: SignInDto): Promise<string> {
    const { username, password } = signInDto;
    const user = await this.findOne(username);
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
  private async hashpassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
