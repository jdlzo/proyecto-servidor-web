import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { asistencia } from './entities/asistencia.entity.js'; 
import { CreateAsistenciaDto, UpdateAsistenciaDto, FilterAsistenciaDto } from './dto/asistencia.dto.js';

@Injectable()
export class AsistenciaService {
    constructor(
        @InjectRepository(asistencia)
        private readonly asistenciaRepository: Repository<asistencia>,
    ) {}

    async findAll(filters: FilterAsistenciaDto) {
        const where: FindOptionsWhere<asistencia> = {};
        const page = filters.page ?? 1;
        const limit = filters.limit ?? 10;
        const sortBy = filters.sortBy ?? 'fecha';
        const sortOrder = filters.sortOrder ?? 'DESC';

        if (filters.usuarioid !== undefined) {
            where.usuarioid = filters.usuarioid;
        }
        if (filters.fecha) {
            where.fecha = filters.fecha;
        }
        if (filters.estado) {
            where.estado = filters.estado;
        }

        const order = { [sortBy]: sortOrder } as FindOptionsOrder<asistencia>;
        const [data, totalItems] = await this.asistenciaRepository.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
            order,
        });

        const totalPages = Math.ceil(totalItems / limit);

        return {
            data,
            meta: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
                sortBy,
                sortOrder,
            },
        };
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