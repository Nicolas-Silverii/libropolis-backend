import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosModule } from './libros/libros.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Conexión desde Nest
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'libropolis',
      autoLoadEntities: true,
      synchronize: false,

    }),
    LibrosModule,
  ],
  controllers: [AppController],   
  providers: [AppService],        

})
export class AppModule {}
