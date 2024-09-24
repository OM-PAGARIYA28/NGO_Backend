import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CampaignModule } from './campaign/campaign.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AboutusModule } from './aboutus/aboutus.module';
import { CounterbarModule } from './counterbar/counterbar.module';
import { UpcomingworkModule } from './upcomingwork/upcomingwork.module';

@Module({
  imports: [DatabaseModule, CampaignModule, UsersModule, AuthModule,ConfigModule.forRoot({isGlobal:true}), AboutusModule, CounterbarModule, UpcomingworkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
