import axios from "axios";

export const sendfileRequest = async (formData: FormData) => {
    try{
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/upload-file/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data' 
          },
        });
        console.log('File uploaded successfully:', response.data);
        return response;
      }
      catch(error: any){
        if (error.response) {
          // Server responded with a status outside 2xx range
          console.error("❌ Server Error:", error.response.status);
          console.error("📄 Response Data:", JSON.stringify(error.response.data, null, 2));
          console.error("📩 Headers:", error.response.headers);
        } else if (error.request) {
          // No response received from the server
          console.error("⚠️ No response received:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("🚨 Request Setup Error:", error.message);
        }
        throw error;
      }
}