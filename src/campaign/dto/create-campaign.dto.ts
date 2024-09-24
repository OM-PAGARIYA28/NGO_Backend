import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCampaignDto {
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
