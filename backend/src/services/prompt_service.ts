import fetch from 'node-fetch';
import { Prompt, IPrompt } from '../models/prompts';

// שירות לקבלת תשובה מ-AI עם התאמה לקטגוריה
async function getAIResponse(category: string, subCategory: string, promptText: string): Promise<string> {
    try {
        if (!process.env.OPENAI_API_KEY) throw new Error("Missing API Key");

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    // הגדרת התפקיד של ה-AI כמורה מתמחה
                    { role: 'system', content: `You are a digital teacher specializing in ${category} - ${subCategory}. Answer the student's question with a clear lesson-like explanation. At the end, suggest 2-3 related courses or topics the student should explore next to deepen their understanding of ${category}.` },
                    { role: 'user', content: promptText }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json() as any;
            console.error(" API Error:", errorData);
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json() as { choices: { message: { content: string } }[] };
        return data.choices[0].message.content;

    } catch (error: any) {
        console.error("=== AI API ERROR ===", error.message);
        return "מצטער, חלה שגיאה בחיבור למורה הדיגיטלי. אנא נסי שוב מאוחר יותר.";
    }
}

export class PromptService {
    // יצירת prompt חדש עם שליחה ל-AI ושמירה במסד נתונים
    async createPrompt(promptData: {id: string; user_id: string; category_id: string; sub_category_id: string; prompt: string; category_name: string; sub_category_name: string }): Promise<IPrompt> {
        const aiResponse = await getAIResponse(promptData.category_name, promptData.sub_category_name, promptData.prompt);
        const prompt = new Prompt({
            ...promptData,
            response: aiResponse
        });
        return await prompt.save();
    }

    async getPromptsByUserId(user_id: string): Promise<IPrompt[]> {
        return await Prompt.find({ user_id }).select('-__v').exec();
    }

    async getAllPromptsWithUsers(): Promise<IPrompt[]> {
        return await Prompt.find().select('-__v').exec();
    }
}
