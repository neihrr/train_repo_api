import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';
import {randomUUID} from 'crypto';
import { UserDto } from 'src/dto/UserDto';
import { UserCreateRequest } from 'src/dto/UserCreateRequest';
import { ReservationService } from 'src/reservation/reservation.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>, private reservationService : ReservationService) {}

    async create(userCreateRequest: UserCreateRequest): Promise<User> {
        const userDto : UserDto = {
            userId : randomUUID().toString(),
            username : userCreateRequest.username,
            password : userCreateRequest.password,
            role : 'user'
        }
        const createdUser = new this.userModel(userDto);

        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async get(userId: string): Promise<User | undefined>{
        return await this.userModel.findOne({'userId' : userId});
    }

    async findOne(username: string): Promise<User | undefined>{
        return await this.userModel.findOne({'username' : username});
    }

    async getReservations(userId : string){
        return this.reservationService.getUserReservations(userId);
    }

}