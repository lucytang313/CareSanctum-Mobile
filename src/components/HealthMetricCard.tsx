import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import TrendGraph from "./ui/LineGraph";
import { Heart, LucideIcon } from "lucide-react-native";
import { WeeklyData } from "../hooks/Google-Fit/use-WeeklyData";

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  lastChecked: string;
  trendData: Array<{ date: string; value: number }> | Array<{time: string, value: number}>;
//   trendData: Array<{ date: string; value: number }>;
//   description?: string;
//   unit?: string;
//   normalRange?: string;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({title, value, Icon, lastChecked, trendData}: HealthMetricCardProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Card>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <CardHeader style={{flexDirection: "row", justifyContent:"space-between"}}>
          <CardTitle style={{ fontWeight: 500, fontSize: 14 }}>
            {title}
          </CardTitle>
          <Icon size="20" color="black"/>
        </CardHeader>
      </TouchableOpacity>
      {!collapsed && (
        <CardContent>
          <Text style={{ fontWeight: 700, fontSize: 20, lineHeight: 32, marginBottom: 8 }}>
            {value}
          </Text>
          <Text style={{ color: "#6b7280", fontSize: 12 }}>
            Last Checked At: {lastChecked}
          </Text>
          <TrendGraph trendData={trendData} />
        </CardContent>
      )}
    </Card>
  );
};

export default HealthMetricCard;
