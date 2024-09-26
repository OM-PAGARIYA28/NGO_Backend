import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UpcomingworkService } from './upcomingwork.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateUpcomingworkDto } from './dto/create-upcomingwork.dto';
import { UpdateUpcomingworkDto } from './dto/update-upcomingwork.dto';
import { CloudinaryService } from '../cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upcomingwork')
export class UpcomingworkController {
    constructor(private readonly upcomingworkService: UpcomingworkService,private readonly cloudinaryService: CloudinaryService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('photo'))
    async create(@Request() req,@UploadedFile() file: Express.Multer.File, @Body() createUpcomingWorkDto: CreateUpcomingworkDto) {
      if (req.user.role !== 'ADMIN') {
        throw new UnauthorizedException('Access restricted to admins');
      }
      if (!file) {
        throw new BadRequestException('Photo must be provided');
      }
      const photoUrl = await this.cloudinaryService.uploadImage(file);
      return this.upcomingworkService.create({
        ...createUpcomingWorkDto,
        photo:photoUrl,
      });
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


