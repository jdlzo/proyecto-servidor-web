import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenciaController } from './asistencia.controller.js';
import { AsistenciaService } from './asistencia.service.js';
import { asistencia } from './entities/asistencia.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature( [asistencia])],
    controllers: [AsistenciaController],
    providers: [AsistenciaService]
})
export class AsistenciaModule {}
