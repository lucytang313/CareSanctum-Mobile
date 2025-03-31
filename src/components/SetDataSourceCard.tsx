import { View, Text, StyleSheet } from "react-native";
import { Card, CardContent } from "./ui/card";
import Button from "./ui/button";
import { DataSource } from "../pages/Home";
import { TimePeriod } from "../pages/Home";
import { Smartphone, UserPen } from "lucide-react-native";
import React from "react";
interface SetDataSoruceCardProps {
    dataSource: DataSource,
    setDataSource:React.Dispatch<React.SetStateAction<DataSource>>
    isGoogleFitConnected: boolean
    timPeriod: TimePeriod
    setTimePeriod: React.Dispatch<React.SetStateAction<TimePeriod>>
}
const SetDataSourceCard = ({setDataSource, isGoogleFitConnected, dataSource, timPeriod, setTimePeriod}: SetDataSoruceCardProps) => {
    return (
        <View>
            <Card>
                <CardContent style={{padding: 16}}>
                    <View style={{display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "flex-start"}}>
                        <View style={{marginTop: 4}}>
                            <Text style={{fontSize: 14, fontWeight: 500, color: "#64748b"}}>Data Source</Text>
                            <View style={{display: "flex", gap: 8, flexDirection: "row", marginTop: 8}}>
                                <Button onPress={() => setDataSource("doctor")} style={[styles.buttonStyle, dataSource == "doctor" ? styles.activeButtonColor : styles.inactiveButtonColor]}>
                                    <UserPen size={16} color={dataSource == "doctor" ? "white" : "#0A1647"}/>
                                    <Text style={dataSource == "doctor" ? styles.activeChildrenColor : styles.inactiveChildrenColor}>Doctor Entered</Text>
                                </Button>
                                <Button  disabled={!isGoogleFitConnected}onPress={() => setDataSource('googlefit')} style={[styles.buttonStyle, dataSource == "googlefit" ? styles.activeButtonColor : styles.inactiveButtonColor]}>
                                    <Smartphone size={16} color={dataSource == "googlefit" ? "white" : "#0A1647"} />
                                    <Text style={dataSource == "googlefit" ? styles.activeChildrenColor : styles.inactiveChildrenColor}>Google Fit</Text>
                                </Button>
                            </View>
                        </View>
                        {dataSource == "googlefit" ? (
                            <View style={{marginTop: 4}}>
                                <Text style={{fontSize: 14, fontWeight: 500, color: "#64748b"}}>Time Period</Text>
                                <View style={{display: "flex", gap: 8, flexDirection: "row",marginTop: 8}}>
                                    <Button onPress={() => setTimePeriod('Week')} style={[styles.buttonStyle, timPeriod == "Week" ? styles.activeButtonColor : styles.inactiveButtonColor]}>
                                        <Text style={timPeriod == "Week" ? styles.activeChildrenColor : styles.inactiveChildrenColor}>Week</Text>
                                    </Button>
                                    <Button onPress={() => setTimePeriod("Day")} style={[styles.buttonStyle, timPeriod == "Day" ? styles.activeButtonColor : styles.inactiveButtonColor]}>
                                        <Text style={timPeriod == "Day" ? styles.activeChildrenColor : styles.inactiveChildrenColor}>Day</Text>
                                    </Button>
                                </View>
                            </View>
                        ): (<></>)}

                    </View>
                </CardContent>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        paddingTop: 4, 
        paddingBottom: 4, 
        paddingLeft: 12, 
        paddingRight: 12,
        gap: 4,
        alignItems: "center",
        borderRadius: 6,
        height: 28,
    },
    activeButtonColor:{
        backgroundColor: "#0A1647"
    },
    inactiveButtonColor:{
        backgroundColor: "#f1f5f9"
    },
    activeChildrenColor:{
        color: "white",
    },
    inactiveChildrenColor:{
        color: "#0A1647"
    }
})
export default SetDataSourceCard;