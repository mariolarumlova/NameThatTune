import { IContent } from "./IContent";

export interface DBResult {
    isSuccessful: boolean,
    data: Promise<IContent[]>,
    totalRecords: number,
    errorMessage: string
}