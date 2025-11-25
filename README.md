# Libropolis Backend API

Backend desarrollado con NestJS y MySQL para la gestión de libros.

## Elección del motor de base de datos

Para el desarrollo de Libropolis se evaluaron dos opciones principales: **MySQL** y **MongoDB**.

Se optó por **MySQL** por las siguientes razones:
- Su estructura relacional permite modelar con claridad las entidades `Usuario` y `Libro`.
- Las relaciones uno-a-muchos se definen de forma nativa.
- Los joins facilitan consultas complejas y agrupadas (favoritos, historial, perfil).
- Es totalmente compatible con **TypeORM** en Nest.js, lo que permite integración fluida y validaciones robustas.

MongoDB fue descartado en esta etapa por su enfoque no relacional, que no se ajusta a las necesidades estructuradas del proyecto.

## Endpoints principales

### Libros
- `GET /libros` -> Lista todos los libros
- `GET /libros/:id` -> Obtiene un libro por ID
- `POST /libros` -> Crea un nuevo libro
- `PUT /libros/:id` -> Actualiza un libro existente
- `DELETE /libros/:id` -> Elimina un libro

### OpenLibrary
- `GET /libros/buscar?titulo=...` -> Busca libros en OpenLibrary sin persistencia
- `POST /libros/importar?titulo=...` -> Importa libros desde OpenLibrary y los guarda en la base

## Testing
- Tests básicos con Jest para validar servicios y controladores.

## Estado actual
Sprint 4 cerrado: backend listo para ser consumido por el frontend en Sprint 5.

## 🧱 Modelo de datos y migraciones

Libropolis utiliza **MySQL** como motor relacional, integrado con **TypeORM** en NestJS.

### Entidades principales

| Entidad  | Campos                                                                 |
|----------|------------------------------------------------------------------------|
| Usuario  | id, nombre, apellido, email, contraseña, rol                          |
| Libro    | id, titulo, autor, favorito, imagen_url, descripcion, año, usuarioId  |

Relación: Un `Usuario` puede tener muchos `Libros`.  
Se define con `@OneToMany` y `@ManyToOne`, con `onDelete: 'CASCADE'`.

### Migraciones

```bash
npm run migration:generate src/migrations/UsuariosLibrosSchema
npm run migration:run


