# Libropolis Backend API

Backend desarrollado con NestJS y MySQL para la gestión de libros.

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
