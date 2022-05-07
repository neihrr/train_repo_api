import { UsersService } from './users.service';
import { UserCreateRequest } from 'src/dto/UserCreateRequest';
import { Body, Controller, Delete, Get, Injectable, Param, Post } from '@nestjs/common';


@Controller('user')
export class UsersController {
	constructor(private userService : UsersService){}

	@Get('/:id')
	async get(@Param('id') userId){
		return this.userService.get(userId);
	}

	@Post('')
	async create(@Body() userCreateRequest : UserCreateRequest){
		return this.userService.create(userCreateRequest);
	}

	@Get('')
	async getAll(){
		return this.userService.findAll();
	}

	@Get('/reservation/:id')
	async getReservations(@Param('id') userId : string){
		return this.userService.getReservations(userId);
	}
}
