import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Pressable, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Linking 
} from "react-native";
import { Card, CardContent, CardHeader,CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import Button from "../components/ui/button";
import { Logo } from "../components/Logo";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";

const SignUp  = () => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showconfirmPassword, setshowconfirmPassword] = useState(false);
    const [referralCode, setReferralCode] = useState('');

    const openTermsLink = () => {
        Linking.openURL('https://webapp.caresanctum.com/Terms');
      };
    const openPrivacyLink = () => {
        Linking.openURL('https://webapp.caresanctum.com/Privacy');
    };

    const goToSignIn = () => {
      navigation.navigate('Auth', { screen: 'Login' });
      };
    
    const handleSubmit = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/register/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email,
                phone_number: phoneNumber,
                password,
                confirm_password: confirmPassword,
                referral_code: referralCode,
                role: "USERS"
              })
            });
        
            const data = await response.json();
            
            if (response.ok) {
              const data = await response.json();

              const accessToken = data.access;
              const username = data.user_name;
              await SecureStore.setItemAsync("accessToken", accessToken);
              await SecureStore.setItemAsync("username", username);
              dispatch(setCredentials({accessToken, username}));
              console.log("accessToken: ", accessToken);
              console.log("username: ", username);
              navigation.navigate("Home");
            } else {
            }
          } catch (error) {

          }
        console.log("Signup form submitted");
    };

    return (
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 0}
        >
          <Card style={styles.card}>
            <CardHeader style={styles.cardHeader}>
                <Logo />
                <CardTitle style={styles.cardTitle}>Create an account</CardTitle>
            </CardHeader>
    
            <CardContent>
              <View style={styles.form}>
                {/* Phone Number Input */}
                <View style={styles.inputGroup}>
                  <Input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    validationRules={{ pattern: "[0-9]*" }}
                    required
                  />
                </View>
    
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    required
                  />
                </View>
    
                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    validationRules={{ required: true, minLength: 6, pattern: "^(?=.*[0-9]).+$" }}
                    onChangeText={setPassword}
                    required
                  />
                </View>
    
                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    confirmPassword={password}
                    onChangeText={setConfirmPassword}
                    required
                  />
                </View>
    
                {/* Referral Code Input */}
                <View style={styles.inputGroup}>
                  <Input
                    type="text"
                    placeholder="Referral Code (Optional)"
                    value={referralCode}
                    onChangeText={setReferralCode}
                  />
                </View>
    
                {/* Sign Up Button */}
                <Button onPress={handleSubmit} style={styles.button}>
                  Sign Up
                </Button>
              </View>
    
              {/* Sign-in Link */}
              <View style={styles.linkContainer}>
                <TouchableOpacity onPress={goToSignIn}>
                  <Text style={styles.linkText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
              </View>
    
              {/* Terms & Privacy Links */}
              <Text style={styles.termsText}>
                By signing up, you agree to our 
                <Text style={styles.linkText} onPress={openTermsLink}> Terms of Service </Text>
                and 
                <Text style={styles.linkText} onPress={openPrivacyLink}> Privacy Policy</Text>
              </Text>
            </CardContent>
          </Card>
        </KeyboardAvoidingView>
      );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f9fafb",
      marginBottom: 0,
      marginTop: 30,
    },
    card: {
      width: "90%",
      height:"95%",
      maxWidth: 400,
    },
    cardHeader: {
      alignItems: "center",
    },
    logoContainer: {
      marginBottom: 8,
    },
    cardTitle: {
      marginTop: 4,
      fontSize: 20,
      fontWeight: "600",
      color: "#1a202c",
    },
    form: {
      marginTop: 16,
    },
    inputGroup: {
      marginBottom: 16,
    },
    button: {
      marginTop: 16,
    },
    linkContainer: {
      marginTop: 16,
      alignItems: "center",
    },
    linkText: {
      color: "#3d007d",
      fontSize: 14,
      fontWeight:500,
    },
    termsText: {
      textAlign: "center",
      fontSize: 14,
      color: "#6b7280",
      marginTop: 16,
      fontWeight:500,
    },
  });

export default SignUp;