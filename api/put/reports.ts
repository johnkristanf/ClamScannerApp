import axios from 'axios';
import { GO_REQUEST_URI } from '../request_URL';


export const UpdateReportStatus = async (report_id: number): Promise<boolean | undefined> => {
  try {
    const response = await axios.put(`${GO_REQUEST_URI}/update/report/status/${report_id}`, {});
    return response.status === 200;

  } catch (error) {
    throw error;
  }
};
