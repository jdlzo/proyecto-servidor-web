import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { rol } from './entities/rol.entity.js';
import { CreateRolDto } from './dto/rol.dto.js';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(rol)
    private readonly rolRepository: Repository<rol>,
  ) {}

  // 1. Obtener todos los roles
  async findAll() {
    return await this.rolRepository.find();
  }

  // 2. Obtener un rol por ID
  async findOne(id: number): Promise<rol> {
    const rol = await this.rolRepository.findOneBy({ id: Number(id) });
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    return rol;
  }

  // 3. Crear un rol
  async create(dto: CreateRolDto) {
    const nuevoRol = this.rolRepository.create(dto);
    return await this.rolRepository.save(nuevoRol);
  }

  // 4. Actualizar un rol (¡Implementado!)
  async update(id: number, dto: CreateRolDto) {
    const rol = await this.findOne(id);
    Object.assign(rol, dto);
    return await this.rolRepository.save(rol);
  }

  // 5. Eliminar un rol
  async remove(id: number) {
    const rol = await this.findOne(id);
    await this.rolRepository.remove(rol);
    return { message: `Rol con ID ${id} eliminado correctamente` };
  }
}