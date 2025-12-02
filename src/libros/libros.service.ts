import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from '../entidades/libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface GutendexDoc {
  id: number;
  title: string;
  authors?: { name: string }[];
  formats?: Record<string, string>;
  subjects?: string[];
}

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
    private readonly http: HttpService,
  ) {}

  // CRUD
  async findAll(): Promise<Libro[]> {
    return this.libroRepo.find();
  }

  async create(dto: CreateLibroDto): Promise<Libro> {
    const nuevo = this.libroRepo.create(dto);
    return this.libroRepo.save(nuevo);
  }

  async update(id: number, dto: Partial<CreateLibroDto>): Promise<Libro> {
    const libro = await this.libroRepo.findOneBy({ id });
    if (!libro) throw new NotFoundException('Libro no encontrado');
    Object.assign(libro, dto);
    return this.libroRepo.save(libro);
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroRepo.findOneBy({ id });
    if (!libro) throw new NotFoundException('Libro no encontrado');
    return libro;
  }

  async remove(id: number): Promise<{ message: string }> {
    const libro = await this.libroRepo.findOneBy({ id });
    if (!libro) throw new NotFoundException('Libro no encontrado');
    await this.libroRepo.remove(libro);
    return { message: 'Libro eliminado correctamente' };
  }

  // Buscar libros en Gutendex (aceptando TXT/EPUB como lectura real)
 async buscarEnGutendex(titulo: string): Promise<Partial<Libro>[]> {
  const url = `https://gutendex.com/books?search=${encodeURIComponent(titulo)}`;
  const response = await firstValueFrom(this.http.get(url));
  const docs = response.data.results;

  const libros: Partial<Libro>[] = [];

  for (const doc of docs.slice(0, 10)) {
    const formats = doc.formats || {};

    // Elegimos el primer formato disponible
    const fileUrl =
      formats['text/plain; charset=us-ascii'] ||
      formats['application/epub+zip'] ||
      formats['application/x-mobipocket-ebook'] ||
      formats['text/html'] ||
      null;

    libros.push({
      id: doc.id,
      titulo: doc.title ?? 'Sin título',
      autor: doc.authors?.[0]?.name ?? 'Desconocido',
      anio: null,
      imagen_url:
        formats['image/jpeg'] ||
        'https://via.placeholder.com/120x180?text=Sin+portada',
      descripcion: doc.subjects?.slice(0, 3).join(', ') ?? 'Sin descripción',
      fileUrl,
      tipo: fileUrl
        ? fileUrl.includes('epub')
          ? 'epub'
          : fileUrl.includes('mobi')
          ? 'mobi'
          : fileUrl.includes('txt')
          ? 'txt'
          : 'html'
        : null,
    });
  }

  return libros;
}



  // Buscar y guardar libros en la base desde Gutendex
  async crearDesdeGutendex(titulo: string): Promise<Libro[]> {
    const librosExternos = await this.buscarEnGutendex(titulo);
    const librosGuardados: Libro[] = [];

    for (const datos of librosExternos) {
      const dto: CreateLibroDto = {
        titulo: datos.titulo!,
        autor: datos.autor,
        anio: datos.anio ?? null,
        imagen_url: datos.imagen_url,
        descripcion: datos.descripcion,
        favorito: false,
        fileUrl: datos.fileUrl ?? null,
        tipo: datos.tipo ?? null,
        usuario_id: 1,
      };

      const libro = await this.create(dto);
      librosGuardados.push(libro);
    }

    return librosGuardados;
  }

  // Precargar lote inicial en la BD
  async precargarLibrosIniciales(): Promise<Libro[]> {
    const librosExternos = await this.buscarEnGutendex('frankenstein');
    const librosGuardados: Libro[] = [];

    for (const datos of librosExternos) {
      const dto: CreateLibroDto = {
        titulo: datos.titulo!,
        autor: datos.autor,
        anio: datos.anio ?? null,
        imagen_url: datos.imagen_url,
        descripcion: datos.descripcion,
        favorito: false,
        fileUrl: datos.fileUrl ?? null,
        tipo: datos.tipo ?? null,
        usuario_id: 1,
      };

      const libro = await this.create(dto);
      librosGuardados.push(libro);
    }

    return librosGuardados;
  }
}
