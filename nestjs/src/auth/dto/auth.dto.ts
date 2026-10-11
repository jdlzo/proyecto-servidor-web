import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
    @IsString()
    @Matches(/^\d{10}$/, { message: 'La cédula debe tener exactamente 10 dígitos' })
    cedula: string;

    @IsString()
    @IsNotEmpty()
    nombreuser: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @Length(6, 100)
    contrasena: string;

    @IsString()
    @IsNotEmpty()
    cargo: string;
}

export class LoginDto {
    @IsString()
    @Length(10, 10)
    cedula: string;

    @IsString()
    @Length(1, 100)
    contrasena: string;
}