import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      // Use cloudinary's upload_stream method to handle the file buffer
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'campaigns' },
          (error: UploadApiErrorResponse, result: UploadApiResponse) => {
            if (error) {
              reject(`Cloudinary upload error: ${error.message}`);
            }
            resolve(result.secure_url);
          }
        );
        // Stream the buffer into the upload stream
        uploadStream.end(file.buffer);
      });
    } catch (error) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }
}
