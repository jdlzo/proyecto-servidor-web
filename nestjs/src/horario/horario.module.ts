import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { HorarioController } from './horario.controller.js';
import { HorarioService } from './horario.service.js';
import { horario } from './entities/horario.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([horario])],
  controllers: [HorarioController],
  providers: [HorarioService]
})
export class HorarioModule {}
