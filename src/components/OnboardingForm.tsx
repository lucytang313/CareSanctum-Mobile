import React from "react";
import { ScrollView, View } from "react-native";
import { useAppSelector } from "../store/hooks";
import { addReqeuest } from "../requests/AddRequest";
import { useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native";
import Button from "./ui/button";
import { PersonalInfoSection } from "./Onboarding/PersonalInfoSection";

const OnboardingForm = () => {
    const {username, accessToken} = useAppSelector((state) => state.auth);
    const { register, handleSubmit, watch, control, getValues} = useForm();
    const navigation = useNavigation<any>();
    const onSubmit = async (data: any) => {
        const values = getValues();
        console.log(values);
        try{
          const response = await addReqeuest(values, username, accessToken);
          if (response.status == 201) {
            // console.log(fullName);
            console.log("profile updated Successfully");
            navigation.navigate('Main' , { screen : 'Profile'})
          } else if (response.status == 400) {
            console.log("Error: ", response.data.non_field_error);
          }
        }
        catch (error: any) {
          console.log("Error in handleSave:", error.message);  // ✅ Log error message
          console.log("Error details:", JSON.stringify(error, null, 2)); // ✅ Full error
        }
      };
      return (
        <ScrollView style={{marginTop: 20}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <PersonalInfoSection register={register} watch={watch} control={control} />
              {/* <Button
                onPress={() => navigation.goBack()} // Go back to the previous screen
              >Back</Button>
              <Button
                onPress={handleSubmit(onSubmit)} // Trigger form submit
              >Save Profile</Button> */}
            </View>
        </ScrollView>
      )

}
export default OnboardingForm;