import { Module } from '@nestjs/common';
import { JustificanteController } from './justificante.controller';
import { JustificanteService } from './justificante.service';

@Module({
  controllers: [JustificanteController],
  providers: [JustificanteService]
})
export class JustificanteModule {}
