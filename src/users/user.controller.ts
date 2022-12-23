import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UserParametersDto } from './dto/userParameters.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUserInfo(@Request() req) {
    return await this.userService.getUser({ _id: req.user.userId });
  }

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/parameters')
  async postUserParams(
    @Request() req,
    @Body() userParametersDto: UserParametersDto,
  ) {
    return await this.userService.calculateUserParams(
      userParametersDto,
      req.user.userId,
    );
  }
}
