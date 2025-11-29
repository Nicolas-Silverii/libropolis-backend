import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsuariosModule, JwtModule.register({ 
    secret: process.env.JWT_SECRET || 'libropolis1234',
      signOptions: { expiresIn: '1h' }, 
   })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
