import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Libro')
export class Libro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 150})
    titulo: string;

    @Column({length: 100, nullable: true})
    autor: string;
        
    @Column({default: false})
    favorito: boolean;

    @Column({type: 'text', nullable: true})
    imagen_url: string;

    @Column({type: 'text', nullable: true})
    descripcion: string;

    @Column({type: 'int', nullable: true})
    anio: number;

    @Column()
    usuario_id: number;

}