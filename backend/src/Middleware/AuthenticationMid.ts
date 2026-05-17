import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret"; 

// Middleware לאימות JWT - בודק תוקף הטוקן בכל בקשה מוגנת
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // חילוץ הטוקן מ-Bearer token

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    (req as any).user = user; // הוספת נתוני המשתמש ל-request
    next();
  });
};