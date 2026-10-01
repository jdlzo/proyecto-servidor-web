import { Module } from '@nestjs/common';
import {ConfigService, ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module.js';
import { HorarioModule } from './horario/horario.module.js';
import { JustificanteModule } from './justificante/justificante.module.js';
import { AsistenciaModule } from './asistencia/asistencia.module.js';
import {UsuarioModule} from './usuario/usuario.module.js'


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', host: config.getOrThrow('DB_HOST'),
        port: Number(config.getOrThrow('DB_PORT')),
        username: config.getOrThrow('DB_USERNAME'),
        password: config.getOrThrow('DB_PASSWORD'),
        database: config.getOrThrow('DB_NAME'),
        autoLoadEntities: true, 
        synchronize: false,
      }),
    }),
    RolModule,
    HorarioModule,
    JustificanteModule,
    AsistenciaModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
