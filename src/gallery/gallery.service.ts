import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GalleryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createGalleryDto: CreateGalleryDto, image: string) {
    try {
      const data: Prisma.GalleryCreateInput = {
        title: createGalleryDto.title,
        image,
      };
      return await this.databaseService.gallery.create({ data });
    } catch (error) {
      throw new Error('Could not create gallery item');
    }
  }

  async update(id: number, updateGalleryDto: UpdateGalleryDto, image?: string) {
    const existingGalleryItem = await this.databaseService.gallery.findUnique({
      where: { id },
    });

    if (!existingGalleryItem) {
      throw new NotFoundException(`Gallery item with ID ${id} not found`);
    }

    const updatedData = {
      ...updateGalleryDto,
      ...(image && { image }), // Only update the image if a new one is provided
    };

    return await this.databaseService.gallery.update({
      where: { id },
      data: updatedData,
    });
  }

  async findOne(id: string) {
    const galleryItem = await this.databaseService.gallery.findUnique({
      where: { id: Number(id) },
    });

    if (!galleryItem) {
      throw new NotFoundException('Gallery item not found');
    }

    return galleryItem;
  }

  async findAll() {
    return await this.databaseService.gallery.findMany();
  }

  async delete(id: number) {
    const existingGalleryItem = await this.databaseService.gallery.findUnique({
      where: { id },
    });

    if (!existingGalleryItem) {
      throw new NotFoundException(`Gallery item with ID ${id} not found`);
    }

    return await this.databaseService.gallery.delete({ where: { id } });
  }
}
