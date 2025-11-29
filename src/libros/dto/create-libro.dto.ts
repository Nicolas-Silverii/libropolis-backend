import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, MaxLength, Min, IsNotEmpty } from "class-validator";

export class CreateLibroDto {
  @IsString()
  titulo: string;
  @IsOptional()
  @IsString()
  @MaxLength(100, {message: 'El título no puede superar los 100 caracteres'})
  autor?: string;

  @IsOptional()
  @IsUrl()
  imagen_url?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsInt({ message: 'El año debe ser un número válido'})
  @Min(0,{ message: 'El año no puede ser negativo'})
  anio?: number;

  @IsOptional()
  @IsBoolean()
  favorito?: boolean;

  @IsInt()
  @IsNotEmpty({ message: 'El usuario_id es obligatorio'})
  usuario_id: number;
}
