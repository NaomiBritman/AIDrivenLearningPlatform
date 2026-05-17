import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret"; 

export class JWTUtils {
 
  static generateToken(userId: string, role: 'Student' | 'Admin'): string {
    const payload = { userId, role };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1y" });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return null;
    }
  }
}
