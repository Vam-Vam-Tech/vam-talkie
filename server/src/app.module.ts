import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { MoodModule } from './mood/mood.module';

@Module({
  imports: [EventModule, AuthModule, MoodModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
