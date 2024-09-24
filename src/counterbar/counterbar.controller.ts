import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CounterbarService } from './counterbar.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateCounterbarDto } from './dto/create-counter.dto';
import { UpdateCounterBarDto } from './dto/update-counter.dto';

@Controller('counterbar')
export class CounterbarController {
    constructor(private readonly counterBarService: CounterbarService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Request() req, @Body() createCounterBarDto: CreateCounterbarDto) {
        if (req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Access restricted to admins');
        }
        return this.counterBarService.create(createCounterBarDto);
    }

    @Get()
  findAll() {
    return this.counterBarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.counterBarService.findOne(+id);
  }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateCounterBarDto: UpdateCounterBarDto) {
        if (req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Access restricted to admins');
        }
        return this.counterBarService.update(+id, updateCounterBarDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        if (req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Access restricted to admins');
        }
        return this.counterBarService.remove(+id);
    }
}
