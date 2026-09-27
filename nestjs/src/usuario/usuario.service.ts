import { Controller, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/usuario.dto.js';
import { usuario} from './entities/usuario.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
    update(id: number, dto: CreateUsuarioDto) {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(usuario) private readonly usuario: Repository<usuario>){}

    findAll(id?: number){
        return this.usuario.find({where: id? {id}:{}});
    }

    async findOne(id: number): Promise<usuario>{
        const usuario = await this.usuario.findOneBy({id: Number(id)});
        if (!usuario)throw new NotFoundException(`Usuario ${id} no encontrado`);
        return usuario;
    }

    create (dto: CreateUsuarioDto) {return this.usuario.save(this.usuario.create(dto));}
    
    async remove (id: number){
        const usuario = await this.findOne(id);
        await this.usuario.remove(usuario);
        return usuario;
    }

}
