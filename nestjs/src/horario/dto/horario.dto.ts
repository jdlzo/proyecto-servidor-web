import { IsInt, IsString, IsNotEmpty, IsOptional, Matches, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateHorarioDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
    hora_entrada: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
    hora_salida: string;

    @IsInt()
    @IsNotEmpty()
    @Min(0) 
    tolerancia: number;
}

export class UpdateHorarioDto extends PartialType(CreateHorarioDto) {}

export class FilterHorarioDto {
    @IsOptional()
    @IsString()
    hora_entrada?: string;

    @IsOptional()
    @IsString()
    hora_salida?: string;

    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    @IsInt()
    tolerancia?: number;
}