import { IsInt, IsString, IsNotEmpty, IsOptional, IsBoolean, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUsuarioDto {
    @IsNotEmpty({ message: 'La cédula es obligatoria' })
    @IsString({ message: 'La cédula debe ser texto' })
    @Length(10, 10, { message: 'La cédula debe tener exactamente 10 dígitos' })
    cedula: string;

    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @IsString({ message: 'El nombre debe ser texto' })
    nombreuser: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser texto' })
    apellido: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser texto' })
    @Length(6, 100, { message: 'La contraseña debe tener al menos 6 caracteres' })
    contrasena: string;

    @IsNotEmpty({ message: 'El cargo es obligatorio' })
    @IsString({ message: 'El cargo debe ser texto' })
    cargo: string;

    @IsOptional()
    @IsBoolean({ message: 'El estado debe ser un valor booleano (true/false)' })
    estado?: boolean;

    @IsNotEmpty({ message: 'El ID del rol es obligatorio' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'El ID del rol debe ser un número entero' })
    @Min(1, { message: 'El ID del rol debe ser válido' })
    rolid: number;

    @IsNotEmpty({ message: 'El ID del horario es obligatorio' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'El ID del horario debe ser un número entero' })
    @Min(1, { message: 'El ID del horario debe ser válido' })
    horarioid: number;
}

