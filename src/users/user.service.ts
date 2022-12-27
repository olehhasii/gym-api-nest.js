import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UserParametersDto } from './dto/userParameters.dto';
import { macrosCalucaltion, rmrCalculation } from 'src/helpers/rmr';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    return await new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      parameters: {},
    }).save();
  }

  async calculateUserParams(
    userParametersDto: UserParametersDto,
    id: string,
  ): Promise<User> {
    const userRMR = rmrCalculation(userParametersDto);
    const macros = macrosCalucaltion(userRMR);
    return await this.userModel.findByIdAndUpdate(id, {
      parameters: { ...userParametersDto, macros: macros },
    });
  }
}
