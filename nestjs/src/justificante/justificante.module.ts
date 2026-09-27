import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { justificanteController } from './justificante.controller.js';
import { JustificanteService } from './justificante.service.js';
import { justificante } from './entities/justificante.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([justificante])],
  controllers: [justificanteController]  ,
  providers: [JustificanteService]
})
export class JustificanteModule {}
