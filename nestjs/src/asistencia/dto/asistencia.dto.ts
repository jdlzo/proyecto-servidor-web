import { IsInt, IsNotEmpty, IsDateString, IsString, MaxLength, Matches, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAsistenciaDto {
    @IsInt()
    @IsNotEmpty()
    usuarioid: number;

    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    })
    hora_entrada: string;

    @IsString()
    @IsNotEmpty() 
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    })
    hora_salida: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    estado: string;
}

export class UpdateAsistenciaDto extends PartialType(CreateAsistenciaDto) {}

export class FilterAsistenciaDto {
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    @IsInt()
    usuarioid?: number;

    @IsOptional()
    @IsDateString()
    fecha?: string;

    @IsOptional()
    @IsString()
    estado?: string;
}