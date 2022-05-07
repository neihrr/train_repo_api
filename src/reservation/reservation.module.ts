import { Module } from '@nestjs/common';
import { Reservation, ReservationSchema} from 'src/schemas/reservation.schema';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from './reservation.controller';


@Module({
  imports : [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }])],
  providers: [ReservationService],
  exports : [ReservationService, MongooseModule],
  controllers: [ReservationController]
})
export class ReservationModule {}
