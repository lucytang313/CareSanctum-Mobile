import { View } from "react-native";
import HealthMetricCard from "./HealthMetricCard";
import { Droplets, Activity, Scale, Moon, Brain, Gauge } from 'lucide-react-native';
const AdditionalMetrics = () => {
    return (
        <View style={{gap:10}}>
            <HealthMetricCard title="Blood Sugar" value="72 BPM" Icon={Droplets} lastChecked="16/03/2025" />
            <HealthMetricCard title="ECG" value="120/80 mmHg" Icon={Activity} lastChecked="16/03/2025"/>
            <HealthMetricCard title="BMI" value="40 BPM" Icon={Scale} lastChecked="16/03/2025"/>
            <HealthMetricCard title="Sleep Level" value="36°C" Icon={Moon} lastChecked="16/03/2025"/>
            <HealthMetricCard title="Stress Level" value="40 BPM" Icon={Brain} lastChecked="16/03/2025"/>
            <HealthMetricCard title="Blood Oxygen" value="40 BPM" Icon={Gauge} lastChecked="16/03/2025"/>
        </View>
    )
}

export default AdditionalMetrics;