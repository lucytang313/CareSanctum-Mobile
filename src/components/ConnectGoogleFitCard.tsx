import { Text, View, StyleSheet } from "react-native";
import { Card, CardContent } from "./ui/card";
import { Smartphone } from "lucide-react-native";
import { format } from 'date-fns';
import Button from "./ui/button";
import React from "react";

interface GoogleFitConnectCardProps {
    isGoogleFitConnected: boolean, 
    lastSyncTime: Date, 
    setIsGoogleFitDialogOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const ConnectGoogleFitCard =  ({isGoogleFitConnected, lastSyncTime, setIsGoogleFitDialogOpen} : GoogleFitConnectCardProps) => {
    return(
        <View>
            <Card>
                <CardContent>
                    <View style={styles.container}>
                        <Text style={styles.datasourceText}>Data Sources</Text>
                        <View >
                            {isGoogleFitConnected ? (
                                <>
                                    <View style={styles.IconTextCOntainer}>
                                        <Smartphone size={24} color="#16a34a" />
                                        <Text style={{color: "#16a34a"}}>Google Fit Connected</Text>
                                    </View>
                                    <Text style={styles.text}> Last synced: {format(lastSyncTime, 'MMM d, h:mm a')}</Text>
                                </>
                            ): (
                                <Button
                                    variant="outline"
                                    style={styles.notconnectedGoogleFitButton}
                                    onPress={() => setIsGoogleFitDialogOpen(true)}
                                >
                                    <Smartphone size={24} color={"black"} />
                                    <Text>Connect Google Fit</Text>
                                </Button>
                            )}
                        </View>
                    </View>
                </CardContent>
            </Card>            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        marginTop: 8,
        flexDirection: "column"
    },
    datasourceText: {
        fontSize: 18,
        fontWeight: 500,
    },
    buttonContainer: {
        display: "flex",
        gap: 8,
        alignItems: "center",
    },
    IconTextCOntainer: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        fontSize: 14, 
        color: "#16a34a"
    },
    text: {
        marginTop: 8,
        fontSize: 12,
        color: '#6b7280', // Equivalent to text-muted-foreground
      },
    notconnectedGoogleFitButton: {
        display: "flex",
        alignItems: "center"
    }

})

export default ConnectGoogleFitCard;