import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entidades/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuariosRepo.findOne({ where: { email: dto.email } });
    if (existe) {
      throw new BadRequestException('Ya existe un usuario con ese email');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const nuevoUsuario = this.usuariosRepo.create({
      ...dto,
      password: hash,
    });

    return this.usuariosRepo.save(nuevoUsuario);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepo.findOne({ where: { email } });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepo.find();
  }

  async remove(id: number): Promise<string> {
    const usuario = await this.usuariosRepo.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.usuariosRepo.remove(usuario);
    return `Usuario con id ${id} eliminado correctamente`;
  }
}
