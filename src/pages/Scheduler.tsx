
import React, {useState} from "react";
import { View, Text , TouchableOpacity, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomNav from "../components/NavBar";
import { Tab, TabView } from "@rneui/themed";
import { Bot } from "lucide-react-native";
import CareManagerScheduler from "../components/schedulers/CareManagerScheduler";
import DoctorScheduler from "../components/schedulers/DoctorScheduler";
import BuddyScheduler from "../components/schedulers/BuddyScheduler";

const SchedulerScreen = () => {
    const navigation = useNavigation<any>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <SafeAreaView style={styles.container}>
          <Header />
          <ScrollView contentContainerStyle={styles.scrollContent}>
                  <Tab value={selectedIndex} onChange={setSelectedIndex} disableIndicator buttonStyle={{backgroundColor: "#f1f5f9"}}>
                    <Tab.Item
                      title="Care Manager"
                      titleStyle={selectedIndex === 0 ? styles.activeText : styles.inactiveText}
                      buttonStyle={selectedIndex === 0 ? {backgroundColor: "white"}: {backgroundColor: "#f1f5f9"}}
                      containerStyle={{flex: 0}}
                    />
                    <Tab.Item
                      title="Doctor"
                      titleStyle={selectedIndex === 1 ? styles.activeText : styles.inactiveText}
                      buttonStyle={selectedIndex === 1 ? {backgroundColor: "white"} : {backgroundColor: "#f1f5f9"}}
                      containerStyle={{flex: 1}}
                    />
                    <Tab.Item
                      title="Buddy "
                      titleStyle={selectedIndex === 2 ? styles.activeText : styles.inactiveText}
                      buttonStyle={selectedIndex === 2 ? {backgroundColor: "white"} : {backgroundColor: "#f1f5f9"}}
                      containerStyle={{flex: 1}}
                    />
                  </Tab>

                  <TabView value={selectedIndex} onChange={setSelectedIndex} animationType="spring">
                      {[ 
                      <TabView.Item key={0} style={[styles.tabContent]}>
                        <CareManagerScheduler />
                      </TabView.Item>,

                      <TabView.Item key={1} style={styles.tabContent}>
                        <DoctorScheduler />
                      </TabView.Item>,
                      <TabView.Item key={2} style={styles.tabContent}>
                        <BuddyScheduler />
                      </TabView.Item>
                      ]}
                  </TabView>
          </ScrollView>
          <BottomNav />
      </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        
    },
    scrollContent: {
        flexGrow: 1,
      },
      card: {
        flex: 1, // Ensures card takes full height within ScrollView
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        elevation: 3, // Adds shadow for Android
      },
      cardTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#0a1647', // Primary color for title
      },
      scrollView: {
        height: 300,
        flex: 1,
        width: "100%",
      },
      activeText:{
        color:"#020817",
        fontSize: 14,
      },
      inactiveText: {
        color:"#76768b",
        fontSize: 14,
      },
      tabContent: {
        width: "100%",
        paddingHorizontal: 8,
        paddingBottom: 16,
      },
});


export default SchedulerScreen;