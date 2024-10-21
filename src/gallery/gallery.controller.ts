import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Body,
    Request,
    UnauthorizedException,
    BadRequestException,
  } from '@nestjs/common';
  import { GalleryService } from './gallery.service';
  import { CreateGalleryDto } from './dto/create-gallery.dto';
  import { UpdateGalleryDto } from './dto/update-gallery.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
  import { CloudinaryService } from 'src/cloudinary.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  
  @Controller('gallery')
  export class GalleryController {
    constructor(
      private readonly galleryService: GalleryService,
      private readonly cloudinaryService: CloudinaryService,
    ) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    async create(
      @Request() req,
      @UploadedFile() file: Express.Multer.File,
      @Body() createGalleryDto: CreateGalleryDto,
    ) {
      if (req.user.role !== 'ADMIN') {
        throw new UnauthorizedException('Access restricted to admins');
      }
  
      if (!file) {
        throw new BadRequestException('Image must be provided');
      }
  
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      return this.galleryService.create(createGalleryDto, imageUrl);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    async update(
      @Request() req,
      @Param('id') id: string,
      @UploadedFile() file: Express.Multer.File,
      @Body() updateGalleryDto: UpdateGalleryDto,
    ) {
      if (req.user.role !== 'ADMIN') {
        throw new UnauthorizedException('Access restricted to admins');
      }
  
      let imageUrl: string | undefined;
      if (file) {
        imageUrl = await this.cloudinaryService.uploadImage(file);
      }
  
      return this.galleryService.update(+id, updateGalleryDto, imageUrl);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.galleryService.findOne(id);
    }
  
    @Get()
    async findAll() {
      return this.galleryService.findAll();
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: string) {
      if (req.user.role !== 'ADMIN') {
        throw new UnauthorizedException('Access restricted to admins');
      }
  
      return this.galleryService.delete(+id);
    }
  }
  