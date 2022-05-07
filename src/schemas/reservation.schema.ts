import { Query } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({required : true})
  reservationId : string;

  @Prop({required : true})
  userId : string;

  @Prop({required : true})
  firstName : string;

  @Prop({required : true})
  lastName : string;

  @Prop({required : true})
  departure : string;

  @Prop({required : true})
  date : string;

  @Prop({required : true})
  arrival : string;

  @Prop({required : true})
  seatInfo : string;

  @Prop({required : true})
  carInfo : string;

  @Prop({required : true})
  phoneNumber : string;

  @Prop({required : true})
  cost : string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);