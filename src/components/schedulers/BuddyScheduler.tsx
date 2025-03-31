import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useState } from "react";
import useVisitData from "../../hooks/use-visits";
import { useAppSelector } from "../../store/hooks";
import Button from "../ui/button";
import RenderScheduler from "./RenderScheduler";
import { changeDateFormat } from "./CareManagerScheduler";


const BuddyScheduler = () => {
    const [showBuddy, setShowBuddy] = useState(false);
    const {username} = useAppSelector((state) => state.auth);
    const visitData = useVisitData(username);
    

  return (
    <>
        {!showBuddy ? (
            <View style={styles.container}>
                <Text style={styles.h3text}>Next Scheduled Visit</Text>
                {visitData  && visitData["buddy"] ? (
                  <Text style={styles.ptext}>{changeDateFormat(visitData["buddy"].scheduled_datetime)}</Text>
                ):(
                  <Text style={styles.ptext}>No scheduled visit</Text>
                )}
                <Button onPress={() => setShowBuddy(!showBuddy)} style={{maxWidth: "50%"}} variant="outline">Reschedule</Button>
            </View>
        ): <RenderScheduler type="buddy" showVisitType={showBuddy} setshowVisitType={setShowBuddy} />
        }
    </>
  );
}

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
export default BuddyScheduler;