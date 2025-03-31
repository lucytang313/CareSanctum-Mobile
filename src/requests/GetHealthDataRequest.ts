import axios from "axios";

export const gethealthdataRequest = async (username: string) =>{
    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/health-data/${username}`,{
            // Add timeout to avoid hanging
            timeout: 5000,
            // Log request headers for debugging
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('Response received:', response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}