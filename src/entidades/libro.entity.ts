import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from "./usuario.entity";
import { IsNotEmpty, IsInt, maxLength, MaxLength } from 'class-validator';

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @IsNotEmpty({message: 'El título es obligatorio'})
  @MaxLength(150, {message: 'El título no puede superar los 150 caracteres'})
  titulo: string;

  @Column({ length: 100, nullable: true })
  @MaxLength(100, {message: 'El autor no puede superar los 100 caracteres'})
  autor: string;

  @Column({ default: false })
  favorito: boolean;

  @Column({ type: 'text', nullable: true })
  imagen_url: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  @IsInt({ message: 'El año debe ser un número válido'})
  anio: number;

  @ManyToOne (() => Usuario, (usuario) => usuario.libros, { onDelete: 'CASCADE'})
  usuario: Usuario;
}
