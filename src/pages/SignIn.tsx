import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import Button from '../components/ui/button';
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActionSheetIOS } from "react-native";
import { Logo } from '../components/Logo';
// import { toast } from "@/components/ui/use-toast";
import { setCredentials } from '../store/slices/authSlice';
import { useAppDispatch } from '../store/hooks';
import { useAppSelector } from '../store/hooks';
import * as SecureStore from 'expo-secure-store';

const SignIn = () => {
   const navigation = useNavigation<any>();
  const [identifier, setIdentifier] = useState(""); // Supports email or phone number
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector((state) => state.auth); 
  const goToSignUp = () => {
    navigation.navigate('Auth', { screen: 'Signup' });
    console.log("test");
  };
  

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const accessToken = data.access;
        const username = data.user_name;
        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("username", username);
        dispatch(setCredentials({accessToken, username}));
        console.log("accessToken: ", accessToken);
        console.log("username: ", username);
        navigation.navigate('Main', { screen: 'Home' });
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
    }
  };
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardHeader style={styles.cardHeader}>
          {/* Replace <Logo /> with your logo component or image */}
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <CardTitle style={styles.cardTitle}>Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Input
                placeholder="Email or Phone Number"
                value={identifier}
                onChangeText={setIdentifier}
                required
              />
            </View>
            <View style={styles.inputGroup}>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChangeText={setPassword}
                required
              />
              <TouchableOpacity onPress={() => console.log('Forgot Password pressed')}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <Button onPress={handleSubmit} style={styles.button}>
              Sign In
            </Button>
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={goToSignUp}>
              <Text style={styles.linkText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => console.log('Admin Login pressed')}>
              <Text style={styles.linkText}>Login as Internal Team</Text>
            </TouchableOpacity>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb', // Light gray background
  },
  card: {
    width: '90%', // Adjust width as needed
    maxWidth: 400, // Maximum width for larger screens
  },
  cardHeader: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c', // Dark gray text
  },
  cardTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: '#1a202c', // Dark gray text
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
    alignItems: 'center',
  },
  linkText: {
    color: "#3d007d",
    fontSize: 14,
    fontWeight:500,
    textAlign: 'right',
  },
});
export default SignIn;
