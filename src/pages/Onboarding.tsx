// import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
// import { Logo } from "../components/Logo";
// import OnboardingForm from "../components/OnboardingForm";
// const { height } = Dimensions.get('window');

// const OnboardingScreen = () => {
//     return(
//         <SafeAreaView style={styles.container}>
//             <ScrollView >
//             <View style={styles.topContainer}>
//                 <View style={styles.innerContainer}>
//                     <Logo />
//                 </View>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle style={{textAlign: "center", lineHeight: 32, fontSize: 24}}>Complete Your Profile</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <OnboardingForm />
//                     </CardContent>
//                 </Card>
//             </View>
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#f4f3f7r",
//         paddingTop: 32,
//         paddingBottom: 32,
//         minHeight: height,
//     },
//     topContainer: {
//         paddingLeft: 16,
//         paddingRight: 16,
//         marginLeft: "auto",
//         marginRight: "auto",
//     },
//     innerContainer: {
//         display: "flex",
//         marginBottom: 32,
//         justifyContent: "space-between",
//         alignItems: "center",
//     }
// })

// export default OnboardingScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../store/hooks';
import axios from 'axios';
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { uploadFileRequest } from '../requests/uploadFileRequest';


interface DocumentFile {
    name: string;
    type: string;
    uri: string;
    size?: number;
  }

export interface FormData {
    fullName: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other';
    bloodGroup: string;
    height: string;
    weight: string;
    IDFile: DocumentPicker.DocumentPickerAsset | null,
    wakeUpTime: Date;
    locationStatus: 'atHome' | 'travelling';
  
    
    phoneNumber: string;
    alternatePhone: string;
    emailAddress: string;
    currentAddress: string;
    PINcode: string;
  
    NofKname: string;
    NofKnumber: string;
    RwSenior: string;
    Neiname: string;
    Neinumber: string;
  
    ExistingHealthConditions: string;
    KnownAllergies: string;
    PastSurgeries: string;
  
    PrefDoctorsName: string;
    PrefDoctorsNumber: string;
    PrefHospital: string;
    ActivityLevel: string;
    DietPref: string;
    SpecialNeeds: string[];
  }
  
  const SpecialNeedsOptions = ["Requires Mobility Assistance", "Has Vision Impairment", "Has Hearing Impairment"];
  
//   type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileForm'>;
  const sendAddRequest = async (userform: FormData, username: string, accessToken:string) => {
    console.log("sendAddRequest started");
    try{
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/add_patient_data/`, {
        username: username,
        patient: {
          full_name: userform.fullName,
          dob: userform.dateOfBirth.toISOString().split('T')[0],
          gender: userform.gender,
          blood_group: userform.bloodGroup,
          height: userform.height,
          weight: userform.weight,
          usual_wake_up_time: userform.wakeUpTime.toTimeString().split(' ')[0],
          current_location_status: userform.locationStatus,
          phone: userform.phoneNumber,
          alternate_phone: userform.alternatePhone,
          address: userform.currentAddress,
          pin_code: userform.PINcode,
        },
        emergency_contacts:
          {
            next_of_kin_name: userform.NofKname,
            next_of_kin_contact_number: userform.NofKnumber,
            relationship_with_senior: userform.RwSenior,
            neighbor_name: userform.Neiname,
            neighbor_contact_number: userform.Neinumber,
                
          },
        medical_history: {
          existing_health_conditions: userform.ExistingHealthConditions,
          known_allergies: userform.KnownAllergies,
          past_surgeries: userform.PastSurgeries
  
        },
        preferred_medical_services: {
          preferred_doctor_name: userform.PrefDoctorsName,
          doctor_contact_number: userform.PrefDoctorsNumber,
          preferred_hospital_or_clinic: userform.PrefHospital,
  
        },
        lifestyle_details: {
          activity_level: userform.ActivityLevel,
          diet_preferences: userform.DietPref,
          requires_mobility_assistance: false,
          has_vision_impairment: true,
          has_hearing_impairment: true
              
        }
     },{
       headers: {
         Authorization: `Bearer ${accessToken}`,
         "Content-Type": "application/json"
       },
       validateStatus: (status) => {
         // Treat 2xx and 400 as valid status codes
         return status >= 200 && status < 401;
       }
     });
     return response;
   }
   catch(error: any){
     console.log("Request Not sent");
     throw error;
   }
  };
  
  
  
  interface ProfileData {
    fullName: string | null;
    bloodGroup: string;
    height: string;
    weight: string;
  
    phoneNumber: string;
    alternatePhone: string;
    emailAddress: string;
    currentAddress: string;
    PINcode: string;
  
    NofKname: string;
    NofKnumber: string;
    RwSenior: string;
    Neiname: string;
    Neinumber: string;
  
    ExistingHealthConditions: string;
    KnownAllergies: string;
    PastSurgeries: string;
  
    PrefDoctorsName: string;
    PrefDoctorsNumber: string;
    PrefHospital: string;
    ActivityLevel: string;
    DietPref: string;
  }
  
  const viewRequest = async (username: string) => {
    try {
        // Log the request URL
        console.log('Making request to:', `http://192.168.1.104:8080/api/user-details/${username}/`);
        
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user-details/${username}/`, {
            // Add timeout to avoid hanging
            timeout: 5000,
            // Log request headers for debugging
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        // Log successful response
        console.log('Response received:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                code: error.code
            });
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // Re-throw to handle in the component
    }
  }
  
  const ProfileForm = () => {
    const [formData, setFormData] = useState<FormData>({
      fullName: '',
      dateOfBirth: new Date(),
      gender: 'male',
      bloodGroup: '',
      height: '',
      weight: '',
      IDFile: null,
      wakeUpTime: new Date(),
      locationStatus: 'atHome',
      // expectedReturnDate: new Date(),
      phoneNumber: '',
      alternatePhone: '',
      emailAddress: '',
      currentAddress: '',
      PINcode: '',
      
      NofKname: '',
      NofKnumber: '',
      RwSenior: '',
      Neiname: '',
      Neinumber: '',
  
      ExistingHealthConditions: '',
      KnownAllergies: '',
      PastSurgeries: '',
  
      PrefDoctorsName: '',
      PrefDoctorsNumber: '',
      PrefHospital: '',
  
      ActivityLevel: '',
      DietPref: '',
  
      SpecialNeeds: [],
    });
  
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    // const [showReturnDatePicker, setShowReturnDatePicker] = useState<boolean>(false);
    const navigation = useNavigation<any>();
    const { username, accessToken } = useAppSelector((state) => state.auth);
  
    const onDateChange = (event: any, selectedDate?: Date): void => {
      setShowDatePicker(false);
      if (selectedDate) {
        setFormData({ ...formData, dateOfBirth: selectedDate });
      }
    };
  
    const onTimeChange = (event: any, selectedTime?: Date): void => {
      setShowTimePicker(false);
      if (selectedTime) {
        setFormData({ ...formData, wakeUpTime: selectedTime });
      }
    };
  
    // const onReturnDateChange = (event: any, selectedDate?: Date): void => {
    //   setShowReturnDatePicker(false);
    //   if (selectedDate) {
    //     setFormData({ ...formData, expectedReturnDate: selectedDate });
    //   }
    // };
  
    const toggleSpneedCheckbox = (option: string) => {
      setFormData(prev => ({
        ...prev,
        SpecialNeeds: prev.SpecialNeeds.includes(option)
          ? prev.SpecialNeeds.filter(item => item !== option)
          : [...prev.SpecialNeeds, option],
      }));
    };
  
  
    const pickIDDocument = async (): Promise<void> => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            multiple: false,
           });
    
        if (!result.canceled) {
          setFormData((prevFormData) => ({
            ...prevFormData, 
            IDFile: result.assets[0] // Ensure correct type
          }));
        }
      } catch (err) {
          console.error("Error picking document:", err);
      }
    };
    const uploadID = async (accessToken: string, username: string, file: DocumentPicker.DocumentPickerAsset | null) =>{
      try{
        const response = await uploadFileRequest(accessToken, username, file, "id_proof")
        if(response.status === 201){
          console.log(response.data.file_url);
        }
      }
      catch (error: any) {
        console.log("Error in handleSave:", error.message);  // ✅ Log error message
        console.log("Error details:", JSON.stringify(error, null, 2)); // ✅ Full error
      };
  
    }

    
    const handleSave = async (userform: FormData) => {
    
      try {
        const response = await 
          sendAddRequest(userform, username , accessToken);
          navigation.navigate('Main', { screen: 'Profile' });
    
        // if (response.status == 201) {
        //   dispatch(updateFormField({
        //     fullName: userform.fullName,
        //     dateOfBirth: userform.dateOfBirth.toISOString().split('T')[0],
        //     gender: userform.gender,
        //     bloodGroup: userform.bloodGroup,
        //     height: userform.height,
        //     weight: userform.weight,
        //     IDFile: null,
        //     PhotoFile: null,
        //     wakeUpTime: userform.wakeUpTime.toTimeString().split(' ')[0],
        //     locationStatus: userform.locationStatus,
        //   }));
        //   // console.log(fullName);
        //          navigation.dispatch(
        //             CommonActions.reset({
        //               index: 0,
        //               routes: [{ name: 'HomeScreen' }], // Use your home screen name
        //             })
        //           );
        // } else if (response.status == 400) {
        //   console.log("Error: ", response.data.non_field_error);
        // }
      } catch (error: any) {
        console.log("Error in handleSave:", error.message);  // ✅ Log error message
        console.log("Error details:", JSON.stringify(error, null, 2)); // ✅ Full error
      }
    };
    
         const [userDetails, setUserDetails] = useState<any>(null);
          useEffect(() => {
      
          const fetchUserDetails = async () => {
            try {
              const data = await viewRequest(username);  // Call the function
              console.log("here");
              setUserDetails(data);
              console.log(userDetails) // Store response in the stat
            } catch (error: any) {
              console.log(error);
            }
          };
      
          fetchUserDetails();  // Run the function on mount
        }, [])
        const profileData2: ProfileData = {
          fullName:  userDetails?.patient?.full_name || "",
          bloodGroup:   userDetails?.patient?.blood_group || "",
          height:  userDetails?.patient?.height || "",
          weight:   userDetails?.patient?.weight || "",
    
          phoneNumber:  userDetails?.patient?.phone || "",
          alternatePhone:  userDetails?.patient?.alternate_phone || "",
          emailAddress:  userDetails?.patient?.emailAddress || "",
          currentAddress:  userDetails?.patient?.address || "",
          PINcode:  formData.PINcode || "",
  
  
          NofKname:  userDetails?.emergency_contacts?.next_of_kin_name || "",
          NofKnumber:  userDetails?.emergency_contacts?.next_of_kin_contact_number || "",
          RwSenior:  userDetails?.emergency_contacts?.relationship_with_senior || "",
          Neiname:  userDetails?.emergency_contacts?.neighbor_name || "",
          Neinumber:  userDetails?.emergency_contacts?.neighbor_contact_number || "",  
  
    
          ExistingHealthConditions:  userDetails?.medical_history?.existing_health_conditions || "",
          KnownAllergies:  userDetails?.medical_history?.known_allergies || "",
          PastSurgeries:  userDetails?.medical_history?.past_surgeries || "",
    
          PrefDoctorsName:  userDetails?.preferred_medical_services?.preferred_doctor_name || "",
          PrefDoctorsNumber:  userDetails?.preferred_medical_services?.doctor_contact_number|| "",
          PrefHospital:  userDetails?.preferred_medical_services?.preferred_hospital_or_clinic || "",
          ActivityLevel:  userDetails?.lifestyle_details?.activity_level || "",
          DietPref:  userDetails?.lifestyle_details?.diet_preferencesa || "",
          };
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.title, {marginTop: 32}]}>Complete Your Profile</Text>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
  
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            placeholder= {profileData2.fullName ?? ""}
            placeholderTextColor= "#808080"
          />
  
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString() : ''}
              editable={false}
              placeholderTextColor={"#0000000"}
              placeholder="mm/dd/yyyy"
            />
          </TouchableOpacity>
  
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setFormData({ ...formData, gender: 'male' })}
            >
              <View style={styles.radio}>
                {formData.gender === 'male' && <View style={styles.radioSelected} />}
              </View>
              <Text>Male</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setFormData({ ...formData, gender: 'female' })}
            >
              <View style={styles.radio}>
                {formData.gender === 'female' && <View style={styles.radioSelected} />}
              </View>
              <Text>Female</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.radioButton}
              
              onPress={() => setFormData({ ...formData, gender: 'other' })}
            >
              <View style={styles.radio}>
                {formData.gender === 'other' && <View style={styles.radioSelected} />}
              </View>
              <Text>Other</Text>
            </TouchableOpacity>
          </View>
  
          <Text style={styles.label}>Blood Group</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.bloodGroup}
              onValueChange={(value: string) => setFormData({ ...formData, bloodGroup: value })}
              style={styles.picker}
            >
              <Picker.Item label="Select blood group" value="" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
            </Picker>
          </View>
  
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                value={formData.height}
                onChangeText={(text) => setFormData({ ...formData, height: text })}
                keyboardType="numeric"
                placeholder={profileData2.height ?? ""}
                placeholderTextColor= "#808080"
              />
            </View>
  
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={formData.weight}
                onChangeText={(text) => setFormData({ ...formData, weight: text })}
                keyboardType="numeric"
                placeholder={profileData2.weight ?? ""}
                placeholderTextColor= "#808080"
              />
            </View>
          </View>
          <Text style={styles.label}>ID Proof Upload</Text>
          <View style={{ alignItems: 'center'}}>
  
          <TouchableOpacity style={styles.uploadButton} onPress={pickIDDocument}>
            <Text style={styles.uploadButtonText}>
              {formData.IDFile ? formData.IDFile.name : 'Choose File'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallUploadButton} onPress={() => formData.IDFile ? uploadID(accessToken, username, formData.IDFile) : null}>
            <Text style={styles.smallUploadButtonText}>Upload</Text>
          </TouchableOpacity>
          </View>
  
          <View style={styles.halfWidth}>    
              <Text style={styles.label}>Usual Wake Up Time</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                  style={styles.input}
                  value={formData.wakeUpTime.toLocaleTimeString()}
                  editable={false}
                  placeholder="Select time"
              />
              </TouchableOpacity>
          </View>
  
          <Text style={styles.label}>Current Location Status</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setFormData({ ...formData, locationStatus: 'atHome' })}
            >
              <View style={styles.radio}>
                {formData.locationStatus === 'atHome' && <View style={styles.radioSelected} />}
              </View>
              <Text>At Home</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setFormData({ ...formData, locationStatus: 'travelling' })}
            >
              <View style={styles.radio}>
                {formData.locationStatus === 'travelling' && <View style={styles.radioSelected} />}
              </View>
              <Text>Travelling</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
  
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            keyboardType="phone-pad"
            placeholder={profileData2.phoneNumber ?? ""}
            placeholderTextColor= "#808080"
          />
  
          <Text style={styles.label}>Alternate Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formData.alternatePhone}
            onChangeText={(text) => setFormData({ ...formData, alternatePhone: text })}
            keyboardType="phone-pad"
            placeholder={profileData2.alternatePhone ?? ""}
            placeholderTextColor= "#808080"
          />
  
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={formData.emailAddress}
            onChangeText={(text) => setFormData({ ...formData, emailAddress: text })}
            keyboardType="email-address"
            placeholder={profileData2.emailAddress ?? ""}
            placeholderTextColor= "#808080"
          />
          <Text style={styles.label}>Current Address</Text>
          <TextInput
            style={styles.input}
            value={formData.emailAddress}
            onChangeText={(text) => setFormData({ ...formData, emailAddress: text })}
            keyboardType="email-address"
            placeholder={profileData2.currentAddress ?? ""}
            placeholderTextColor= "#808080"
          />
          <Text style={styles.label}>PIN Code</Text>
          <TextInput
            style={styles.input}
            value={formData.emailAddress}
            onChangeText={(text) => setFormData({ ...formData, emailAddress: text })}
            keyboardType="email-address"
            placeholder={profileData2.PINcode}
            placeholderTextColor= "#808080"
          />
          
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact Details</Text>
          <Text style={styles.label}>Next of Kin's Name</Text>
          <TextInput
              style={styles.input}
              value={formData.NofKname}
              onChangeText={(text) => setFormData({...formData, NofKname: text})}
              placeholder={profileData2.NofKname}
              placeholderTextColor= "#808080"
              
          />
          <Text style={styles.label}>Next of Kin's Contact Number</Text>
          <TextInput
              style={styles.input}
              value={formData.NofKnumber}
              onChangeText={(text) => setFormData({...formData, NofKnumber: text})}
              placeholder={profileData2.NofKnumber}
              placeholderTextColor= "#808080"
              
          />
          <Text style={styles.label}>Relationship with the Senior</Text>
          <TextInput
              style={styles.input}
              value={formData.RwSenior}
              onChangeText={(text) => setFormData({...formData, RwSenior: text})}
              placeholder={profileData2.RwSenior}
              placeholderTextColor= "#808080"
              
          />
          <Text style={styles.label}>Neighbor's Name</Text>
          <TextInput
              style={styles.input}
              value={formData.Neiname}
              onChangeText={(text) => setFormData({...formData, Neiname: text})}
              placeholder={profileData2.Neiname}
              placeholderTextColor= "#808080"
              
          />
          <Text style={styles.label}>Neighbors Contact Number</Text>
          <TextInput
              style={styles.input}
              value={formData.NofKname}
              onChangeText={(text) => setFormData({...formData, NofKname: text})}
              placeholder={profileData2.NofKnumber}
              placeholderTextColor= "#808080"
              
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical History</Text>
          <Text style={styles.label}>Existing Health Conditions</Text>
          <TextInput
              style={styles.input}
              value={formData.ExistingHealthConditions}
              onChangeText={(text) => setFormData({...formData, ExistingHealthConditions: text})}
              placeholder={profileData2.ExistingHealthConditions ?? ""}
              placeholderTextColor="#808080"
              
          />
  
          <Text style={styles.label}>Known Allergies</Text>
          <TextInput
              style={styles.input}
              value={formData.KnownAllergies}
              onChangeText={(text) => setFormData({...formData, KnownAllergies: text})}
              placeholder={profileData2.KnownAllergies ?? ""}
              placeholderTextColor="#808080"
          />
          <Text style={styles.label}>Past Surgeries</Text>
          <TextInput
              style={styles.input}
              value={formData.PastSurgeries}
              onChangeText={(text) => setFormData({...formData, PastSurgeries: text})}
              placeholder={profileData2.PastSurgeries ?? ""}
              placeholderTextColor="#808080"
          />
  
  
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Medical Services</Text>
          <Text style={styles.label}> Preferred's Doctor Name</Text>
          <TextInput
              style={styles.input}
              value={formData.PrefDoctorsName}
              placeholder={profileData2.PrefDoctorsName ?? ""}
              placeholderTextColor="#808080"
              onChangeText={(text) => setFormData({...formData, PrefDoctorsName: text})}
              
          />
          <Text style={styles.label}>Doctor's Contact Number</Text>
          <TextInput
              style={styles.input}
              value={formData.PrefDoctorsName}
              placeholder={profileData2.PrefDoctorsNumber ?? ""}
              placeholderTextColor="#808080"
              onChangeText={(text) => setFormData({...formData, PrefDoctorsNumber: text})}
              
          />
          <Text style={styles.label}>Preferred Hospital/Clinic</Text>
          <TextInput
              style={styles.input}
              value={formData.PrefHospital}
              placeholder={profileData2.PrefHospital ?? ""}
              placeholderTextColor="#808080"
              onChangeText={(text) => setFormData({...formData, PrefHospital: text})}
              
          />
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle Details</Text>
          <Text style={styles.label}>Activity Level</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.ActivityLevel ? formData.ActivityLevel : ""}
              // value = {formData.ActivityLevel}
              onValueChange={(value: string) => setFormData({ ...formData, ActivityLevel: value })}
              style={[styles.picker, formData.ActivityLevel && { color: 'black' }]} 
              
            >
              <Picker.Item label="Select Activity Level" value="" />
              <Picker.Item label="Sedentary" value="Sedentary" />
              <Picker.Item label="Moderately Active" value="Moderate" />
              <Picker.Item label="Highly Active" value="High" />
            </Picker>
  
          </View>
          <Text style={styles.label}>Diet Preferences</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.DietPref? formData.DietPref : ""}
              
              onValueChange={(value: string) => setFormData({ ...formData, DietPref: value })}
              style={[styles.picker, formData.DietPref && { color: "black" }]}
            >
              <Picker.Item label="Select diet preferences" value=""/>
              <Picker.Item label="Vegetarian" value="Vegetarian" />
              <Picker.Item label="Non Vegetarian" value="Non-Vegetarian" />
              <Picker.Item label="Vegan" value="Vegan" />
              <Picker.Item label="Dietabetic Diet" value="Diabetic Diet" />
            </Picker>
            
          </View>
        </View>
        <View style={styles.section}>
              <Text style={styles.sectionTitle}>Special Needs</Text>
              {SpecialNeedsOptions.map( option => (
                <TouchableOpacity
                  key={option}
                  style={styles.checkboxContainer}
                  onPress={() => toggleSpneedCheckbox(option)}
                >
                <View style={[styles.checkbox, formData.SpecialNeeds.includes(option) && styles.checked]} />
                <Text style={styles.label}>{option}</Text>
                </TouchableOpacity>
              )
              )
              }
          </View>
  
  
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.backButton]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]} 
            onPress={() => {
              handleSave(formData);}}
          >
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
  
        {showDatePicker && (
          <DateTimePicker
            value={formData.dateOfBirth}
            mode="date"
            onChange={onDateChange}
          />
        )}
  
        {showTimePicker && (
          <DateTimePicker
            value={formData.wakeUpTime}
            mode="time"
            onChange={onTimeChange}
          />
        )}
  
        {/* {showReturnDatePicker && (
          <DateTimePicker
            value={formData.expectedReturnDate}
            mode="date"
            onChange={onReturnDateChange}
          />
        )} */}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    section: {
      backgroundColor: 'white',
      margin: 7,
      borderRadius: 12,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333',
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    radioGroup: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
    },
    radio: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 5,
    },
    radioSelected: {
      height: 12,
      width: 12,
      borderRadius: 6,
      backgroundColor: '#000',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      marginBottom: 15,
  
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginRight:6,
    },
    checkbox: {
      width: 15,
      height: 15,
      borderRadius: 4,
      borderWidth: 1.4,
      borderColor: '#000',
      marginRight: 10,
    },
      checked: {
      backgroundColor: '#000000',
    },
    picker: {
      height: 50,
      alignContent: "center",
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    halfWidth: {
      width: '48%',
    },
    uploadButton: {
      width: "100%",
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      alignItems: 'center',
    },
    uploadButtonText: {
      color: '#666',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      // paddingVertical: 10,
      marginBottom:50,
      marginTop:10,
    },
    button: {
      width: '45%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#0a1647',
    },
    saveButton: {
      backgroundColor: '#0a1647',
    },
    backButtonText: {
      color: '#0a1647',
      fontSize: 16,
      fontWeight: 'bold',
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    smallUploadButton: {
    width: "50%",
    backgroundColor: '#0a1647',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  smallUploadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  });
  
  export default ProfileForm;