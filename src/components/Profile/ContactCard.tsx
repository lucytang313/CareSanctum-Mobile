import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import { Phone } from "lucide-react-native";

interface ContactProps {
    contact: {
      phone: string;
      altPhone: string;
      email: string;
      address: string;
      pincode: string;
      idProofUrl: string;
    };
  }

  export const ContactCard = ({ contact }: ContactProps) => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768; // Equivalent to md:grid-cols-2
    const complete_address = contact.address + "," + " - " + contact.pincode;
    return(
        <Card style={{width: "90%", marginTop: 8}}>
            <CardHeader>
                <CardTitle >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Phone color={"black"} size={18} />
                    <Text style={{fontSize: 16, fontWeight: 500}}>Contact Information</Text>
                </View>
                </CardTitle>
            </CardHeader>
            <CardContent style={{marginTop: 8}}>
            <View style={[styles.gridContainer, isLargeScreen && styles.gridTwoColumns]}>
            <View style={styles.gridItem}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{contact.phone}</Text>
            </View>
            <View style={styles.gridItem}>
                <Text style={styles.label}>Alternative Phone</Text>
                <Text style={styles.value}>{contact.altPhone}</Text>
            </View>
            <View style={[styles.gridItem, styles.fullWidth]}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{contact.email}</Text>
            </View>
            <View style={[styles.gridItem, styles.fullWidth]}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{contact.address && contact.pincode ? complete_address : ""}</Text>
            </View>
            </View>
            </CardContent>
        </Card>
    )
  }

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