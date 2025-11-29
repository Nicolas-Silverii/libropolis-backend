import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor (private readonly usuariosService: UsuariosService) {}

    //POST /usuarios/register
  @Post('register')
  async register(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.create(dto);
  }

  // GET /usuarios
  @Get()
  async getAll() {
    return this.usuariosService.findAll();
  }

   // GET /usuarios/:email
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return this.usuariosService.findByEmail(email);
  }

  // DELETE /usuarios/:id
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }

  
}
