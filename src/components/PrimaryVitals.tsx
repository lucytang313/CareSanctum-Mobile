import { View } from "react-native";
import HealthMetricCard from "./HealthMetricCard";
import ContactCareMangerCard from "./ContactCareManagerCard";
import { Heart, Activity, Wind, Thermometer } from "lucide-react-native";
import { HourlyData } from "../hooks/Google-Fit/use-HourlyData";
import { WeeklyData } from "../hooks/Google-Fit/use-WeeklyData";
interface PrimaryVitalsProps {
    // HeartRate: number;
    // BloodPressure: string;
    // RespiratoryRate: number;
    // Temperature:number;
    // checked_at:string;
    trendData:  HourlyData | WeeklyData
  }
const PrimaryVitals = ({trendData}: PrimaryVitalsProps) => {
    return (
        <View style={{gap: 10}}>
            <HealthMetricCard title="Heart Rate" value="72 BPM" Icon={Heart} lastChecked="16/03/2025" trendData={trendData?.step_count} />
            <HealthMetricCard title="Blood Pressure" value="120/80 mmHg" Icon={Activity} lastChecked="16/03/2025" trendData={trendData?.step_count}/>
            <HealthMetricCard title="Respiratory Rate" value="40 BPM" Icon={Wind} lastChecked="16/03/2025" trendData={trendData?.step_count}/>
            <HealthMetricCard title="Temperature" value="36°C" Icon={Thermometer} lastChecked="16/03/2025" trendData={trendData?.step_count}/>
            
        </View>
    )
}
export default PrimaryVitals;