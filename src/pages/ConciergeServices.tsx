
import React from "react";
import { View, Text , TouchableOpacity, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomNav from "../components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { TicketHistory } from "../components/TickerHistory";
import ServicesGrid from "../components/ServicesGrid";

const ConciergeServicesScreen = () => {
    const navigation = useNavigation<any>();
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.sectionContainer}>
                    <View style={styles.servicesGridContainer}>
                        <ServicesGrid />
                    </View>
                    <View style={styles.ticketHistoryContainer}>
                        <TicketHistory />
                    </View>
                </View>
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
        padding: 16,
      },
      sectionContainer: {
        flex: 1, // Ensure it takes the full available space
    },
      servicesGridContainer: {
        flex: 0.1, // Takes 30% of the available height
    },
    ticketHistoryContainer: {
        flex: 0.8, // Takes 70% of the available height
    },
});

export default ConciergeServicesScreen;