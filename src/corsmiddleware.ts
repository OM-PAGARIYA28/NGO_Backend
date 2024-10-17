import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Adjust for your frontend
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Enable cookies/tokens

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(204).end(); // No content response for preflight
    }

    next(); // Pass to the next middleware/route handler
  }
}
