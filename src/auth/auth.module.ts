import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy'; 
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Movie, MovieSchema } from 'src/schemas/movie.schema';
import { config } from 'dotenv';
config();

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }), 
        JwtModule.register({
            secret: process.env.SECRET_KEY, 
            signOptions: { expiresIn: '1h' }, 
        }),
		MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, MongooseModule]
})
export class AuthModule { }
