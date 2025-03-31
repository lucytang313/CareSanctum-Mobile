import axios from "axios";

const getGoogleFitdata = async (username: string, format: string) => {
    try{
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/google-fit/data/`, {
            params: { username, format }
        })
        if (response.status == 200){
            return response.data;
        }else{
            throw Error("Bad Response Received From Google");
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}
export default getGoogleFitdata;