import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../validation/users/CreateUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async index() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const generatedId = await this.usersService.insertUser(
      createUserDto.name,
      createUserDto.description,
      createUserDto.employed,
    );
    return { id: generatedId };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getSingleUser(id);
    return user;
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return null;
  }
}
