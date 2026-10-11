import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JustificanteService } from './justificante.service.js';
import { CreateJustificanteDto } from './dto/justificante.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

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
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateJustificanteDto) {
    return this.justificanteService.create(dto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateJustificanteDto,
    ) {
        return this.justificanteService.update(id, dto);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.justificanteService.remove(id);
    }
}