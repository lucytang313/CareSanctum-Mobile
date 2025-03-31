import axios from "axios";

export const getvisitRequest = async(username: string) => {
    try{
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/get-schedules/${username}/`);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}