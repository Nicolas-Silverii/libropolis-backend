import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Libro } from './libro.entity';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';


@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'El nombre es obligatorio'})
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres'})
  nombre: string;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'El apellido es obligatorio'})
  @MaxLength(100, { message: 'El apellido no puede superar los 100 caracteres'})
  apellido: string;

  @Column({ unique: true })
  @IsEmail( {}, {message: 'El email debe tener formato válido'})
  email: string;

  @Column()
  @IsNotEmpty({ message: 'La contraseña es obligatoria'})
  @MinLength( 8,{ message: ' La contraseña debe tener al menos 8 caracteres'})
  password: string;

  @Column({ default: 'lector' })
  rol: string;

  @OneToMany(() => Libro, (libro) => libro.usuario)
  libros: Libro[];
}
