import axios from "axios";

export const getCMdetailsRequest = async (username: string) => {
    try{
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/patient/${username}`);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}