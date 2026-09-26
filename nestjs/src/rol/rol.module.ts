import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolController } from './rol.controller.js';
import { RolService } from './rol.service.js';
import { rol } from './entities/rol.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([rol])],
  controllers: [RolController],
  providers: [RolService]
})
export class RolModule {}
