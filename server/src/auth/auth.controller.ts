// auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { IAuthRequest } from '../@types/authRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // The user will be redirected to GitHub for authentication
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req: IAuthRequest, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    // Redirect to the frontend with the JWT token (for demonstration purposes)
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  }
}
