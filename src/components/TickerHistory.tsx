import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useTickets from "../hooks/use-tickets";
import { useState } from "react";
import { Car } from "lucide-react-native";
import { StyleSheet, View, ScrollView, Text} from "react-native";
import Button from "./ui/button";

const changeDateFormat = (date: string): string => {
    const eventDate = new Date(date);
    const datePart = eventDate.toISOString().split('T')[0];
    const timePart = eventDate.toISOString().split('T')[1].split(':').slice(0, 2).join(':');
    return datePart + " " +  timePart;
  }

export const TicketHistory = () => {
    const { tickets } = useTickets();
    // console.log(tickets);
    const [showActive, setShowActive] = useState(true);

    const filteredTickets = tickets
    .filter(ticket => showActive ? ticket.status === 'OPEN' : ticket.status === 'CLOSED')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <>
            <Card>
                <CardHeader style={styles.headerContainer}>
                    <CardTitle style={{fontWeight: 600, fontSize: 20}}>Support Tickets</CardTitle>
                    <View style={{flexDirection: 'row', gap: 8}}>
                        <Button
                        variant={showActive ? "default" : "outline"}
                        onPress={() => setShowActive(true)}
                        size="sm"
                        style={{}}
                        >
                        Active
                        </Button>
                        <Button
                            variant={!showActive ? "default" : "outline"}
                            onPress={() => setShowActive(false)}
                            size="sm"
                        >
                            Inactive
                        </Button>
                    </View>
                </CardHeader>
                <CardContent>
                <ScrollView style={styles.scrollContainer}>
      {filteredTickets.length === 0 ? (
        <View style={styles.noTicketsContainer}>
          <Text style={styles.noTicketsText}>No {showActive ? 'active' : 'inactive'} tickets found</Text>
        </View>
      ) : (
        filteredTickets.map((ticket) => (
          <View key={ticket.id} style={styles.ticketContainer}>
            <View style={styles.ticketHeader}>
              <View style={styles.ticketInfoContainer}>
                <View style={styles.ticketTitleRow}>
                  <Text style={styles.ticketTitle}>{ticket.title}</Text>
                  <Text style={styles.ticketId}>#{ticket.id}</Text>
                </View>
                <View style={styles.ticketDateRow}>
                  <Text style={styles.ticketDate}>
                    {changeDateFormat(ticket.date)}
                  </Text>
                </View>
              </View>
              <Text 
                style={[
                  styles.statusBadge, 
                  ticket.status === 'OPEN' ? styles.openStatus : styles.closedStatus
                ]}
              >
                {ticket.status}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
                </CardContent>
            </Card>
        </>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row', // This arranges items horizontally
        justifyContent: 'space-between', // Adds space between items
        alignItems: 'center',
        padding: 10,
    },
    scrollContainer: {
      height: 200,
      paddingRight: 0,
    },
    noTicketsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 32
    },
    noTicketsText: {
      textAlign: 'center',
      fontSize: 14,
      color: 'gray'
    },
    ticketContainer: {
      marginBottom: 16,
      padding: 8,
      borderWidth: 0.3,
      borderRadius: 8,
      backgroundColor: 'white'
    },
    ticketHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    ticketInfoContainer: {
      gap: 4
    },
    ticketTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
    ticketTitle: {
      fontWeight: '500',
      fontSize: 14,
      flexShrink: 1
    },
    ticketId: {
      fontSize: 12,
      color: 'gray'
    },
    ticketDateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
    ticketDate: {
      fontSize: 12,
      color: 'gray'
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        fontSize: 12,
        
    },
    openStatus: {
      backgroundColor: '#6b0f8b',
      color: 'white'
    },
    closedStatus: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'gray',
      fontWeight: 500,
    }
  });