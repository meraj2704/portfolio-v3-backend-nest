import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TechnologyModule } from './modules/technology/technology.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [AuthModule, TechnologyModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
