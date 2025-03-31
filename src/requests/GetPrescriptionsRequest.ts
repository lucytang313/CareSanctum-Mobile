import axios from "axios";
import { Prescription } from "../hooks/use-prescriptions";

export const getprescriptionRequest = async (username: string) =>{
    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/prescriptions/${username}/`);
        const transformedPrescs:Prescription[] = response.data.map((item: any) => ({
            url: item?.Presc_file_url? item.Presc_file_url : "",
            doctorName: item?.doctor_name? item.doctor_name : "",
            prescribedDate: item?.prescribed_date? item.prescribed_date : "",
          }));
          return transformedPrescs;
      
    } catch (error) {
        console.log(error);
    }
}
