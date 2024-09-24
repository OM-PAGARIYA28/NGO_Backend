import { Module } from '@nestjs/common';
import { CounterbarService } from './counterbar.service';
import { CounterbarController } from './counterbar.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  providers: [CounterbarService],
  controllers: [CounterbarController]
})
export class CounterbarModule {}
