import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JustificanteController } from './justificante.controller.js';
import { JustificanteService } from './justificante.service.js';
import { justificante } from './entities/justificante.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([justificante])],
  controllers: [JustificanteController]  ,
  providers: [JustificanteService]
})
export class JustificanteModule {}
