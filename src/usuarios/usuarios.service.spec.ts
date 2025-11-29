import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { UsuariosModule } from './usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entidades/usuario.entity';
import { Libro } from '../entidades/libro.entity';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario, Libro],
          synchronize: true,
        }),
        UsuariosModule,
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('deberia definirse', () => {
    expect(service).toBeDefined();
  });
});
