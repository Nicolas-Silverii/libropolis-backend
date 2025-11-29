import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosModule } from './usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entidades/usuario.entity';
import { Libro } from '../entidades/libro.entity';

describe('UsuariosController', () => {
  let controller: UsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Libro, Usuario],
          synchronize: true,
        }),
        UsuariosModule,
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
  });

  it('Debe definirse', () => {
    expect(controller).toBeDefined();
  });
});
