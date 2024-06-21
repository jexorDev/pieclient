export default interface Entry {
    id: number;
    questionId: number;
    questionText: string;
    categoryId: number;
    categoryName: string;
    timestamp: string;
    enteredBy: number;
    locationId: number;
}