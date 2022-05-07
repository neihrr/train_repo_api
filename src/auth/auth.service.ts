import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/UserDto';
import { UserLoginRequest } from 'src/dto/UserLoginRequest';


@Injectable()
export class AuthService {
    constructor(private usersService : UsersService, private jwtService : JwtService){}

    async validate(userDto : UserLoginRequest) : Promise<any> {
        const user : UserDto = await this.usersService.findOne(userDto.username);

        console.log(user);

        if(user && userDto.password === user.password){
            const { password, role, ...result } = user;
            return result;
        }
        
        return null;
    }

    async login(user: UserDto) {
        console.log(user.username);
        console.log(user.userId);
        console.log(user.role);
        const payload = { username: user.username, sub: user.userId, role : user.role };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

    
}
