import axios from "axios";
import Category from "../interfaces/Category";

export async function getCategories(): Promise<Category[]> {
    const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
    return result.data;
}

export async function createCategory(name: string): Promise<Category> {
    const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/categories`, {
        name: name
    });
    return result.data;
}