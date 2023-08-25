import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findOrCreateUser(profile: any): Promise<any> {
    const { id, username } = profile;

    let user = await this.prisma.user.findFirst({
      where: {
        githubId: id,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          githubId: id,
          Profile: {
            create: {
              name: username,
            },
          },
        },
      });
    }

    return user;
  }

  async login(user: any): Promise<string> {
    console.log(user);
    const payload = { sub: user.id, username: user.username }; // Customize payload as needed
    return this.jwtService.sign(payload);
  }
}
