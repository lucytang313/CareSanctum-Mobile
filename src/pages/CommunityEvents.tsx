import React from "react";
import { View, Text , TouchableOpacity, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import BottomNav from "../components/NavBar";
import useEvents from "../hooks/use-events";
import { useAppSelector } from "../store/hooks";
import { registereventRequest } from "../requests/RegisterForEventRequest";
import { Car } from "lucide-react-native";
import Button from "../components/ui/button";

const changeDateFormat = (date: string): string => {
    const eventDate = new Date(date);
    const datePart = eventDate.toISOString().split('T')[0];
    const timePart = eventDate.toISOString().split('T')[1].split(':').slice(0, 2).join(':');
    return datePart + " " +  timePart;
  }

const CommunityEventsScreen = () => {
    const navigation = useNavigation<any>();
    const {events} = useEvents();
    const {username} = useAppSelector((state) => state.auth);
  
    const handleRegister = async (eventId: string) => {
      const response = await registereventRequest(username, eventId);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Card style={styles.card}>
                    <CardHeader style={{paddingTop: 0}}>
                        <CardTitle style={styles.cardTitle}>Community Events</CardTitle>
                    </CardHeader>
                    <CardContent style={{flex: 1}}>
                        <ScrollView style={styles.scrollView}>
                        {events.map((event) => (
                            <View key={event.id} style={styles.eventContainer}>
                            <View style={styles.eventHeader}>
                                <View>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text style={styles.eventLocation}>{event.location}</Text>
                                <Text style={styles.eventDate}>{changeDateFormat(event.date)}</Text>
                                </View>
                            </View>
                            <Button onPress={() => handleRegister(event.id)}>Register</Button>
                            </View>
                        ))}
                        </ScrollView>
                    </CardContent>
                </Card>
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
        paddingRight: 16,
        flex: 1,
      },
      eventContainer: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#ddd",
      },
      eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      eventTitle: {
        fontSize: 18,
        fontWeight: '500',
      },
      eventLocation: {
        fontSize: 14,
        color: '#64748b', // Muted text color for location
      },
      eventDate: {
        fontSize: 14,
        color: '#64748b', // Muted text color for date
      },
      registerButton: {
        marginTop: 8,
        backgroundColor: '#0A1647', // Primary color
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
      },
      registerButtonText: {
        color: 'white',
        fontWeight: '600',
      },
});

export default CommunityEventsScreen;