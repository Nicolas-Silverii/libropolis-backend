import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from '../entidades/libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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

  async remove(id: number): Promise<void> {
    const libro = await this.libroRepo.findOneBy({ id });
    if (!libro) throw new NotFoundException('Libro no encontrado');
    await this.libroRepo.remove(libro);
  }

  // Consulta Open Library y devuelve libros
  async buscarEnOpenLibrary(titulo: string): Promise<Partial<Libro>[]> {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`;
    const response = await firstValueFrom(this.http.get(url));
    const docs = response.data.docs;
    console.log("🔍 Docs recibidos:", docs.slice(0, 3));


    return docs.slice(0, 10).map((doc) => ({
      titulo: doc.title ?? 'Sin título',
      autor: doc.author_name?.[0] ?? 'Desconocido',
      anio: doc.first_publish_year ?? null,
      imagen_url: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : doc.cover_edition_key
      ? `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`
      : null,
      descripcion: doc.subject?.slice(0, 3).join(', ') ?? 'Sin descripción',
    }));
  }

  // Busca y guarda libros en la base
  async crearDesdeOpenLibrary(titulo: string): Promise<Libro[]> {
    const librosExternos = await this.buscarEnOpenLibrary(titulo);
    const librosGuardados: Libro[] = [];

    for (const datos of librosExternos) {
      const dto: CreateLibroDto = {
        titulo: datos.titulo!,
        autor: datos.autor,
        anio: datos.anio,
        imagen_url: datos.imagen_url,
        descripcion: datos.descripcion,
        favorito: false,
        usuario_id: 1,
      };
      const libro = await this.create(dto);
      librosGuardados.push(libro);
    }

    return librosGuardados;
  }
}
