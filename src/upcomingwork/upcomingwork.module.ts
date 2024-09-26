import { Module } from '@nestjs/common';
import { UpcomingworkService } from './upcomingwork.service';
import { UpcomingworkController } from './upcomingwork.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
  imports:[DatabaseModule],
  providers: [UpcomingworkService,CloudinaryService],
  controllers: [UpcomingworkController]
})
export class UpcomingworkModule {}
