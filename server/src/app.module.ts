import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [EventModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
