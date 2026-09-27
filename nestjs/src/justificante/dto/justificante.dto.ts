import { IsInt, IsString, IsNotEmpty, IsOptional, Matches, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateJustificanteDto {
    @IsNotEmpty({ message: 'El motivo es obligatorio' })
    @IsString({ message: 'El motivo debe ser una cadena de texto' })
    motivo: string;

    @IsNotEmpty({ message: 'La fecha es obligatoria' })
    @IsString({ message: 'La fecha debe ser texto' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe tener el formato YYYY-MM-DD' })
    fecha: string;

    @IsOptional()
    @IsString({ message: 'La evidencia debe ser una cadena de texto o URL' })
    evidencia?: string;

    @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'El ID de usuario debe ser un número entero' })
    @Min(1, { message: 'El ID de usuario debe ser mayor a 0' })
    usuarioid: number;
}
