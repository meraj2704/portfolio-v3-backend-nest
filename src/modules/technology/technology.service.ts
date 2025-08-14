import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ApiResponseBuilder } from 'src/common/utils/ApiResponseBuilder';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { CreateTechnologyDto } from './dto/create-technology.dto';

@Injectable()
export class TechnologyService {
  private readonly logger = new Logger(TechnologyService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTechnologyDto) {
    await this.validateTechnologyCreation(dto);

    try {
      const technology = await this.prisma.technology.create({
        data: {
          name: dto.name,
          icon: dto.icon,
        },
      });

      this.logger.log(`Technology created: ${technology.name}`);
      return ApiResponseBuilder.success(
        technology,
        'Technology created successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      this.handleCreateError(error, dto.name);
    }
  }

  async findAll() {
    try {
      const technologies = await this.prisma.technology.findMany();
      return ApiResponseBuilder.success(technologies);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Failed to fetch technologies', error.stack);
        throw new InternalServerErrorException('Failed to fetch technologies');
      }
    }
  }

  async findOne(id: number) {
    try {
      const technology = await this.prisma.technology.findUnique({
        where: { id },
      });

      if (!technology) {
        throw new NotFoundException(`Technology with ID ${id} not found`);
      }

      return ApiResponseBuilder.success(technology);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof Error) {
        this.logger.error(
          `Failed to fetch technology with ID ${id}`,
          error.stack,
        );
      }
      throw new InternalServerErrorException('Failed to fetch technology');
    }
  }

  async update(id: number, dto: UpdateTechnologyDto) {
    await this.verifyTechnologyExists(id);

    try {
      const updatedTechnology = await this.prisma.technology.update({
        where: { id },
        data: dto,
      });

      this.logger.log(`Technology updated: ${updatedTechnology.name}`);
      return ApiResponseBuilder.success(
        updatedTechnology,
        'Technology updated successfully',
      );
    } catch (error) {
      this.handleUpdateError(error, id);
    }
  }

  async remove(id: number) {
    await this.verifyTechnologyExists(id);

    try {
      await this.prisma.technology.delete({
        where: { id },
      });

      this.logger.log(`Technology deleted: ID ${id}`);
      return ApiResponseBuilder.success(
        null,
        'Technology deleted successfully',
      );
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to delete technology with ID ${id}`,
          error.stack,
        );
      }
      throw new InternalServerErrorException('Failed to delete technology');
    }
  }

  // ========== Helper Methods ==========
  private async validateTechnologyCreation(dto: CreateTechnologyDto) {
    const existingTech = await this.prisma.technology.findUnique({
      where: { name: dto.name },
    });

    if (existingTech) {
      throw new ConflictException('Technology with this name already exists');
    }
  }

  private async verifyTechnologyExists(id: number) {
    const exists = await this.prisma.technology.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      throw new NotFoundException(`Technology with ID ${id} not found`);
    }
  }

  private handleCreateError(error: unknown, name: string) {
    const errorMessage = error instanceof Error ? error.stack : String(error);
    this.logger.error(`Creation failed for ${name}`, errorMessage);

    if (error instanceof ConflictException) throw error;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new InternalServerErrorException('Database operation failed');
    }
    throw new InternalServerErrorException('Technology creation failed');
  }

  private handleUpdateError(error: unknown, id: number) {
    const errorMessage = error instanceof Error ? error.stack : String(error);
    this.logger.error(`Update failed for technology ID ${id}`, errorMessage);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new InternalServerErrorException('Database operation failed');
    }
    throw new InternalServerErrorException('Technology update failed');
  }
}
