import { ReportedCasesTypes } from "@/types/reports";
import axios from "axios";

export async function FetchReports(): Promise<ReportedCasesTypes[] | undefined> {
    try {
        const response = await axios.get("http://192.168.43.252:8080/fetch/reports");
        const statusOK = response.status === 200;

        if(statusOK) return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
