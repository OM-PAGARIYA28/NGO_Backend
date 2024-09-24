import { PartialType } from "@nestjs/mapped-types";
import { CreateCounterbarDto } from "./create-counter.dto";



export class UpdateCounterBarDto extends PartialType(CreateCounterbarDto){}