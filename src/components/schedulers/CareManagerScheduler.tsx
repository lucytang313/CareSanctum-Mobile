import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useState } from "react";
import useVisitData from "../../hooks/use-visits";
import { useAppSelector } from "../../store/hooks";
import Button from "../ui/button";
import RenderScheduler from "./RenderScheduler";

export const changeDateFormat = (date: string): string => {
    const eventDate = new Date(date);
    const datePart = eventDate.toLocaleDateString();
    const timePart = eventDate.toLocaleTimeString();
    return datePart + " " +  timePart;
}

const CareManagerScheduler = () => {
    const [showCareManager, setShowCareManager] = useState(false);
    const {username} = useAppSelector((state) => state.auth);
    const visitData = useVisitData(username);
    

  return (
    <>
        {!showCareManager ? (
            <View style={styles.container}>
                <Text style={styles.h3text}>Next Scheduled Visit</Text>
                {visitData  && visitData["care_manager"] ? (
                  <Text style={styles.ptext}>{changeDateFormat(visitData["care_manager"].scheduled_datetime)}</Text>
                ):(
                  <Text style={styles.ptext}>No scheduled visit</Text>
                )}
                <Button onPress={() => setShowCareManager(!showCareManager)} style={{maxWidth: "50%"}} variant="outline">Reschedule</Button>
            </View>
        ): <RenderScheduler type="care_manager" showVisitType={showCareManager} setshowVisitType={setShowCareManager} />
        }
    </>
  );
};
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f9fafb",
        borderRadius: 8,
    },
    h3text: {
        fontSize: 18.72,
        fontWeight: 500,
        marginBottom: 8,
    },
    ptext: {
        fontSize: 14,
        color: "#4b5563",
        marginBottom: 8,
    }
});
export default CareManagerScheduler;