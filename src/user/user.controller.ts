import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { SignInDto } from './dto/signing.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  @ApiCreatedResponse({ description: 'User Have Been Created Successfully.' })
  @ApiForbiddenResponse({
    description: 'User Havent Been Created Successfully.',
  })
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.userService.signUp(signUpDto);
  }
  @Post('/signin')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User Have Been Logged In Successfully.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.userService.signIn(signInDto);
  }
}
