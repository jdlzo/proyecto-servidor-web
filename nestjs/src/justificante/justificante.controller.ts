import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { JustificanteService } from './justificante.service.js';
import { CreateJustificanteDto } from './dto/justificante.dto.js';

@Controller('justificante')
export class justificanteController {
    constructor(private readonly justificanteService: JustificanteService) {}

    @Get()
    findAll() {
        return this.justificanteService.findAll();
    }


    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
    return this.justificanteService.findOne(id);
    }


    @Post()
    create(@Body() dto: CreateJustificanteDto) {
    return this.justificanteService.create(dto);
    }

    @Patch(':id')
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateJustificanteDto,
    ) {
        return this.justificanteService.update(id, dto);
    }


    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.justificanteService.remove(id);
    }
}