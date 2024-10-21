import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
  imports:[DatabaseModule],
  providers: [GalleryService,CloudinaryService],
  controllers: [GalleryController]
})
export class GalleryModule {}
