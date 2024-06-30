import axios from "axios";
import StatisticQuestionCount from "../interfaces/StatisticQuestionCount";
import StatisticQuestionCountByLocation from "../interfaces/StatisticQuestionCountByLocation";

export async function getQuestionCount(): Promise<StatisticQuestionCount[]> {
    const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/stats/question-count?dateTime=${(new Date()).toLocaleString()}`);
    return result.data;
}

export async function getQuestionCountByLocation(): Promise<StatisticQuestionCountByLocation[]> {
    const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/stats/question-count-by-location?dateTime=${(new Date()).toLocaleString()}`);
    return result.data;
}