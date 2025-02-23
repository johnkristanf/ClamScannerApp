import { LoginCredentials } from '@/types/auth';
import { setData } from '@/helpers/store';
import axios from 'axios'
import { GO_REQUEST_URI } from '../request_URL';

export const Signup = async (signupFormData: FormData): Promise<string> => {

    try {
        const response = await axios.post(`${GO_REQUEST_URI}/auth/signup`, signupFormData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });

        console.log("response signup: ", response.data);
        

        if (response.status === 200) return "success";

        return ""

    } catch (error: any) {
        if (error.response) {
            console.error("Error status:", error.response.status);
            console.error("Error data:", error.response.data);
            
            // You can return or handle specific errors based on the status
            if (error.response.status === 400) {
                return "email_taken";
            } else if (error.response.status === 500) {
                return "server_error";
            } else {
                return `Error: ${error.response.status}`;
            }
        } 

        return ""
    }
}


export const Login = async (loginFormData: LoginCredentials): Promise<string | undefined> => {

    try {
        const response = await axios.post(`${GO_REQUEST_URI}/auth/login`, loginFormData);
        if (response.status === 200){
            console.log("response.data sa auth:", response.data)
            setData("user_id", response.data.user_id.toString())
            setData("email", response.data.email)
            return response.data.role
        } 


    } catch (error) {
        console.error(error)
        return "login_failure"
    }
}


export const VerifyAccount = async (verification_code: string): Promise<string | undefined> => {

    try {
        const response = await axios.post(`${GO_REQUEST_URI}/verify`, {verification_code});
        console.log("response.data sa VerifyAccount:", response.data)

        return response.data;


    } catch (error) {
        console.error(error)
        return "login_failure"
    }
}