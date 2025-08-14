import { PrismaService } from './../../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { TechnologyController } from './technology.controller';

@Module({
  controllers: [TechnologyController],
  providers: [PrismaService, TechnologyService],
})
export class TechnologyModule {}
