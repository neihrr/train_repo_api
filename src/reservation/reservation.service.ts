import { Injectable, Post } from '@nestjs/common';
import { Reservation, ReservationDocument } from 'src/schemas/reservation.schema';
import { Model } from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationCreateRequest } from 'src/dto/ReservationCreateRequest';


@Injectable()
export class ReservationService {
    constructor(@InjectModel(Reservation.name) private reservationModel : Model<ReservationDocument>) {}

    async create(reservationCreateRequest : ReservationCreateRequest){
        var reservationReturn = null;
        console.log(uuidv4().toString());

        if(reservationCreateRequest.type === "ROUND_TRIP" && reservationCreateRequest.dateOfReturn){
            const returnDate = reservationCreateRequest.dateOfReturn;

            delete reservationCreateRequest.dateOfReturn;
            delete reservationCreateRequest.type;

            const reservationReturnDto = {
                reservationId : uuidv4().toString(),
                userId : reservationCreateRequest.userId,
                date : returnDate,
                arrival : reservationCreateRequest.departure,
                departure : reservationCreateRequest.arrival,
                firstName : reservationCreateRequest.firstName,
                lastName : reservationCreateRequest.lastName,
                seatInfo : reservationCreateRequest.returnSeat,
                carInfo : reservationCreateRequest.returnCar,
                phoneNumber : reservationCreateRequest.phoneNumber,
                cost : reservationCreateRequest.cost
            };

            delete reservationCreateRequest.returnCar;

            reservationReturn = new this.reservationModel(reservationReturnDto);
        }

        const reservationDto = {
            reservationId : uuidv4().toString(),
            userId : reservationCreateRequest.userId,
            arrival : reservationCreateRequest.arrival,
            departure : reservationCreateRequest.departure,
            firstName : reservationCreateRequest.firstName,
            lastName : reservationCreateRequest.lastName,
            seatInfo : reservationCreateRequest.departureSeat,
            carInfo : reservationCreateRequest.departureCar,
            phoneNumber : reservationCreateRequest.phoneNumber,
            cost : reservationCreateRequest.cost,
            date : reservationCreateRequest.date
        };

        const results = await this.reservationModel.find({ 
            date : reservationCreateRequest.date,
        }).exec();

        console.log(results);

        if(results == undefined || results.length >= 4){
            return {
                success : 'false'
            };
        }

        const reservation = new this.reservationModel(reservationDto);
        await reservation.save();

        console.log(reservation);

        if(reservationReturn !== null){
            await reservationReturn.save();
        }

        const reservationCreateResponse = {
            reservationId : reservation.reservationId,
            reservationReturnId : (reservationReturn === null) ? null : reservationReturn.reservationId,
            success : 'true' 
        }
        
        return reservationCreateResponse;
    }

    async getAll(){
        const all = await this.reservationModel.find().exec();

        return all; 
    }

    async get(reservationId : string){
        const reservation = await this.reservationModel.findOne({reservationId : reservationId});

        return reservation;
    }

    async deleteOne(reservationId : string){
        return this.reservationModel.deleteOne({reservationId : reservationId});
    }

    async getRevenue(){
        var revenue = 0;
        const reservations = await this.getAll();

        if(reservations !== undefined && reservations.length > 0 ){
            reservations.forEach(item => revenue += parseInt(item.cost));
        }

        return revenue;
    }

    async getUserReservations(userId : string){
        return this.reservationModel.find({userId : userId}).exec();
    }

    async deleteAll(){
        return this.reservationModel.deleteMany().exec();
    }



}
