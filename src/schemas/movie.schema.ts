import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema'

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
    @Prop({ type: Types.ObjectId, auto: true })
    _id: Types.ObjectId;

    @Prop({
        type: Types.ObjectId, ref: 'User', required: true,
    })
    user: User 

    @Prop({ type: Boolean, required: true })
    adult: boolean;

    @Prop({ type: String, default: null })
    backdrop_path: string | null;

    @Prop({ type: Number, required: true },)
    id: number;

    @Prop({ type: String, required: true })
    original_language: string;

    @Prop({ type: String, required: true })
    original_title: string;

    @Prop({ type: String, required: true })
    overview: string;

    @Prop({ type: Number, required: true },)
    popularity: number;

    @Prop({ type: String, default: null })
    poster_path: string | null;

    @Prop({ type: String, default: "" })
    release_date: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: Boolean, required: true })
    video: boolean;

    @Prop({ type: Number, required: true },)
    vote_average: number;

    @Prop({ type: Number, required: true },)
    vote_count: number;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);