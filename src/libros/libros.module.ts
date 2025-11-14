import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';

@Module({
  providers: [LibrosService],
  controllers: [LibrosController]
})
export class LibrosModule {}
