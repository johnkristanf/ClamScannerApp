import axios from "axios";

export const Scan = async (capturedImageFormData: FormData) => {
    try {

        const response = await axios.post("http://192.168.43.252:5000/image/scan", capturedImageFormData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
            }
        });


        if(response.status === 200) return response.data
        
    } catch (error) {
        console.log("ERROR IN AXIOS REQUEST SCAN newly shess")
        console.error(error)
    }
}

export const FetchMolluskDetails = async (mollusk_name:string) => {
    try {

        const response = await axios.get(`http://192.168.43.252:8080/fetch/mollusk/${mollusk_name}`, {
            headers: { 
                'Content-Type': 'application/json'
            }
        })


        if(response.status === 200) return response.data
        
    } catch (error) {
        console.error(error)
    }
}