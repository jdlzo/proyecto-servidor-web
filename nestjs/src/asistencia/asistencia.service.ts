import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { asistencia } from './entities/asistencia.entity.js'; 
import { CreateAsistenciaDto, UpdateAsistenciaDto, FilterAsistenciaDto } from './dto/asistencia.dto.js';

@Injectable()
export class AsistenciaService {
    constructor(
        @InjectRepository(asistencia)
        private readonly asistenciaRepository: Repository<asistencia>,
    ) {}

    async findAll(filters: FilterAsistenciaDto): Promise<asistencia[]> {
        const where: any = {};

        if (filters.usuarioid !== undefined) {
            where.usuarioid = filters.usuarioid;
        }
        if (filters.fecha) {
            where.fecha = filters.fecha;
        }
        if (filters.estado) {
            where.estado = filters.estado;
        }

        return await this.asistenciaRepository.find({ where });
    }

    async findOne(id: number): Promise<asistencia> {
        const registro = await this.asistenciaRepository.findOne({ where: { id } });
        
        if (!registro) {
            throw new NotFoundException('Asistencia no encontrada');
        }
        
        return registro;
    }

    async create(dto: CreateAsistenciaDto): Promise<asistencia> {
        try {
            const nuevaAsistencia = this.asistenciaRepository.create(dto);
            return await this.asistenciaRepository.save(nuevaAsistencia);
        } catch (error: any) {
            if (error.code === '23505') {
                throw new ConflictException('El usuario ya tiene asistencia registrada en esta fecha');
            }
            throw new BadRequestException('Error al crear la asistencia');
        }
    }

    async update(id: number, dto: UpdateAsistenciaDto): Promise<asistencia> {
        const registro = await this.findOne(id);
        
        Object.assign(registro, dto);

        try {
            return await this.asistenciaRepository.save(registro);
        } catch (error: any) {
            if (error.code === '23505') {
                throw new ConflictException('Conflicto de fecha y usuario en la actualización');
            }
            throw new BadRequestException('Error al actualizar la asistencia');
        }
    }

    async remove(id: number): Promise<asistencia> {
        const registro = await this.findOne(id);
        return await this.asistenciaRepository.remove(registro);
    }
}