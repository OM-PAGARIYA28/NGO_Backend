import { Module } from '@nestjs/common';
import { AboutusController } from './aboutus.controller';
import { AboutusService } from './aboutus.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [AboutusController],
  providers: [AboutusService]
})
export class AboutusModule {}
