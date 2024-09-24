import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCounterbarDto {

    @IsNotEmpty()
    @IsString()
    title: string;  

    @IsNotEmpty()
    @IsNumber()
    count: number; 
  }
  