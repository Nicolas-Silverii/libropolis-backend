import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../entidades/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

async validateUser(email: string, password: string): Promise<Usuario | undefined> {
  const usuario = await this.usuariosService.findByEmail(email);
  if (usuario) {
    const esValida = await bcrypt.compare(password, usuario.password);
    if (esValida) {
      return usuario;
    }
  }
  return undefined;
}

  async login(email: string, password: string) {
    const usuario = await this.validateUser(email, password);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }
}
