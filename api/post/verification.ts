import axios from "axios";
import { GO_REQUEST_URI } from "../request_URL";


export const IsEmailVerified = async (email: string): Promise<boolean | undefined> => {

    try {
        const response = await axios.post(`${GO_REQUEST_URI}/check/verified`, { email });
        console.log("response.data sa auth verified:", response.data)

        if (response.data == "user_unverified"){
            return false;
        }

        return true;

    } catch (error) {
        console.error(error)
    }
}


export const SendVerificationCode = async (email: string): Promise<any | undefined> => {

    try {
        const response = await axios.post(`${GO_REQUEST_URI}/send/verification_code`, { email });
        console.log("response.data send verification code:", response.data)

        return response.data;
        
    } catch (error) {
        console.error(error)
    }
}
