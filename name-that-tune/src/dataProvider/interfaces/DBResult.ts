import { IContent } from "./IContent";

export interface DBResult {
    isSuccessful: boolean,
    totalRecords: number,
    data?: IContent[] | IContent,
    stdout?: string,
    stderr?: string
}