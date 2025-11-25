import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from "./usuario.entity";

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  titulo: string;

  @Column({ length: 100, nullable: true })
  autor: string;

  @Column({ default: false })
  favorito: boolean;

  @Column({ type: 'text', nullable: true })
  imagen_url: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  anio: number;

  @ManyToOne (() => Usuario, (usuario) => usuario.libros, { onDelete: 'CASCADE'})
  usuario: Usuario;
}
