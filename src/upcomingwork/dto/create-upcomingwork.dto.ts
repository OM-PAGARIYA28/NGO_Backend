import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUpcomingworkDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    photo: string;   // URL or file path of the photo

    @IsNotEmpty()
    @IsNumber()
    amountToBeRaised: number;
}