import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRolDto {
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @IsString({ message: 'El nombre del rol debe ser texto' })
  @Length(3, 50, { message: 'El nombre del rol debe tener entre 3 y 50 caracteres' })
  nombre: string;
}

