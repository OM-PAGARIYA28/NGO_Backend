import { PartialType } from "@nestjs/mapped-types"
import { CreateUpcomingworkDto } from "./create-upcomingwork.dto"

export class UpdateUpcomingworkDto extends PartialType(CreateUpcomingworkDto){}