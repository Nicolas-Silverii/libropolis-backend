import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LibrosModule } from './libros/libros.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

//Conexión desde Nest
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'libropolis',
      autoLoadEntities: true,
      synchronize: true,

    }),
    LibrosModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController],   
  providers: [AppService],        

})
export class AppModule {}
