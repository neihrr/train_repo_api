import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/schemas/users.schema';
import { UserDto } from 'src/dto/UserDto';
import { UsersController } from './users.controller';
import { ReservationService } from 'src/reservation/reservation.service';
import { ReservationModule} from 'src/reservation/reservation.module';

@Module({
  imports : [ReservationModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
  controllers: [UsersController],
})
export class UsersModule {}