import { Request, Response } from 'express';
import { PromptService } from '../services/prompt_service';

const promptService = new PromptService();

export const createPrompt = async (req: Request, res: Response) => {
    try {
        const {id, user_id, category_id, sub_category_id, prompt, category_name, sub_category_name } = req.body;

        if (!id||!user_id || !prompt || !category_name || !sub_category_name) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newPrompt = await promptService.createPrompt({
            id,
            user_id,
            category_id,
            sub_category_id,
            prompt,
            category_name,
            sub_category_name
        });

        res.status(201).json(newPrompt);
    } catch (error: any) {
        console.error('Controller Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



export const getPromptsByUserId = async (req: Request, res: Response) => {
    try {
        const prompts = await promptService.getPromptsByUserId(req.params.user_id as string);
        res.json(prompts);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}

export const getAllPromptsWithUsers = async (req: Request, res: Response) => {
    try {
        const prompts = await promptService.getAllPromptsWithUsers();
        res.json(prompts);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}
