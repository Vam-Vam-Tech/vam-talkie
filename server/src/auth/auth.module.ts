import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { GithubStrategy } from './github.strategy';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'github' })],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtService,
    GithubStrategy,
    FacebookStrategy,
  ],
})
export class AuthModule {}
