import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { X } from "lucide-react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../ui/button";
import { schedulevisitRequest } from "../../requests/ScheduleVisitRequest";
import { useAppSelector } from "../../store/hooks";
import { todayString } from "react-native-calendars/src/expandableCalendar/commons";

const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour time format
    });
  };

const RenderScheduler = ({
    type,
    showVisitType,
    setshowVisitType,
}: {
    type: "care_manager" | "doctor" | "buddy";
    showVisitType: boolean;
    setshowVisitType: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [time, setTime] = useState<Date | null>(null);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const {username} = useAppSelector((state) => state.auth);

    const onChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
          setTime(selectedTime);
        }
      };

    const handleschedule =  async (visit_type: 'buddy' | 'care_manager' | 'doctor') => {

        if(time){
            const scheduledDateTime = selectedDate + "T" + formatTime(time);
            const response = await schedulevisitRequest(username, visit_type, scheduledDateTime);
            console.log(response);
            setshowVisitType(false);
            setSelectedDate("");
            setTime(null);
        }
        else{
            alert("Please select time slot");
        }
    }

    console.log("Vist Type state:", showVisitType); // Debugging log

    return (
        <View style={{ marginTop: 8 }}>
            {/* Always render, but hide parts based on showCareManager */}
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 8 }}>
                <TouchableOpacity onPress={() => setshowVisitType(false)}>
                    <X size={28} color={"black"} />
                </TouchableOpacity>
            </View>

            {/* Render Calendar only if showCareManager is true */}
            {showVisitType && (
                <>
                <Calendar
                    onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: "#0a1647",
                        },
                    }}
                    theme={{
                        todayTextColor: "#FF69B4",
                        arrowColor: "#FF69B4"
                    }}
                />
                <View style={{ marginTop: 8 }}>
                <Text style={{fontWeight: 500, fontSize: 14}}>Select Time Slot {type === 'care_manager' ? '(30 minutes)' : type === 'doctor' ? '(15 minutes)' : '(4 hours)'}</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                {showTimePicker && (
                    <DateTimePicker
                        value={time || new Date()}
                        mode="time"
                        display="default"
                        onChange={onChange}
                    />
                )}
                    <TextInput
                        style={{borderWidth: 0.4,borderRadius: 5, marginTop: 8}}
                        value={time ? time.toLocaleTimeString() : ''}
                        editable={false}
                        placeholder="Select time"
                    />
                </TouchableOpacity>
                <Button 
                style={{marginTop: 8}}
                disabled={!selectedDate || !time}
                onPress={() => handleschedule(type)}>
                    <Text style={{color: "white"}}>Schedule {type === 'buddy' ? 'Buddy Visit' : type === 'care_manager' ? 'Care Manager Appointment' : 'Doctor Appointment'}</Text>
                </Button>
                </View>
                </>
                
            )}
        </View>
    );
};

export default RenderScheduler;