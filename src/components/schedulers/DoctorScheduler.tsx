import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useState } from "react";
import useVisitData from "../../hooks/use-visits";
import { useAppSelector } from "../../store/hooks";
import Button from "../ui/button";
import RenderScheduler from "./RenderScheduler";
import { changeDateFormat } from "./CareManagerScheduler";
import { BetweenVerticalEnd, VideoIcon } from "lucide-react-native";

const DoctorScheduler = () => {
    const [showDoctor, setShowDoctor] = useState(false);
    const {username} = useAppSelector((state) => state.auth);
    const visitData = useVisitData(username);

    const handleJoinMeet = (fileurl:string) => {
        window.open(fileurl, "_blank"); // Opens PDF in a new tab
    }
    
    return (
        <>
        {!showDoctor ? (
            <View style={styles.container}>
                <Text style={styles.h3text}>Next Teleconsultation</Text>
                {visitData  && visitData["doctor"] ? (
                  <Text style={styles.ptext}>{changeDateFormat(visitData["doctor"].scheduled_datetime)}</Text>
                ):(
                  <Text style={styles.ptext}>No scheduled visit</Text>
                )}
                <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 8 }}>
                    <Button 
                        onPress={() => setShowDoctor(!showDoctor)} 
                        style={{ maxWidth: "50%", marginRight: 8 }} 
                        variant="outline"
                    >
                        Reschedule
                    </Button>
                    <Button  
                        disabled={!visitData || !visitData["doctor"]} 
                        onPress={() => handleJoinMeet(visitData ? visitData["doctor"].gmeet_link : "")} 
                        style={{ maxWidth: "50%" }}
                    >
                        <VideoIcon size={16} color="white" />
                        <Text style={{color: "white"}}>Join Session</Text>
                    </Button>
                </View>
            </View>
        ): <RenderScheduler type="doctor" showVisitType={showDoctor} setshowVisitType={setShowDoctor} />
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
export default DoctorScheduler;