import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller.js';
import { UsuarioService } from './usuario.service.js';
import { usuario } from './entities/usuario.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([usuario])],
    controllers: [UsuarioController],
    providers: [UsuarioService]
})
export class UsuarioModule {}
