import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import ProfileHeader from "../components/ProfileHeader"
import { ContactCard } from "../components/Profile/ContactCard";
import EmergencyContactCard from "../components/Profile/EmergencyContactCard";
import { MedicalInfoCard } from "../components/Profile/MedicalInfoCard";
import { LifestyleCard } from "../components/Profile/LifeStyleCard";
import { PersonalInfoCard } from "../components/Profile/PersonalInfoCard";
import { useState, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { viewRequest } from "../requests/ViewRequest";

const ProfileScreen = () => {
    const [userDetails, setUserDetails] = useState<any>(null);
  const {username} = useAppSelector((state) => state.auth);
  useEffect(() => {
  const fetchUserDetails = async () => {
      try {
        const data = await viewRequest(username);  // Call the function
        console.log(data);
        console.log(username);
        setUserDetails(data);
        console.log(userDetails) // Store response in the stat
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUserDetails();  // Run the function on mount
  }, []);

  const profileData = {
    personalInfo: {
      fullName: userDetails?.patient?.full_name || "",
      dob:  userDetails?.patient?.dob || "",
      gender: userDetails?.patient?. gender || "",
      bloodGroup: userDetails?.patient?.blood_group || "",
      height: userDetails?.patient?.height || "",
      weight: userDetails?.patient?.weight || "",
      wakeUpTime: userDetails?.patient?.usual_wake_up_time || "",
      image_url: userDetails?.patient?.profile_picture_url || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010",
      currentLocation: {
        status: userDetails?.patient?.current_location_status || "",
        expectedReturn: undefined
      }
    },
    contact: {
      phone: userDetails?.patient?.phone || "",
      altPhone: userDetails?.patient?.alternate_phone || "",
      email: userDetails?.patient?.email || "",
      address: userDetails?.patient?.address || "",
      pincode: userDetails?.patient?.PINcode || "",
      idProofUrl: userDetails?.patient?.id_proof_url || "",
    },
    emergencyContact: {
      name: userDetails?.emergency_contacts?.next_of_kin_name || "",
      phone: userDetails?.emergency_contacts?.next_of_kin_contact_number || "",
      relationship: userDetails?.emergency_contacts?.relationship_with_senior || "",
      neighborName: userDetails?.emergency_contacts?.neighbor_name || "",
      neighborPhone: userDetails?.emergency_contacts?.neighbor_contact_number || "",
    },
    medicalInfo: {
      healthConditions: userDetails?.medical_history?.existing_health_conditions || "",
      allergies: userDetails?.medical_history?.known_allergies || "",
      surgeries: userDetails?.medical_history?.past_surgeries || "",
      doctorName: userDetails?.preferred_medical_services?.preferred_doctor_name || "",
      doctorContact: userDetails?.preferred_medical_services?.doctor_contact_number|| "",
      preferredHospital: userDetails?.preferred_medical_services?.preferred_hospital_or_clinic || "",
      PrescsUrl: userDetails?.medical_history?.current_prescriptions_url ||"",
    },
    lifestyle: {
      activityLevel:  userDetails?.lifestyle_details?.activity_level || "",
      dietPreference: userDetails?.lifestyle_details?.diet_preferences || "",
      specialNeeds: {
        mobilityAssistance: userDetails?.lifestyle_details?.requires_mobility_assistance || "",
        visionImpairment: userDetails?.lifestyle_details?.has_vision_impairment || "",
        hearingImpairment: userDetails?.lifestyle_details?.has_hearing_impairment || "",
      }
    }
  };
      const BOTTOM_NAV_HEIGHT = 60; 
      const HEADER_HEIGHT = 50; // Adjust based on your Header's actual height
  
      // Calculate available screen height
      const screenHeight = Dimensions.get('window').height;
      const availableHeight = screenHeight - HEADER_HEIGHT - BOTTOM_NAV_HEIGHT;
    return (
        <SafeAreaView style={styles.container}>
            <ProfileHeader />
            <View style={[styles.scrollContainer, { height: availableHeight }]}>
                <ScrollView>
                    <View style={{alignItems: "center"}}>
                    <PersonalInfoCard personalInfo={profileData.personalInfo}/>
                    <ContactCard contact={profileData.contact} />
                    <EmergencyContactCard emergencyContact={profileData.emergencyContact}/>
                    <MedicalInfoCard medicalInfo={profileData.medicalInfo} />
                    <LifestyleCard lifestyle={profileData.lifestyle}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f3f7r"
    },
    scrollContainer: {
        width: '100%',
    },
})
export default ProfileScreen;