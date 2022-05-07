import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Http2ServerResponse } from 'http2';
import { UserCreateRequest } from 'src/dto/UserCreateRequest';
import { UserDto } from 'src/dto/UserDto';
import { UsersService } from 'src/users/users.service';

@Controller('health')
export class HealthController {
    constructor(private userService : UsersService) {}

    @Get('/')
    @HttpCode(200)
    async getHealth() : Promise<any>{
        return 'Api health check success';
    }

}
