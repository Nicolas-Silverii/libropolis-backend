import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { Libro } from '../entidades/libro.entity';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  //Lista todos los libros en la base
  @Get()
  findAll(): Promise<Libro[]> {
    return this.librosService.findAll();
  }

  //crea un libro manualmente
  @Post()
  create(@Body() dto: CreateLibroDto): Promise<Libro> {
    return this.librosService.create(dto);
  }

  //actualiza un libro por ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateLibroDto>,
  ): Promise<Libro> {
    return this.librosService.update(+id, dto);
  }

  // Eliminar un libro por ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.librosService.remove(+id);
  }

  // consultar a Open Library sin guardar
  @Get('buscar')
  buscar(@Query('titulo') titulo: string): Promise<Partial<Libro>[]> {
    return this.librosService.buscarEnOpenLibrary(titulo);
  }

  // buscar y guarda libros en la base
  @Post('importar')
  importar(@Query('titulo') titulo: string): Promise<Libro[]> {
    return this.librosService.crearDesdeOpenLibrary(titulo);
  }

   @Get('random')
  random(): Promise<Partial<Libro>[]> {
    return this.librosService.obtenerLibrosRandom();
  }
}
