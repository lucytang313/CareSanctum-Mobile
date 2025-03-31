import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { useAppSelector, useAppDispatch } from "./src/store/hooks";
import { setCredentials } from "./src/store/slices/authSlice";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./src/pages/SignIn";
import SignUp from "./src/pages/SignUp";
import HomeScreen from "./src/pages/Home";
import CommunityEventsScreen from "./src/pages/CommunityEvents";
import ConciergeServicesScreen from "./src/pages/ConciergeServices";
import HealthRecordsScreen from "./src/pages/HealthRecords";
import SchedulerScreen from "./src/pages/Scheduler";
import ProfileScreen from "./src/pages/Profile";
import OnboardingScreen from "./src/pages/Onboarding";
import * as SecureStore from "expo-secure-store";


// Create different types of stacks
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

// Auth Stack Navigator
const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
    <AuthStack.Screen name="Login" component={SignIn} />
    <AuthStack.Screen name="Signup" component={SignUp} />
  </AuthStack.Navigator>
);

// Main Stack Navigator
const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }} id={undefined}>
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen name="Concierge-Services" component={ConciergeServicesScreen} />
    <MainStack.Screen name="Community-Events" component={CommunityEventsScreen} />
    <MainStack.Screen name="Health-Records" component={HealthRecordsScreen} />
    <MainStack.Screen name="Scheduler" component={SchedulerScreen} />
    <MainStack.Screen name="Profile" component={ProfileScreen} />
    <MainStack.Screen name="Onboarding" component={OnboardingScreen} />
  </MainStack.Navigator>
);

// Root Navigator (Controls Switching)
const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const username = await SecureStore.getItemAsync("username");

      if (accessToken && username) {
        dispatch(setCredentials({ accessToken, username }));
      }
      console.log(accessToken, isAuthenticated);
      setLoading(false);
    };

    checkAuthStatus();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <RootStack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Main" : "Auth"}
      id={undefined}
    >
      <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      <RootStack.Screen name="Main" component={MainStackNavigator} />
    </RootStack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}