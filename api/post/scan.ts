import axios from "axios";
import { GO_REQUEST_URI, PY_REQUEST_URI } from "../request_URL";

export const Scan = async (capturedImageFormData: FormData, setCancelOrReported: React.Dispatch<React.SetStateAction<boolean>>) => {

    console.log("setCancelOrReported:", setCancelOrReported)

    try {
        const response = await axios.post(`${PY_REQUEST_URI}/image/scan`, capturedImageFormData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
            },
            timeout: 100000,
        });

        if (response.status === 200) return response.data;

    } catch (error: any) {
        console.log("ERROR IN AXIOS REQUEST SCAN");
        console.error(error.message || error); 

        return false;

    }
}


export const FetchMolluskDetails = async (mollusk_name:string) => {
    try {

        const response = await axios.get(`${GO_REQUEST_URI}/fetch/mollusk/${mollusk_name}`, {
            headers: { 
                'Content-Type': 'application/json'
            }
        })


        if(response.status === 200) return response.data
        
    } catch (error) {
        console.error(error)
    }
}