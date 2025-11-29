import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entidades/usuario.entity';
import { Libro } from '../entidades/libro.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Libro, Usuario],
          synchronize: true,
        }),
        AuthModule,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deberia definirse', () => {
    expect(service).toBeDefined();
  });
});
