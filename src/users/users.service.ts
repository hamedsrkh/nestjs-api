import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async getUsers() {
    const users = await this.UserModel.find().sort({ createdAt: -1 }).exec();
    return users.map((users) => ({
      id: users.id,
      name: users.name,
      description: users.description,
      employed: users.employed,
    })) as User[];
  }

  async insertUser(name: string, description: string, employed: boolean) {
    const newUsers = new this.UserModel({ name, description, employed });
    const result = await newUsers.save();
    return result.id as string;
  }

  async getSingleUser(id: string) {
    const user = await this.findUser(id);
    return {
      id: user.id,
      name: user.name,
      description: user.description,
      employed: user.employed,
    };
  }

  async deleteUser(userId: string) {
    const result = await this.UserModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('could not find user');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.UserModel.findById(id);
    } catch (error) {
      throw new NotFoundException('something wrong happened');
    }
    if (!user) {
      throw new NotFoundException('could not find user');
    }
    return user;
  }
}
