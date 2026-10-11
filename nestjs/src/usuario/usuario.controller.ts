import { Controller,Get,Post,Patch,Body,Param,Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service.js';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly UsuarioService: UsuarioService) {}

    @Get()
    findAll(){
        return this.UsuarioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number){
        return this.UsuarioService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateUsuarioDto){
        return this.UsuarioService.create(dto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsuarioDto,) {
        return this.UsuarioService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id:number){
        return this.UsuarioService.remove(id);
    }
}
