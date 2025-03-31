import axios from "axios";
import * as DocumentPicker from "expo-document-picker";

export const uploadFileRequest = async (accessToken: string, username: string, file: DocumentPicker.DocumentPickerAsset | null, field: string) => {
    const formDatatoSend = new FormData();
    formDatatoSend.append("file",{
      uri: file?.uri,
      type: file?.mimeType,
      name: file?.name,
    } as any);
    formDatatoSend.append("name", field);
    formDatatoSend.append("user_name", username);
    try{
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/upload-file/`, formDatatoSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data' 
        },
      });
      console.log('File uploaded successfully:', response.data);
      return response;
    }
    catch(error){
      console.error('Error uploading file:', error);
      throw error;
    }
  
  }
  