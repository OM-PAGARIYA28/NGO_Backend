import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CampaignModule } from './campaign/campaign.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AboutusModule } from './aboutus/aboutus.module';
import { CounterbarModule } from './counterbar/counterbar.module';
import { UpcomingworkModule } from './upcomingwork/upcomingwork.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryService } from 'cloudinary.service';

@Module({
  imports: [DatabaseModule, CampaignModule, UsersModule, AuthModule,ConfigModule.forRoot({isGlobal:true}), AboutusModule, CounterbarModule, UpcomingworkModule],
  controllers: [AppController],
  providers: [AppService,CloudinaryService],
})
export class AppModule {}
