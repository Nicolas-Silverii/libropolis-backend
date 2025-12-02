import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { Libro } from '../entidades/libro.entity';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  // Lista todos los libros en la base
  @Get()
  findAll(): Promise<Libro[]> {
    return this.librosService.findAll();
  }

  // Crea un libro manualmente
  @Post()
  create(@Body() dto: CreateLibroDto): Promise<Libro> {
    return this.librosService.create(dto);
  }

  // Actualiza un libro por ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateLibroDto>,
  ): Promise<Libro> {
    return this.librosService.update(+id, dto);
  }

  // Eliminar un libro por ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
  await this.librosService.remove(+id);
  return { message: 'Libro eliminado correctamente' };
}

 // Buscar en Gutendex sin guardar
  @Get('buscar')
  async buscar(@Query('titulo') titulo: string): Promise<Partial<Libro>[]> {
    try {
      return await this.librosService.buscarEnGutendex(titulo);
    } catch (error) {
      throw new HttpException(
        'Error al buscar libros en Gutendex',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Buscar y guardar libros en la base desde Gutendex
  @Post('importar')
  importar(@Query('titulo') titulo: string): Promise<Libro[]> {
    return this.librosService.crearDesdeGutendex(titulo);
  }

// Precargar lote inicial en la BD
@Post('precargar')
precargar(): Promise<Libro[]> {
  return this.librosService.precargarLibrosIniciales();
}


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Libro> {
  const numId = Number(id);
  if (isNaN(numId)) {
    throw new HttpException('El ID debe ser un número válido', HttpStatus.BAD_REQUEST);
  }
  return this.librosService.findOne(numId);
}
}
