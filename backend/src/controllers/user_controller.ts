import { Request, Response } from 'express';
import { UserService } from '../services/user_service';
import { JWTUtils } from '../Middleware/JWTUtils';

const userService = new UserService();

export async function createUser(req: Request, res: Response) {
    try {
        const user = await userService.createUser(req.body);
        const role = req.body.id === process.env.ADMIN_ID ? 'Admin' : 'Student';
        const token = JWTUtils.generateToken(req.body.id, role);
        res.status(201).json({ ...user.toObject?.() ?? user, token, role });
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
}

export async function signIn(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        
        const user = await userService.getUserById(id as string);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return; 
        }

        // קביעת התפקיד בצורה מאובטחת יותר
        const role = id === process.env.ADMIN_ID ? 'Admin' : 'Student';
        
        // יצירת ה-Token
        const token = JWTUtils.generateToken(id as string, role);

        // המרה לאובייקט נקי 
        const userData = typeof user.toObject === 'function' ? user.toObject() : user;

        // הסרת שדות רגישים כמו סיסמה לפני החזרה למשתמש
        delete userData.password;

        // החזרת התשובה המלאה
        res.json({ 
            ...userData, 
            token, 
            role 
        });

    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const user = await userService.getUserById(req.params.id as string);
        if (!user) res.status(404).json({ error: 'User not found' });
        else res.json(user);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}
