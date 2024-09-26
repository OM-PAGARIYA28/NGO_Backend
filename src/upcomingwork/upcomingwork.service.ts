import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUpcomingworkDto } from './dto/create-upcomingwork.dto';
import { Prisma } from '@prisma/client';
import { UpdateUpcomingworkDto } from './dto/update-upcomingwork.dto';

@Injectable()
export class UpcomingworkService {
    constructor(private readonly databaseService: DatabaseService){}

    async create(createUpcomingworkDto: CreateUpcomingworkDto) {
        try {
          let data: Prisma.UpcomingWorkCreateInput={
            title:createUpcomingworkDto.title,
            description:createUpcomingworkDto.description,
            photo:createUpcomingworkDto.photo,
            amountToBeRaised: Number(createUpcomingworkDto.amountToBeRaised)
          }
       
        return this.databaseService.upcomingWork.create({data});
        } 
        catch (error) {
          return error
        }
        
      }

      async findAll() {
        return this.databaseService.upcomingWork.findMany();
      }
    
      async findOne(id: number) {
        return await this.databaseService.upcomingWork.findFirst({
          where:{
            id:id
          }
        });
      }


      async update(id: number, updateUpcomingworkDto: UpdateUpcomingworkDto) {
        try {
          const upmcomingCampaign = await this.databaseService.upcomingWork.findUnique({
            where: { id: id },
          });
      
          if (!upmcomingCampaign) {
            return { message: `Campaign with ID ${id} not found.` };
          }
          return await this.databaseService.upcomingWork.update({
            where: { id: id },
            data: {...updateUpcomingworkDto,
              amountToBeRaised: updateUpcomingworkDto.amountToBeRaised ? Number(updateUpcomingworkDto.amountToBeRaised) : updateUpcomingworkDto.amountToBeRaised,
            }
          });
        } catch (error) {
          return { message: 'An error occurred during the update', error: error.message };
        }
      }
    
      async remove(id: number) {
        try {
          const existingCampaign = await this.databaseService.upcomingWork.findUnique({
            where: { id: id },
          });
      
          if (!existingCampaign) {
            return { message: `Campaign with ID ${id} not found.` };
          }
    
          await this.databaseService.upcomingWork.delete({
            where: { id: id },
          });
      
          return { message: `Campaign with ID ${id} has been successfully deleted.` };
        } catch (error) {
          return { message: 'An error occurred during the deletion', error: error.message };
        }
      }
}
