import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor (private readonly usuariosService: UsuariosService) {}

  // Usuarios/register
  @Post('register')
  async register(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.create(dto);
  }

  // Usuarios
  @Get()
  async getAll() {
    return this.usuariosService.findAll();
  }

   // Obtener usuarios por email
  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    return this.usuariosService.findByEmail(email);
  }

  // Eliminar usuarios por id
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}
