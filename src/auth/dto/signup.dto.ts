import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignUpDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    // @IsUnique({ message: 'Username already exists' })
    @IsString()
    username: string; 

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
