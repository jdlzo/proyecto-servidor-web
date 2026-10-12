import { Controller, Get, Query } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service.js';
import { FilterAsistenciaDto } from './dto/asistencia.dto.js';

@Controller('asistencia')
export class AsistenciaController {
	constructor(private readonly asistenciaService: AsistenciaService) {}

	@Get()
	findAll(@Query() filters: FilterAsistenciaDto) {
		return this.asistenciaService.findAll(filters);
	}
}
