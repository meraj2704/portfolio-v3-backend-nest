// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
    console.log('Prisma Client path:', require.resolve('@prisma/client'));
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma connected successfully');
  }
}
