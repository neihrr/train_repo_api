import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWTKey } from './constants';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [ UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWTKey.secret,
      signOptions : {expiresIn : '3600s'}
    }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports : [AuthService]
})

export class AuthModule {}
