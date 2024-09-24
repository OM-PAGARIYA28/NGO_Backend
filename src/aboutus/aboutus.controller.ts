import { Body, Controller, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { CreateAboutDto } from './dto/create-aboutus.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { UpdateAboutDto } from './dto/update-aboutus.dto';

@Controller('aboutus')
export class AboutusController {
    constructor(private readonly aboutusService:AboutusService){}

    @UseGuards(JwtAuthGuard)
    @Post('createaboutus')
    create(@Request() req, @Body() createAboutDto:CreateAboutDto){
        if (req.user.role !== 'ADMIN') {
            throw new UnauthorizedException('Access restricted to admins');
          }
          return this.aboutusService.create(createAboutDto);
    }



@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Request() req, @Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutDto) {
  if (req.user.role !== 'ADMIN') {
    throw new UnauthorizedException('Access restricted to admins');
  }
  return this.aboutusService.update(+id, updateAboutUsDto);
}

@Get('getaboutus')
  async findOne() {
    return this.aboutusService.findOne();
  }



}
