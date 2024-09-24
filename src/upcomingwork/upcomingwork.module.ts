import { Module } from '@nestjs/common';
import { UpcomingworkService } from './upcomingwork.service';
import { UpcomingworkController } from './upcomingwork.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  providers: [UpcomingworkService],
  controllers: [UpcomingworkController]
})
export class UpcomingworkModule {}
