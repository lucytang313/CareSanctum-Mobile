import React from 'react'
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { sendfileRequest } from '../../requests/SendfileRequest';
import { useAppSelector } from '../../store/hooks';
import * as DocumentPicker from "expo-document-picker";
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Input } from '../ui/input';

export const PersonalInfoSection = ({ register, watch, control }: { register: any, watch: any, control: any }) => {
    const {username} = useAppSelector((state) => state.auth);
    const [file, setfile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
        const pickDocument = async (): Promise<void> => {
          try {
            const result = await DocumentPicker.getDocumentAsync({
             type: "*/*",
             multiple: false,
            });
       
            if (!result.canceled) {
            // Typeguard: Check if the result is a success and contains the 'uri'
            setfile(result.assets[0]);
           }
          } catch (err) {
             console.error("Error picking document:", err);
          }
       };

       const handleUpload = async () => {
        if (!file) {
          alert("Please select a file first.");
          return;
        }
      
        // Create a FormData object
        if ('uri' in file) {
          const sanitizedFileName = file.name.replace(/\s+/g, "_");
          const formData = new FormData();
      
          // Append fields to formData
          formData.append("name", "id_proof");
          formData.append("user_name", username);
          
          // Append file with URI, type, and name
          formData.append("file", {
            uri: file.uri,
            type: file.mimeType || "application/octet-stream", // added fallback for mimeType
            name: sanitizedFileName,
          } as any);
      
        //Sending via Axios
        await sendfileRequest(formData);
        }
       };

       return(
        <View>
            <Text style={{fontSize: 18, fontWeight: 600}}>Personal Information</Text>
            <View style={{marginTop: 4}}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input}></TextInput>
            </View>
        </View>
       );


}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: 500,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
})
