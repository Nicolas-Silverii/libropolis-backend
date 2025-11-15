import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}

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
}
