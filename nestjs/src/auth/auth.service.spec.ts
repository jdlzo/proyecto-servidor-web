import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { describe, expect, it, vi } from 'vitest';
import { usuario } from '../usuario/entities/usuario.entity.js';
import { AuthService } from './auth.service.js';

const registerDto = {
    cedula: '1234567890',
    nombreuser: 'Ana',
    apellido: 'Perez',
    contrasena: 'clave-segura',
    cargo: 'Asistente',
};

function createAuthService() {
    const repository = {
        findOneBy: vi.fn(),
        create: vi.fn((value) => value),
        save: vi.fn(async (value) => ({ ...value, id: 7 })),
        createQueryBuilder: vi.fn(),
    } as unknown as Repository<usuario>;
    const jwtService = {
        signAsync: vi.fn().mockResolvedValue('signed-token'),
    } as unknown as JwtService;

    return { service: new AuthService(repository, jwtService), repository, jwtService };
}

describe('AuthService', () => {
    it('hashes registration passwords and excludes them from the response', async () => {
        const { service, repository } = createAuthService();
        vi.mocked(repository.findOneBy).mockResolvedValue(null);

        const response = await service.register(registerDto);
        const savedUser = vi.mocked(repository.save).mock.calls[0][0] as usuario;

        expect(await bcrypt.compare(registerDto.contrasena, savedUser.contrasena)).toBe(true);
        expect(response.user).not.toHaveProperty('contrasena');
        expect(response.user.rolid).toBeNull();
        expect(response.user.horarioid).toBeNull();
        expect(response.accessToken).toBe('signed-token');
    });

    it('rejects invalid login credentials', async () => {
        const { service, repository } = createAuthService();
        const queryBuilder = {
            addSelect: vi.fn().mockReturnThis(),
            where: vi.fn().mockReturnThis(),
            getOne: vi.fn().mockResolvedValue(null),
        };
        vi.mocked(repository.createQueryBuilder).mockReturnValue(queryBuilder as never);

        await expect(service.login({ cedula: registerDto.cedula, contrasena: 'incorrecta' }))
            .rejects.toBeInstanceOf(UnauthorizedException);
    });
});