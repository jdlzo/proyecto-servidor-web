import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { justificante } from './entities/justificante.entity.js';
import { Repository } from 'typeorm';
import { CreateJustificanteDto } from './dto/justificante.dto.js';

@Injectable()
export class JustificanteService {
    constructor(@InjectRepository(justificante) private readonly justificante: Repository<justificante>){}

    findAll(id?: number){
        return this.justificante.find({where: id? {id}: {} });
    }

    async findOne(id: number): Promise<justificante>{
        const justificante = await this.justificante.findOneBy({id: Number(id)});
        if (!justificante) throw new NotFoundException(`Justificante ${id} not found`)
        return justificante;
    }

    create (dto: CreateJustificanteDto) {return this.justificante.save(this.justificante.create(dto));}

    async update(id: number, dto: CreateJustificanteDto){
        const justificante = await this.findOne(id);
        return this.justificante.save(Object.assign(justificante,dto));
    }

    async remove(id: number){
        const justificante = await this.findOne(id);
        await this.justificante.remove(justificante);
        return justificante;
    }
}
