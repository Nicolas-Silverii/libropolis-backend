import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { Libro } from '../entidades/libro.entity';
import { Usuario } from "../entidades/usuario.entity";
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Libro, Usuario]), HttpModule],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
