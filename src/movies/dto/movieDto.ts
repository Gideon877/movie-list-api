import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class MovieDto {
    @IsNotEmpty()
    @IsString()
    user: string; // This would typically be the user ID in a DTO

    @IsNotEmpty()
    @IsBoolean()
    adult: boolean;

    @IsOptional()
    @IsString()
    backdrop_path?: string | null;

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    original_language: string;

    @IsNotEmpty()
    @IsString()
    original_title: string;

    @IsNotEmpty()
    @IsString()
    overview: string;

    @IsNotEmpty()
    @IsNumber()
    popularity: number;

    @IsOptional()
    @IsString()
    poster_path?: string | null;

    @IsOptional()
    @IsString()
    release_date?: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsBoolean()
    video: boolean;

    @IsNotEmpty()
    @IsNumber()
    vote_average: number;

    @IsNotEmpty()
    @IsNumber()
    vote_count: number;
}
