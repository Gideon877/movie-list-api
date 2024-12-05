import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.schema';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserSignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    private readonly saltRounds = 10;

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: User): Promise<any> {
        const payload: JwtPayload = { username: user.username, sub: user._id };
        const accessToken = await this.jwtService.signAsync(payload);
        return { token: accessToken, userId: user._id };
    }

    async signup(user: UserSignUpDto): Promise<boolean> {
        const existingUser = await this.userModel
            .findOne({ username: user.username })
            .exec();
        if (existingUser) {
            return false;
        }

        const hashedPassword = await bcrypt.hash(user.password, this.saltRounds);

        const newUser = new this.userModel({
            ...user,
            password: hashedPassword,
            _id: new Types.ObjectId(),
        });
        await newUser.save();
        return true;
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userModel
            .findOne({ username })
            .exec();

        if (user && await bcrypt.compare(password, user.password)) {

            return user;
        }
        return null;
    }

    async validateUserById(userId: Types.ObjectId): Promise<User | null> {
        const user = await this.userModel.findById(new Types.ObjectId(userId)).exec();
        return user ? user : null;
    }

    async users(): Promise<User[] | null> {
        return await this.userModel.find({}, '-password').exec();
    }
}
