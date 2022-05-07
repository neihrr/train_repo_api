import { Body, Controller, Delete, Get, Injectable, Param, Post } from '@nestjs/common';
import { ReservationCreateRequest } from 'src/dto/ReservationCreateRequest';
import { ReservationDto } from 'src/dto/ReservationDto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService : ReservationService ){}

    @Get('/')
    async getAll(@Body() reservationId : string){
        return this.reservationService.getAll();
    }

    @Post('/')
    async create(@Body() reservation : ReservationCreateRequest){
        console.log(reservation);
        return this.reservationService.create(reservation);
    }

    @Delete('/:id')
    async delete(@Param('id') reservationId){
        return this.reservationService.deleteOne(reservationId);
    }


    @Get('/:id')
    async get(@Param('id') reservationId : string){
        return this.reservationService.get(reservationId);
    }

    @Get('/revenue')
    async getRevenue(){
        return this.reservationService.getRevenue();
    }

    @Delete('')
    async deleteAll(){
        return this.reservationService.deleteAll();
    }

}
