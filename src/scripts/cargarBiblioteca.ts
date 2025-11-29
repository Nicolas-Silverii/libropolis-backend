import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Usuario } from '../entidades/usuario.entity';
import { Libro } from '../entidades/libro.entity';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

async function cargarBiblioteca() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const usuarioRepo = dataSource.getRepository(Usuario);
  const libroRepo = dataSource.getRepository(Libro);

  // Crear admin si no existe
  let usuario = await usuarioRepo.findOneBy({ email: 'admin@libropolis.com' });
  if (!usuario) {
    const claveHash = await bcrypt.hash('admin1234', 10);
    usuario = usuarioRepo.create({
      nombre: 'Admin',
      apellido: 'Libropolis',
      email: 'admin@libropolis.com',
      password: claveHash,
      rol: 'admin',
    });
    await usuarioRepo.save(usuario);
  }

  // Crear libros si no existen
  let principito = await libroRepo.findOneBy({ titulo: 'El Principito' });
  if (!principito) {
    principito = libroRepo.create({
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      favorito: true,
      imagen_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/LePetitPrince.png',
      descripcion: 'Una travesía poética por el universo, donde un pequeño príncipe descubre el valor del amor y la amistad.',
      anio: 1943,
      usuario,
    });
    await libroRepo.save(principito);
  }

  let origen = await libroRepo.findOneBy({ titulo: 'El origen de las especies' });
  if (!origen) {
    origen = libroRepo.create({
      titulo: 'El origen de las especies',
      autor: 'Charles Darwin',
      favorito: false,
      imagen_url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Origin_of_Species_title_page.jpg',
      descripcion: 'Obra fundacional de la biología evolutiva, donde Darwin presenta la teoría de la selección natural.',
      anio: 1859,
      usuario,
    });
    await libroRepo.save(origen);
  }

  console.log('Biblioteca cargada con libros');
  await app.close();
}

cargarBiblioteca();
