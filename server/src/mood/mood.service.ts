import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class MoodService {
  constructor(private prisma: PrismaService) {}

  async createService(data: CreateDto) {
    try {
      const createdMood = await this.prisma.mood.create({
        data: {
          name: data.name,
          color: data.color,
        },
      });
      return createdMood;
    } catch (err) {
      throw new Error(err);
    }
  }

  async fetchAllService() {
    try {
      const moodList = await this.prisma.mood.findMany({
        where: {
          Status: 'ACTIVE',
        },
      });
      return moodList;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateService(data: UpdateDto) {
    try {
      const updatedMood = await this.prisma.mood.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          color: data.color,
        },
      });
      return updatedMood;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteService(id: string) {
    try {
      const targetMood = await this.prisma.mood.findUnique({
        where: {
          id,
        },
      });
      const existingMood = await this.prisma.mood.findMany({
        where: {
          AND: [
            {
              name: {
                contains: 'deleted',
              },
            },
            {
              name: {
                contains: targetMood.name,
              },
            },
          ],
        },
      });
      const deletedMood = await this.prisma.mood.update({
        where: {
          id: id,
        },
        data: {
          name: `deleted-${existingMood.length + 1}-{targetMood.name}`,
          Status: 'DELETED',
        },
      });
      return deletedMood;
    } catch (err) {
      throw new Error(err);
    }
  }
}
