import axios from "axios";
import StatisticQuestionCount from "../interfaces/StatisticQuestionCount";

export async function getQuestionCount(): Promise<StatisticQuestionCount[]> {
    const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/stats?dateTime=${(new Date()).toLocaleString()}`);
    return result.data;
}