import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from 'src/schemas/movie.schema';
import { MovieDto } from './dto/movieDto';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) { }

    @Get('/favorite/:userId')
    async findFavoriteMovies(@Param('userId') userId: string): Promise<Movie[]> {
        return this.moviesService.findFavoriteMovies(userId);
    }

    @Post('/favorite')
    async addFavoriteMovie(
        @Body() body: { userId: string, movie: MovieDto }
    ): Promise<void> {
        const { userId, movie } = body; 
        return this.moviesService.addFavoriteMovie(userId, movie);
    }

    @Delete('/favorite')
    async removeFavoriteMovie(@Body() { movieId, userId }: { movieId: string, userId: string }): Promise<void> {
        return this.moviesService.removeFavoriteMovie(movieId, userId);
    }

}
