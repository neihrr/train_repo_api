import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import { ReservationModule } from './reservation/reservation.module';

const MONGO_CONNECTION_URI = "mongodb+srv://neihr:abcKlm28@cluster0.xfhtn.mongodb.net/train_reservation?retryWrites=true&w=majority"

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(MONGO_CONNECTION_URI), HealthModule, UsersModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
