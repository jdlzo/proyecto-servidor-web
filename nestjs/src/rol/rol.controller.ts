import { Controller,Get,Post,Patch,Body,Param,Delete, ParseIntPipe } from '@nestjs/common';
import { RolService } from './rol.service.js';
import { CreateRolDto } from './dto/rol.dto.js';

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
    create(@Body() dto: CreateRolDto){
        return this.RolService.create(dto);
    }

    @Patch(':id')
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRolDto,) {
        return this.RolService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number){
        return this.RolService.remove(id);
    }
}