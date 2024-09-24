import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UpcomingworkService } from './upcomingwork.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateUpcomingworkDto } from './dto/create-upcomingwork.dto';
import { UpdateUpcomingworkDto } from './dto/update-upcomingwork.dto';

@Controller('upcomingwork')
export class UpcomingworkController {
    constructor(private readonly upcomingworkService: UpcomingworkService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Request() req, @Body() createUpcomingWorkDto: CreateUpcomingworkDto) {
      if (req.user.role !== 'ADMIN') {
        throw new UnauthorizedException('Access restricted to admins');
      }
      return this.upcomingworkService.create(createUpcomingWorkDto);
    }
  
    @Get('getallupcomingcampaign')
    findAll() {
      return this.upcomingworkService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.upcomingworkService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateupcomingCampaignDto: UpdateUpcomingworkDto) {
    if (req.user.role !== 'ADMIN') {
      throw new UnauthorizedException('Access restricted to admins');
    }
    return this.upcomingworkService.update(+id, updateupcomingCampaignDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    
    if (req.user.role !== 'ADMIN') {
      throw new UnauthorizedException('Access restricted to admins');
    }
    return this.upcomingworkService.remove(+id);
  }
}


