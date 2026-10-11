import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { usuario } from '../usuario/entities/usuario.entity.js';
import { RegisterDto } from './dto/auth.dto.js';
import { LoginDto } from './dto/auth.dto.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(usuario) private readonly users: Repository<usuario>,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existingUser = await this.users.findOneBy({ cedula: dto.cedula });
        if (existingUser) {
            throw new ConflictException('Ya existe una cuenta con esa cédula');
        }

        const user = this.users.create({
            ...dto,
            contrasena: await bcrypt.hash(dto.contrasena, 12),
            estado: true,
            rolid: null,
            horarioid: null,
        });
        const savedUser = await this.users.save(user);

        return this.createAuthResponse(savedUser);
    }

    async login(dto: LoginDto) {
        const user = await this.users
            .createQueryBuilder('user')
            .addSelect('user.contrasena')
            .where('user.cedula = :cedula', { cedula: dto.cedula })
            .getOne();

        if (!user || !user.estado || !(await bcrypt.compare(dto.contrasena, user.contrasena))) {
            throw new UnauthorizedException('Cédula o contraseña incorrectas');
        }

        return this.createAuthResponse(user);
    }

    private async createAuthResponse(user: usuario) {
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            cedula: user.cedula,
        });

        return {
            accessToken,
            tokenType: 'Bearer',
            expiresIn: '1h',
            user: {
                id: user.id,
                cedula: user.cedula,
                nombreuser: user.nombreuser,
                apellido: user.apellido,
                cargo: user.cargo,
                estado: user.estado,
                rolid: user.rolid,
                horarioid: user.horarioid,
            },
        };
    }
}