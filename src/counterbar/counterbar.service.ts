import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCounterbarDto } from './dto/create-counter.dto';
import { Prisma } from '@prisma/client';
import { UpdateCounterBarDto } from './dto/update-counter.dto';

@Injectable()
export class CounterbarService {
    constructor (private readonly databaseService: DatabaseService) {}

    async create(createCounterDto:CreateCounterbarDto){
        try {
            let data: Prisma.CounterbarCreateInput={
                title:createCounterDto.title,
                count:createCounterDto.count
            }
            return this.databaseService.counterbar.create({data})
        } catch (error) {
            return error
        }
    }

    async findAll() {
        return this.databaseService.counterbar.findMany();
      }

      async findOne(id: number) {
        return this.databaseService.counterbar.findUnique({
          where: { id },
        });
      }

      async update(id: number, updateCounterBarDto: UpdateCounterBarDto) {
        try {
            const existingCounterBar = await this.databaseService.counterbar.findUnique({ where: { id } });
            if (!existingCounterBar) {
                throw new Error(`CounterBar with ID ${id} not found`);
            }

            return this.databaseService.counterbar.update({
                where: { id },
                data: updateCounterBarDto,
            });
        } catch (error) {
            return {
                message: 'Could not update details',
                error: error.message || 'An unknown error occurred',
            };
        }
    }

    async remove(id: number) {
        try {
            const existingCounterBar = await this.databaseService.counterbar.findUnique({ where: { id } });
            if (!existingCounterBar) {
                throw new Error(`CounterBar with ID ${id} not found`);
            }

            await this.databaseService.counterbar.delete({
                where: { id },
            });
            return { message: `CounterBar with ID ${id} has been successfully deleted.` };
        } catch (error) {
            return {
                message: 'Could not delete details',
                error: error.message || 'An unknown error occurred',
            };
        }
    }
}
