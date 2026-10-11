import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller.js';
import { UsuarioService } from './usuario.service.js';
import { usuario } from './entities/usuario.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Module({
    imports: [TypeOrmModule.forFeature([usuario]), AuthModule],
    controllers: [UsuarioController],
    providers: [UsuarioService, JwtAuthGuard]
})
export class UsuarioModule {}
