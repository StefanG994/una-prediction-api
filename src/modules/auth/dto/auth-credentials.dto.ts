import { IsEmail, IsString, IsStrongPassword, Matches, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsEmail()
    email: string;
    @IsStrongPassword()
    password: string;
}