import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { justificanteController } from './justificante.controller.js';
import { JustificanteService } from './justificante.service.js';
import { justificante } from './entities/justificante.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Module({
  imports: [TypeOrmModule.forFeature([justificante]), AuthModule],
  controllers: [justificanteController]  ,
  providers: [JustificanteService, JwtAuthGuard]
})
export class JustificanteModule {}
