import axios from "axios";
import Entry from "../interfaces/Entry";

export async function getEntries(): Promise<Entry[]> {
    const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/entries?dateTime=${(new Date()).toLocaleString()}`);
    return result.data;
}

export async function createEntry(questionId: number, locationId: number): Promise<Entry> {
    const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/entries`, {
        questionId: questionId,
        locationId: locationId,
        timestamp: (new Date()).toLocaleString()
    });
    return result.data;
}

export async function updateEntry(entryId: number, locationId: number): Promise<void> {
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/entries`, {
        id: entryId,
        locationId: locationId
    });
}

export async function deleteEntry(entryId: number): Promise<void> {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/entries/${entryId}`);
}