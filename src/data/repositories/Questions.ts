import axios from "axios";
import Question from "../interfaces/Question";

export async function getQuestions(): Promise<Question[]> {
    const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/questions`);
    return result.data;
}

export async function createQuestion(questionText: string, categoryId: number): Promise<Question> {
    const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/questions`, {
        text: questionText,
        categoryId: categoryId
    });
    return result.data;
}