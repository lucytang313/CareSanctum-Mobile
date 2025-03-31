import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Activity } from "lucide-react-native";

interface LifestyleProps {
    lifestyle: {
      activityLevel: string;
      dietPreference: string;
      specialNeeds: {
        mobilityAssistance: boolean;
        visionImpairment: boolean;
        hearingImpairment: boolean;
      };
    };
  }

export const LifestyleCard = ({ lifestyle }: LifestyleProps) => {
        const { width } = useWindowDimensions();
        const isLargeScreen = width >= 768; // Equivalent to md:grid-cols-2
        return (
            <Card style={{width: "90%", marginTop: 8}}>
                  <CardHeader>
                      <CardTitle >
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                          <Activity color={"black"} size={18} />
                          <Text style={{fontSize: 16, fontWeight: 500}}>LifeStyle & Special Needs</Text>
                      </View>
                      </CardTitle>
                  </CardHeader>
              <CardContent style={{marginTop: 8}}>
                <View style={[styles.gridContainer, isLargeScreen && styles.gridTwoColumns]}>
                  <View style={styles.gridItem}>
                    <Text style={styles.label}>Activity Level</Text>
                    <Text style={styles.value}>{lifestyle.activityLevel}</Text>
                  </View>
                  <View style={styles.gridItem}>
                    <Text style={styles.label}>Diet Preference</Text>
                    <Text style={styles.value}>{lifestyle.dietPreference}</Text>
                  </View>
                  <View style={styles.gridItem}>
                    <Text style={styles.label}>Special Needs</Text>
                    {lifestyle.specialNeeds.mobilityAssistance && <Text style={styles.value}>Requires mobility assistance</Text>}
                    {lifestyle.specialNeeds.visionImpairment && <Text style={styles.value}>Has vision impairment</Text>}
                    {lifestyle.specialNeeds.hearingImpairment && <Text style={styles.value}>Has hearing impairment</Text>}
                  </View>
                </View>
                
              </CardContent>
            </Card>
          );
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