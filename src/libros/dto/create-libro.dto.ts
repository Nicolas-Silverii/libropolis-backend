import { IsString, IsOptional, IsBoolean, IsInt, IsUrl } from "class-validator";

export class CreateLibroDto {
  @IsString()
  titulo: string;
  @IsOptional()
  @IsString()
  autor?: string;

  @IsOptional()
  @IsUrl()
  imagen_url?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsInt()
  anio?: number;

  @IsOptional()
  @IsBoolean()
  favorito?: boolean;

  @IsInt()
  usuario_id: number;
}
