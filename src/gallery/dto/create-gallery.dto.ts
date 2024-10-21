import { IsNotEmpty } from "class-validator";


export class CreateGalleryDto {
    @IsNotEmpty()
    title: string;
  }
  