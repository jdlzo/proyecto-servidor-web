import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolController } from './rol.controller.js';
import { RolService } from './rol.service.js';
import { rol } from './entities/rol.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Module({
  imports: [TypeOrmModule.forFeature([rol]), AuthModule],
  controllers: [RolController],
  providers: [RolService, JwtAuthGuard]
})
export class RolModule {}
