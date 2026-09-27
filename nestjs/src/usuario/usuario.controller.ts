import { Controller,Get,Post,Patch,Body,Param,Delete, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service.js';
import { CreateUsuarioDto } from './dto/usuario.dto.js';

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
    create(@Body() dto: CreateUsuarioDto){
        return this.UsuarioService.create(dto);
    }

    @Patch(':id')
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateUsuarioDto,) {
        return this.UsuarioService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number){
        return this.UsuarioService.remove(id);
    }
}
