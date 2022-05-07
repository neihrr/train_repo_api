import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-local';
import { UserLoginRequest } from 'src/dto/UserLoginRequest';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username : string, password : string): Promise<any> {
    const userLoginData : UserLoginRequest = {
        username : username,
        password : password
    };

    const user = await this.authService.validate(userLoginData);

    if (!user) {
      throw new UnauthorizedException(UserLoginRequest);
    }

    return user;
  }

}