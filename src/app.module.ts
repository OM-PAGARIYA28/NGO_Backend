import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CorsMiddleware } from './corsmiddleware'; // Import the middleware
import { DatabaseModule } from './database/database.module';
import { CampaignModule } from './campaign/campaign.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AboutusModule } from './aboutus/aboutus.module';
import { CounterbarModule } from './counterbar/counterbar.module';
import { UpcomingworkModule } from './upcomingwork/upcomingwork.module';
import { ContactformModule } from './contactform/contactform.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    DatabaseModule,
    CampaignModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AboutusModule,
    CounterbarModule,
    UpcomingworkModule,
    ContactformModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); // Apply to all routes
  }
}
