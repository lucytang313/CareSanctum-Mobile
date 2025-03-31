
import React from "react";
import { View, Text , TouchableOpacity, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Tab, TabView } from "@rneui/themed";
import Header from "../components/Header";
import BottomNav from "../components/NavBar";
import PrescriptionManager from "../components/PrescriptionManager";
import LabReportManager from "../components/LabReportManager";
import MedicineManager from "../components/MedicineManager";

import { useState } from "react";


const HealthRecordsScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <SafeAreaView style={styles.container}>
          <Header />
          <ScrollView contentContainerStyle={styles.scrollContent}>
                  <Tab value={selectedIndex} onChange={setSelectedIndex} disableIndicator indicatorStyle={styles.indicator} buttonStyle={{backgroundColor: "#f1f5f9"}}>
                    <Tab.Item
                      title="Prescriptions"
                      titleStyle={selectedIndex === 0 ? styles.activeText : styles.tabText}
                      buttonStyle={selectedIndex === 0 ? {backgroundColor: "white"}: {backgroundColor: "#f1f5f9"}}
                      containerStyle={{flex: 0}}
                    />
                    <Tab.Item
                      title="Lab Reports"
                      titleStyle={selectedIndex === 1 ? styles.activeText : styles.tabText}
                      buttonStyle={selectedIndex === 1 ? {backgroundColor: "white"}: {backgroundColor: "#f1f5f9"}}
                      containerStyle={{flex: 0}}
                    />
                    <Tab.Item
                      title="Medicines"
                      titleStyle={selectedIndex === 2 ? styles.activeText : styles.tabText}
                      buttonStyle={selectedIndex === 2 ? {backgroundColor: "white"}: {backgroundColor: "#f1f5f9"}}
                      containerStyle={{flex: 0}}
                    />
                  </Tab>

                  <TabView value={selectedIndex} onChange={setSelectedIndex} animationType="spring">
                      {[ 
                      <TabView.Item key={0} style={[styles.tabContent]}>
                        <PrescriptionManager />
                      </TabView.Item>,

                      <TabView.Item key={1} style={styles.tabContent}>
                        <LabReportManager />
                      </TabView.Item>,
                      <TabView.Item key={2} style={styles.tabContent}>
                        <MedicineManager />
                      </TabView.Item>
                      ]}
                  </TabView>
          </ScrollView>
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
      indicator: {
        backgroundColor: "#000",
        height: 2,
      },
      tabText: {
        color: "#888",
        fontSize: 14,
      },

      activeText: {
        color: "#000",
        fontSize: 14,
      },
      tabContent: {
        width: "100%",
        paddingHorizontal: 8,
        paddingBottom: 16,
      },
});

export default HealthRecordsScreen;