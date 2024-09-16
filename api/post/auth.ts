import { LoginCredentials } from '@/types/auth';
import { setData } from '@/helpers/store';
import axios from 'axios'

export const Signup = async (signupFormData: FormData): Promise<boolean> => {

    try {
        const response = await axios.post("https://clamscanner.com/go/auth/signup", signupFormData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });

        if (response.status === 200) return true

        return false

    } catch (error) {
        console.error(error)
        return false
    }
}


export const Login = async (loginFormData: LoginCredentials): Promise<string | undefined> => {

    try {
        const response = await axios.post("https://clamscanner.com/go/auth/login", loginFormData);
        if (response.status === 200){
            setData("user_id", response.data.user_id.toString())
            return response.data.role
        } 


    } catch (error) {
        console.error(error)
    }
}