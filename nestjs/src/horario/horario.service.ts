import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { horario } from './entities/horario.entity.js'; 
import { CreateHorarioDto, UpdateHorarioDto, FilterHorarioDto } from './dto/horario.dto.js';

@Injectable()
export class HorarioService {
    constructor(
        @InjectRepository(horario)
        private readonly horarioRepository: Repository<horario>,
    ) {}

    async findAll(filters: FilterHorarioDto): Promise<horario[]> {
        const where: any = {};

        if (filters.hora_entrada) {
            where.hora_entrada = filters.hora_entrada;
        }
        if (filters.hora_salida) {
            where.hora_salida = filters.hora_salida;
        }
        if (filters.tolerancia !== undefined) {
            where.tolerancia = filters.tolerancia;
        }

        return await this.horarioRepository.find({ where });
    }

    async findOne(id: number): Promise<horario> {
        const registro = await this.horarioRepository.findOne({ where: { id } });
        
        if (!registro) {
            throw new NotFoundException('Horario no encontrado');
        }
        
        return registro;
    }

    async create(dto: CreateHorarioDto): Promise<horario> {
        try {
            const nuevoHorario = this.horarioRepository.create(dto);
            return await this.horarioRepository.save(nuevoHorario);
        } catch (error: any) { 
            throw new BadRequestException('Error al crear el horario');
        }
    }

    async update(id: number, dto: UpdateHorarioDto): Promise<horario> {
        const registro = await this.findOne(id); 
        
        Object.assign(registro, dto);

        try {
            return await this.horarioRepository.save(registro);
        } catch (error: any) {
            throw new BadRequestException('Error al actualizar el horario');
        }
    }

    async remove(id: number): Promise<horario> {
        const registro = await this.findOne(id);
        return await this.horarioRepository.remove(registro);
    }
}