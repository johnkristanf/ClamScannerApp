import axios from 'axios';


export const UpdateReportStatus = async (report_id: number): Promise<boolean | undefined> => {
  try {
    const response = await axios.put(`http://192.168.43.252:8080/update/report/status/${report_id}`, {});
    return response.status === 200;

  } catch (error) {
    throw error;
  }
};
