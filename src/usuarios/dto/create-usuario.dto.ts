import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres'})
    nombre: string;

    @IsString()
    @IsNotEmpty({message: 'El apellido es obligatorio'})
    @MaxLength(100, { message: 'El apellido no puede superar los 100 caracteres'})
    apellido: string;

    @IsEmail({}, { message: 'El memail debe tener formato valido'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'El contraseña es obligatorio'})
    @MinLength(8, { message: 'El contraseña debe tener al menos 8 caracteres'})
    password: string;

    @IsOptional()
    @IsString()
    rol?: string
}