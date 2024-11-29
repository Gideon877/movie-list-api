import { Controller, Delete, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from 'src/schemas/movie.schema';
import { MovieDto } from './dto/movieDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) { }

    @Get('/favorite/:userId')
    @UseGuards(JwtAuthGuard)
    async findFavoriteMovies(@Param('userId') userId: string): Promise<Movie[]> {
        return this.moviesService.findFavoriteMovies(userId);
    }

    @Post('/favorite')
    @UseGuards(JwtAuthGuard)
    async addFavoriteMovie(
        @Body() body: { userId: string, movie: MovieDto }
    ): Promise<void> {
        const { userId, movie } = body; 
        return this.moviesService.addFavoriteMovie(userId, movie);
    }

    @Delete('/favorite')
    @UseGuards(JwtAuthGuard)
    async removeFavoriteMovie(@Body() { movieId, userId }: { movieId: string, userId: string }): Promise<void> {
        return this.moviesService.removeFavoriteMovie(movieId, userId);
    }

}
