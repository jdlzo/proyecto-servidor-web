import { IsInt, IsNotEmpty, IsDateString, IsString, MaxLength, Matches, IsOptional, Min, Max, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';
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
    @Type(() => Number)
    @IsInt()
    @Min(1)
    usuarioid?: number;

    @IsOptional()
    @IsDateString()
    fecha?: string;

    @IsOptional()
    @IsIn(['A_TIEMPO', 'ATRASO', 'FALTA', 'JUSTIFICADO'])
    estado?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit = 10;

    @IsOptional()
    @IsIn(['id', 'usuarioid', 'fecha', 'hora_entrada', 'hora_salida', 'estado'])
    sortBy = 'fecha';

    @IsOptional()
    @Transform(({ value }) => typeof value === 'string' ? value.toUpperCase() : value)
    @IsIn(['ASC', 'DESC'])
    sortOrder = 'DESC';
}