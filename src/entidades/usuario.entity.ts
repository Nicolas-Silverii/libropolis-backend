import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Libro } from './libro.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contraseña: string;

  @Column({ default: 'lector' })
  rol: string;

  @OneToMany(() => Libro, (libro) => libro.usuario)
  libros: Libro[];
}
