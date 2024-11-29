import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie } from '../schemas/movie.schema';
import { MovieDto } from './dto/movieDto';

@Injectable()
export class MoviesService {

	constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) { }

	async findFavoriteMovies(userId: string): Promise<Movie[]> {
		console.log(userId);
		return await this.movieModel
			.find({ user: userId })
			.populate('user')
			.exec();
	}

	async addFavoriteMovie(userId: string, movie: MovieDto): Promise<void> {
		const createdMovie = new this.movieModel({
			_id: new Types.ObjectId(),
			...movie,
			user: userId, 
		});
		await createdMovie.save();
	}

	async removeFavoriteMovie(movieId: string, userId: string): Promise<void> {
		await this.movieModel
			.findOneAndDelete({
				id: movieId,
				user: userId
			}).exec()
	}
}
