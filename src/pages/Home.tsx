import React, { act } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView, Dimensions, Linking, Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomNav from "../components/NavBar";
import HealthMetricCard from "../components/HealthMetricCard";
import { UserPen } from "lucide-react-native";
import ContactCareMangerCard from "../components/ContactCareManagerCard";
import { HealthStatusCard } from "../components/HealthStatusCard";
import ConnectGoogleFitCard from "../components/ConnectGoogleFitCard";
import { useHourlyGoogleFitData } from '../hooks/Google-Fit/use-HourlyData';
import { useWeeklyGoogleFitData } from '../hooks/Google-Fit/use-WeeklyData';
import { useState, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { Tab,TabView } from "@rneui/themed";
import PrimaryVitals from "../components/PrimaryVitals";
import AdditionalMetrics from "../components/AdditionalMetrics";
import SetDataSourceCard from "../components/SetDataSourceCard";
import GoogleFitDialog from "../components/GoogleFitDialog";
// Data source types
export type DataSource = 'doctor' | 'googlefit';
// Time period types
export type TimePeriod = 'Week' | 'Day';

const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const {username} = useAppSelector((state) => state.auth);

    const [dataSource, setDataSource] = useState<DataSource>('doctor');
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('Week');
    const [isGoogleFitConnected, setIsGoogleFitConnected] = useState(false);
    const [isGoogleFitDialogOpen, setIsGoogleFitDialogOpen] = useState(false);
    const [dataTab, setDataTab] = useState<'primary' | 'additional'>('primary');
    const {weeklydata}  = useWeeklyGoogleFitData();
    const {Hourlydata} = useHourlyGoogleFitData();
    console.log("Hourly Data", Hourlydata);

  // This would come from an actual API in a real app
  const lastSyncTime = new Date();


  useEffect(() => {
    const checkGoogleFitConnection = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/google-fit/refresh/?user_name=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsGoogleFitConnected(true);
          console.log("✅ Google Fit connected successfully.");
        } else {
          setIsGoogleFitConnected(false);
          console.log("⚠️ Google Fit connection failed.");
        }
      } catch (error) {
        console.error("❌ Error checking Google Fit connection:", error);
        setIsGoogleFitConnected(false);
      }
    };

    checkGoogleFitConnection();
  }, []);

  const handleConnectGoogleFit = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/google-fit/auth?user_name=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
  
        if (data.auth_url) {
          // Open the Google Fit auth URL in the browser
          Linking.openURL(data.auth_url);
        } else {
          console.log(
            "title: Error Connecting Google Fit, description: Auth URL not received, variant: destructive"
          );
        }
      } else {
        console.log("Error Connecting Google Fit");
      }
    } catch (error) {
      console.error("Error connecting Google Fit:", error);
    }
  };

  const handleDeepLink = (event: { url: string }) => {
    const { url } = event;
    if (url.includes("success")) {
      setIsGoogleFitConnected(true);
      Alert.alert("Success", "Google Fit connected successfully!");
    }
  };
  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Check if app was opened via deep link on startup
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      subscription.remove();
    };
  }, []);

    // Estimate BottomNav height (adjust this to match your actual BottomNav height)
    const BOTTOM_NAV_HEIGHT = 60; 
    const HEADER_HEIGHT = 50; // Adjust based on your Header's actual height

    // Calculate available screen height
    const screenHeight = Dimensions.get('window').height;
    const availableHeight = screenHeight - HEADER_HEIGHT - BOTTOM_NAV_HEIGHT;
    const [index, setIndex] = React.useState(0);
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={[styles.scrollContainer, { height: availableHeight }]}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    style={styles.scrollView}
                    nestedScrollEnabled
                >
                    <HealthStatusCard status_message="Your health metrics are in danger range" next_checkup_date="2025-04-01" />
                    <ConnectGoogleFitCard isGoogleFitConnected={isGoogleFitConnected} lastSyncTime={lastSyncTime} setIsGoogleFitDialogOpen={setIsGoogleFitDialogOpen} />
                    <GoogleFitDialog isGoogleFitConnected={isGoogleFitConnected} isGoogleFitDialogOpen={isGoogleFitDialogOpen} setIsGoogleFitDialogOpen={setIsGoogleFitDialogOpen} handleConnectGoogleFit={handleConnectGoogleFit}/>
                    <SetDataSourceCard setDataSource={setDataSource} isGoogleFitConnected={isGoogleFitConnected} dataSource={dataSource} timPeriod={timePeriod} setTimePeriod={setTimePeriod}/>
                      <Tab
                        value={index}
                        onChange={(e) => setIndex(e)}
                        disableIndicator={true}
                        
                        >
                          <Tab.Item 
                            title="Primary Vitals"
                            titleStyle={index == 0 ? styles.activeText: styles.inactiveText}
                            buttonStyle={index == 0 ? {backgroundColor: "white", borderRadius:8, paddingHorizontal:0, paddingVertical:0} :{paddingHorizontal:0,paddingVertical:0}}
                            containerStyle={{ flex: 0 }} 
                            />
                          <Tab.Item 
                            title="Additional Metrics" 
                            titleStyle={index == 1 ? styles.activeText: styles.inactiveText}
                            buttonStyle={index == 1 ? {backgroundColor: "white", borderRadius:8,paddingHorizontal:0,paddingVertical:0} :{paddingHorizontal:0,paddingVertical:0}}
                            containerStyle={{ flex: 0 }}
                            />
                            
                      </Tab>
                      {/* <TabView value={index} onChange={setIndex} animationType="spring">
                        {[
                          <TabView.Item key={0} style={{ width: "100%", height: 1000}}>
                                  <PrimaryVitals />     
                          </TabView.Item>,

                          <TabView.Item key={1} style={{ width: "100%", backgroundColor:"red", minHeight: 300}}>
                              
                          </TabView.Item>,
                        ]}
                      </TabView> */}
                {timePeriod == "Week" ? (<PrimaryVitals trendData={weeklydata}/>) : (<PrimaryVitals trendData={Hourlydata}/>)}
                <ContactCareMangerCard />       
                </ScrollView>
               
            </View>
            <BottomNav />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f3f7r"
    },
    scrollContainer: {
        width: '100%',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 16,
        gap: 10,
    },
    activeText:{
      color:"#020817",
      fontSize: 14,
    },
    inactiveText: {
      color:"#76768b",
      fontSize: 14,
    },
    activeButton:{
      backgroundColor:"white",
    },
    inactiveButton:{
      backgroundColor:"#f4f3f7r"
    }
});

export default HomeScreen;