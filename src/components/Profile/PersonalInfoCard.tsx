import React from "react";
import { View, Text, StyleSheet, useWindowDimensions, Alert } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AvatarWithCamera } from "../ui/avatar";
import { useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react";
import { viewRequest } from "../../requests/ViewRequest";
import { sendfileRequest } from "../../requests/SendfileRequest";
import * as DocumentPicker from "expo-document-picker";
interface PersonalInfoProps {
    personalInfo: {
      fullName: string;
      dob: string;
      gender: string;
      bloodGroup: string;
      height: string;
      weight: string;
      wakeUpTime?: string;
      image_url: string;
      currentLocation: {
        status: "home" | "travelling";
        expectedReturn?: string;
      };
    };
  }

  export const PersonalInfoCard = ({ personalInfo }: PersonalInfoProps) => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768; // Equivalent to md:grid-cols-2
    const {username, accessToken} = useAppSelector((state) => state.auth);
    const [profileUrl, setProfileUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010");
    const [pfile, setpfile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const fetchProfilePicture = async () => {
      try {
        const data = await viewRequest(username); // Fetch profile data
        setProfileUrl(data?.patient?.profile_picture_url || personalInfo.image_url);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleFileUpload = async () => {
      try {
        // Launch the document picker
        const formData = new FormData();
        const result = await DocumentPicker.getDocumentAsync({
          type: "*/*", // Accept all types of files (or specify an extension like "image/*" for images)
          multiple:false
        });
  
        if (!result.canceled) {
          setpfile(result.assets[0]);
        }else{
            console.log("User canceled the document picker");
            return;
        }
        if (!pfile) {
            alert("Please select a file first.");
            return;
          }
        if ('uri' in pfile){
            const sanitizedFileName = pfile.name.replace(/\s+/g, "_");
            
            formData.append("file", {
                uri: pfile.uri,
                name: sanitizedFileName,
                type: pfile.mimeType || "application/octet-stream", // mimeType of the selected file
              } as any);
              formData.append("name", "profile_picture");
              formData.append("user_name", username);
        }
  
        // Show loading state (optional)
        setProfileUrl("");
  
        // Upload the file
        await sendfileRequest(formData);
  
        // Fetch the updated profile picture
        fetchProfilePicture();
      } catch (error) {
        console.error("Upload failed:", error);
        Alert.alert("Failed to upload profile picture. Please try again.");
      }
    };
  
    useEffect(() => {
      fetchProfilePicture(); // Run the function on component mount
    }, [username]);
    return (
        <Card style={{width: "90%", marginTop: 8}}>
              <CardHeader>
                <View style={{marginBottom: 16, marginLeft: "auto", marginRight: "auto"}}>
                    <AvatarWithCamera handleUpload={handleFileUpload} source={profileUrl} size={100}>
                    </AvatarWithCamera>
                </View>
                <CardTitle ><Text style={{fontSize: 16, fontWeight: 500, textAlign: "center"}}>{personalInfo.fullName}</Text></CardTitle>
              </CardHeader>
          <CardContent style={{marginTop: 8}}>
            <View style={[styles.gridContainer, isLargeScreen && styles.gridTwoColumns]}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text style={styles.value}>{new Date(personalInfo.dob).toLocaleDateString()}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Gender</Text>
                <Text style={styles.value}>{personalInfo.gender}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Blood Group</Text>
                <Text style={styles.value}>{personalInfo.bloodGroup}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Height(cm)</Text>
                <Text style={styles.value}>{personalInfo.height}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Weight(kg)</Text>
                <Text style={styles.value}>{personalInfo.weight}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Wake Up Time</Text>
                <Text style={styles.value}>{personalInfo.wakeUpTime || "6:00 AM"}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Weight(kg)</Text>
                <Text style={styles.value}>{personalInfo.weight}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
                <Text style={styles.label}>Current Status</Text>
                <Text style={styles.value}>{personalInfo.currentLocation.status === "home" ? "At Home" : `Travelling (Expected Return: ${personalInfo.currentLocation.expectedReturn})`}</Text>
              </View>
            
          </CardContent>
        </Card>
      );
  }

  const styles = StyleSheet.create({
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
    },
    gridTwoColumns: {
      justifyContent: "space-between", // For two-column layout
    },
    gridItem: {
      width: "100%", // Default to full width
    },
    fullWidth: {
      width: "100%", // Forces full width for items like Email, Address, Id Proof
    },
    label: {
      fontSize: 12,
      color: "#6b7280", // Equivalent to text-gray-500
    },
    value: {
      fontSize: 16,
      fontWeight: "500",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    buttonText: {
      marginLeft: 8,
      color: "#111827", // Equivalent to text-gray-900
    },
  });