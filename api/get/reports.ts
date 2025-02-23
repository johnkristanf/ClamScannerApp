import { ReportedCasesTypes } from "@/types/reports";
import axios from "axios";
import { GO_REQUEST_URI } from "../request_URL";

export async function FetchReports(): Promise<ReportedCasesTypes[] | undefined> {
    try {
        const response = await axios.get(`${GO_REQUEST_URI}/fetch/reports`);
        const statusOK = response.status === 200;

        if(statusOK) return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
