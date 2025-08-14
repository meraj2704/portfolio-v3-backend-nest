import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiResponseBuilder } from 'src/common/utils/ApiResponseBuilder';
import {
  ResourceOperationDto,
  UpdateProjectDto,
} from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    await this.validateSlugUnique(createProjectDto.slug);

    try {
      const project = await this.prisma.project.create({
        data: {
          ...createProjectDto,
          startDate: createProjectDto.startDate
            ? new Date(createProjectDto.startDate)
            : undefined,
          endDate: createProjectDto.endDate
            ? new Date(createProjectDto.endDate)
            : undefined,
          resources: {
            create: createProjectDto.resources.map((resource) => ({
              name: resource.name,
              url: resource.url,
              type: resource.type,
            })),
          },
        },
        include: {
          resources: true,
          technologies: true,
        },
      });

      this.logger.log(`Project created: ${project.name}`);
      return ApiResponseBuilder.success(
        project,
        'Project created successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      this.handleCreateError(error, createProjectDto.name);
    }
  }

  async findAll() {
    try {
      const projects = await this.prisma.project.findMany({
        include: {
          resources: true,
          technologies: true,
        },
      });
      return ApiResponseBuilder.success(projects);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to fetch projects', error.stack);
        throw new InternalServerErrorException('Failed to fetch projects');
      }
    }
  }

  async findOne(id: number) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id },
        include: {
          resources: true,
          technologies: true,
        },
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      return ApiResponseBuilder.success(project);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof Error) {
        this.logger.error(`Failed to fetch project with ID ${id}`, error.stack);
        throw new InternalServerErrorException('Failed to fetch project');
      }
    }
  }

  // project.service.ts
  // project.service.ts
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.verifyProjectExists(id);

    try {
      // Prepare the Prisma update data with proper typing
      const prismaUpdateData: Prisma.ProjectUpdateInput = {
        // Update simple fields
        ...(updateProjectDto as Prisma.ProjectUpdateInput),

        // Handle resource operations
        ...(updateProjectDto.resourceOperations && {
          resources: this.transformResourceOperations(
            updateProjectDto.resourceOperations,
            id,
          ),
        }),
      };

      const updatedProject = await this.prisma.project.update({
        where: { id },
        data: prismaUpdateData,
        include: { resources: true },
      });

      return ApiResponseBuilder.success(updatedProject);
    } catch (error) {
      this.handleUpdateError(error, id);
    }
  }

  private transformResourceOperations(
    operations: ResourceOperationDto[],
    projectId: number, // Add projectId as parameter
  ): Prisma.ResourceUpdateManyWithoutProjectNestedInput {
    const result: Prisma.ResourceUpdateManyWithoutProjectNestedInput = {};

    const creates = operations.filter(
      (op) => op.operation === 'create' && op.data,
    );
    const updates = operations.filter(
      (op) => op.operation === 'update' && op.id && op.data,
    );
    const deletes = operations.filter(
      (op) => op.operation === 'delete' && op.id,
    );

    if (creates.length > 0) {
      result.create = creates.map((op) => ({
        name: op.data!.name!, // Non-null assertion since we filtered
        url: op.data!.url!, // Non-null assertion since we filtered
        type: op.data!.type!, // Non-null assertion since we filtered
        projectId: projectId, // Use the passed projectId
      }));
    }

    if (updates.length > 0) {
      result.update = updates.map((op) => ({
        where: { id: op.id! }, // Non-null assertion since we filtered
        data: {
          name: op.data!.name, // Optional update fields
          url: op.data!.url,
          type: op.data!.type,
        },
      }));
    }

    if (deletes.length > 0) {
      result.deleteMany = {
        id: { in: deletes.map((op) => op.id!) }, // Delete multiple in one operation
      };
    }

    return result;
  }

  async remove(id: number) {
    await this.verifyProjectExists(id);

    try {
      await this.prisma.project.delete({
        where: { id },
      });

      this.logger.log(`Project deleted: ID ${id}`);
      return ApiResponseBuilder.success(null, 'Project deleted successfully');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to delete project with ID ${id}`,
          error.stack,
        );
        throw new InternalServerErrorException('Failed to delete project');
      }
    }
  }

  // ========== Helper Methods ==========
  private async validateSlugUnique(slug: string) {
    const existing = await this.prisma.project.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Project with this slug already exists');
    }
  }

  private async verifyProjectExists(id: number) {
    const exists = await this.prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  private handleCreateError(error: unknown, name: string) {
    if (error instanceof Error) {
      this.logger.error(`Creation failed for ${name}`, error.stack);

      if (error instanceof ConflictException) throw error;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Database operation failed');
      }
    }
    throw new InternalServerErrorException('Project creation failed');
  }

  private handleUpdateError(error: unknown, id: number) {
    if (error instanceof Error) {
      this.logger.error(`Update failed for project ID ${id}`, error.stack);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Database operation failed');
      }
    }
    throw new InternalServerErrorException('Project update failed');
  }
}
