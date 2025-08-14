import { PrismaService } from './../../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';

@Module({
  controllers: [ProjectController],
  providers: [PrismaService, ProjectService],
})
export class ProjectsModule {}
