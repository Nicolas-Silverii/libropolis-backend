import { Test, TestingModule } from '@nestjs/testing';
import { LibrosService } from './libros.service';
import { LibrosModule } from './libros.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from '../entidades/libro.entity';
import { Usuario } from '../entidades/usuario.entity';
import { HttpModule } from '@nestjs/axios';

describe('LibrosService', () => {
  let service: LibrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Libro, Usuario],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Libro, Usuario]),
        HttpModule,
      ],
      providers: [LibrosService],
    }).compile();

    service = module.get<LibrosService>(LibrosService);
  });

  it('deberìa definirse', () => {
    expect(service).toBeDefined();
  });
});
