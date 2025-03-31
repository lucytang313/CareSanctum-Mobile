import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Phone } from "lucide-react-native";

interface EmergencyContactCardProps {
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
      neighborName?: string;
      neighborPhone?: string;
    };
  }

  const EmergencyContactCard = ({
    emergencyContact,
  }: EmergencyContactCardProps) => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768; // Equivalent to md:grid-cols-2
    return (
      <Card style={{width: "90%", marginTop: 8}}>
            <CardHeader>
                <CardTitle >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Phone color={"black"} size={18} />
                    <Text style={{fontSize: 16, fontWeight: 500}}>Emergency Contacts</Text>
                </View>
                </CardTitle>
            </CardHeader>
        <CardContent style={{marginTop: 8}}>
          <View style={[styles.gridContainer, isLargeScreen && styles.gridTwoColumns]}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Next of Kin</Text>
              <Text style={styles.value}>{emergencyContact.name}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Contact Number</Text>
              <Text style={styles.value}>{emergencyContact.phone}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Relationship</Text>
              <Text style={styles.value}>{emergencyContact.relationship}</Text>
            </View>
          </View>
  
          {emergencyContact.neighborName || emergencyContact.neighborPhone ? (
            <View>
              <Text>Neighbor Contact</Text>
              <View>
                
                <View style={styles.gridItem}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.value}>{emergencyContact.neighborName}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.label}>Contact Number</Text>
                  <Text style={styles.value}>{emergencyContact.neighborPhone}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </CardContent>
      </Card>
    );
  };
  
  const styles = StyleSheet.create({
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
    },
    gridTwoColumns: {
      justifyContent: "space-between", // For two-column layout
    },
    gridItem: {
      width: "100%", // Default to full width
    },
    fullWidth: {
      width: "100%", // Forces full width for items like Email, Address, Id Proof
    },
    label: {
      fontSize: 12,
      color: "#6b7280", // Equivalent to text-gray-500
    },
    value: {
      fontSize: 16,
      fontWeight: "500",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    buttonText: {
      marginLeft: 8,
      color: "#111827", // Equivalent to text-gray-900
    },
  });
  
  export default EmergencyContactCard;