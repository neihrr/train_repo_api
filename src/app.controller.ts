import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService : AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req): Promise<any>{
    console.log(req.user._doc);
    return this.authService.login(req.user._doc);;
  }

  @UseGuards(JwtAuthGuard)
  @Get('panel')
  async getProfile(@Req() req) {
    return req.user;
  }

}
