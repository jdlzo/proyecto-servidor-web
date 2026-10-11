import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto.js';
import { usuario} from './entities/usuario.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
    
    constructor(@InjectRepository(usuario) private readonly usuario: Repository<usuario>){}

    findAll(id?: number){
        return this.usuario.find({where: id? {id}:{}});
    }

    async findOne(id: number): Promise<usuario>{
        const usuario = await this.usuario.findOneBy({id: Number(id)});
        if (!usuario)throw new NotFoundException(`Usuario ${id} no encontrado`);
        return usuario;
    }

    async create(dto: CreateUsuarioDto) {
        const newUser = this.usuario.create({
            ...dto,
            contrasena: await bcrypt.hash(dto.contrasena, 12),
        });
        return this.toPublicUser(await this.usuario.save(newUser));
    }

    async update(id: number, dto: UpdateUsuarioDto) {
    const user = await this.findOne(id);
    const updates = { ...dto };
    if (updates.contrasena) {
        updates.contrasena = await bcrypt.hash(updates.contrasena, 12);
    }
    Object.assign(user, updates);
    return this.toPublicUser(await this.usuario.save(user));
    }
    
    async remove (id: number){
        const usuario = await this.findOne(id);
        await this.usuario.remove(usuario);
        return this.toPublicUser(usuario);
    }

    private toPublicUser(user: usuario) {
        return {
            id: user.id,
            cedula: user.cedula,
            nombreuser: user.nombreuser,
            apellido: user.apellido,
            cargo: user.cargo,
            estado: user.estado,
            rolid: user.rolid,
            horarioid: user.horarioid,
        };
    }

}
