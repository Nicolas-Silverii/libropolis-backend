import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, MaxLength, Min, IsNotEmpty } from "class-validator";

export class CreateLibroDto {
  @IsString()
  titulo: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100, {message: 'El título no puede superar los 100 caracteres'})
  autor?: string | null;

  @IsOptional()
  @IsUrl()
  imagen_url?: string | null;

  @IsOptional()
  @IsString()
  descripcion?: string | null;

  @IsOptional()
  @IsInt({ message: 'El año debe ser un número válido'})
  @Min(0,{ message: 'El año no puede ser negativo'})
  anio?: number | null;

  @IsOptional()
  @IsBoolean()
  favorito?: boolean;

  @IsOptional()
  @IsUrl()
  fileUrl?: string | null;

  @IsOptional()
  @IsString()
  tipo?: string | null;
  

  @IsInt()
  @IsNotEmpty({ message: 'El usuario_id es obligatorio'})
  usuario_id: number | null;
}
