import { Controller,Get,Post,Patch,Body,Param,Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolService } from './rol.service.js';
import { CreateRolDto } from './dto/rol.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('rol')
export class RolController {
    constructor(private readonly RolService: RolService) {}

    @Get()
    findAll(){
        return this.RolService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number){
        return this.RolService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateRolDto){
        return this.RolService.create(dto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRolDto,) {
        return this.RolService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id:number){
        return this.RolService.remove(id);
    }
}