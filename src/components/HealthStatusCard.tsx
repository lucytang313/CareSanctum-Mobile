import { LinearGradient } from 'expo-linear-gradient';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Text } from 'react-native';

interface HealthStatusCardProps {
    status_message: string;
    next_checkup_date: string;
  }

export const HealthStatusCard = ({status_message,next_checkup_date}: HealthStatusCardProps ) => {
    return (
      <Card >
        <LinearGradient
        colors={["#0A1647", "#6B0F8B"]}
        start={{ x: 0, y: 0 }} // Start on the left
        end={{ x: 1, y: 0 }} // End on the right
        style={{borderRadius:8}}
        >
        <CardHeader>
          <CardTitle style={{color:"white"}} >Health Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Text style={{color:"#bbf7d0", fontWeight: 500}}>{status_message}</Text>
          <Text style={{color: "#fffc", marginTop: 8}}>Next check-up scheduled for:{next_checkup_date}</Text>
        </CardContent>
        </LinearGradient>
      </Card>
    );
};