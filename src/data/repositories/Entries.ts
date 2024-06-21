import axios from "axios";
import Entry from "../interfaces/Entry";

export async function getEntries(): Promise<Entry[]> {
    const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/entries`);
    return result.data;
}

export async function createEntry(questionId: number, locationId: number): Promise<Entry> {
    const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/entries`, {
        questionId: questionId,
        locationId: locationId
    });
    return result.data;
}