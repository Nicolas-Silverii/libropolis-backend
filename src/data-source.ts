// src/data-source.ts
import { DataSource } from "typeorm";
import { Libro } from "./entidades/libro.entity";
import { Usuario } from "./entidades/usuario.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "libropolis",
  entities: [Libro, Usuario],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
});
