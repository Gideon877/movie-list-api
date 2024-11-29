import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie, MovieSchema } from '../schemas/movie.schema';
// import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		// AuthModule
	],
	providers: [MoviesService],
	controllers: [MoviesController],
	exports: [MoviesService]
})
export class MoviesModule { }
