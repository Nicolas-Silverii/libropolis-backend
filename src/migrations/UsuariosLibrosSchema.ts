import { MigrationInterface, QueryRunner } from "typeorm";

export class UsuariosLibrosSchema1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        contraseña VARCHAR(255) NOT NULL,
        rol ENUM('admin','lector') DEFAULT 'lector'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE libros (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(150) NOT NULL, 
        autor VARCHAR(100),
        favorito BOOLEAN DEFAULT FALSE,
        imagen_url TEXT,
        descripcion TEXT,
        anio INT,
        usuarioId INT,
        CONSTRAINT FK_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE libros`);
    await queryRunner.query(`DROP TABLE usuarios`);
  }
}