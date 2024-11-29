import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { MoviesController } from './movies/movies.controller';
import { AuthController } from './auth/auth.controller';
import { MoviesService } from './movies/movies.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_DB_URL),
        AuthModule,
        MoviesModule,
        JwtModule.register({ 
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '1h' },
          }),
    ],
      controllers: [MoviesController, AuthController],
      providers: [MoviesService, AuthService],
})
export class AppModule { }
