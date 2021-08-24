import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/signing.dto';
import { SignUpDto } from './dto/signup.dto';
import { SignInPayload } from './dto/user.payload';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userRepository.createUser(signUpDto);
  }
  async signIn(signInDto: SignInDto): Promise<{ access_token }> {
    const username = await this.userRepository.validateUser(signInDto);
    if (!username) {
      throw new UnauthorizedException(
        'You Are Not Authorized To access. check Your credentials and try again, otherwise create an account',
      );
    }
    const pyload: SignInPayload = { username };
    const access_token = await this.jwtService.sign(pyload);
    return { access_token };
  }
}
