import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuario } from '../usuario/entities/usuario.entity.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([usuario]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const secret = config.getOrThrow<string>('AUTH_JWT_SECRET');
                if (secret.length < 32) {
                    throw new Error('AUTH_JWT_SECRET debe tener al menos 32 caracteres');
                }
                return { secret, signOptions: { expiresIn: '1h' } };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard],
    exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}