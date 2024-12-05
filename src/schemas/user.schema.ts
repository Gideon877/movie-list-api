import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ type: Types.ObjectId, auto: true })
    _id: Types.ObjectId;

    @Prop({ type: String, required: true, unique: true })
    firstName: string;

    @Prop({ type: String, required: true, unique: false })
    lastName: string;

    @Prop({ type: String, required: true, unique: false })
    username: string;
    
    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);