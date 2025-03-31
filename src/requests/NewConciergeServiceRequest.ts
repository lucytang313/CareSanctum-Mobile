import axios from "axios";

export const newConciergeService = async (username:string, service_name: string) => {
    try{
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/create-ticket/`, {
            username:username,
            service_name:service_name,
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response;
    }
    catch(error){
        console.log(error);
    }
}