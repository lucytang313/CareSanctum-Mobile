import React from "react";
import { View, ViewStyle, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { HourlyData } from "../../hooks/Google-Fit/use-HourlyData";

interface TrendGraphProps {
  trendData: Array<{ date: string; value: number }> | Array<{time: string, value: number}> | null;
  containerStyle?: ViewStyle;
  width?: number; // Optional custom width
}

const TrendGraph: React.FC<TrendGraphProps> = ({ 
  trendData, 
  containerStyle,
  width 
}) => {
  const { width: screenWidth } = useWindowDimensions();
  if(!trendData){
    return (<></>);
  }
  // Use provided width, or fallback to screen width with padding
  const chartWidth = width || (screenWidth - 40);
  const isTimeBased = trendData ? 'time' in (trendData[0] || {}): false;

  // Transform data for react-native-chart-kit
  const labels = trendData.map((item) => 
    isTimeBased ? (item as { time: string }).time : new Date((item as { date: string }).date).toLocaleDateString(undefined, { weekday: "short" })
  );
  const dataValues = trendData.map((item) => item.value);

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: dataValues, strokeWidth: 2, color: (opacity = 1) => `rgba(107, 15, 139, ${opacity})`,}],
        }}
        width={chartWidth} // Now a number
        height={150}
        yAxisLabel=""
        fromZero={true}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(107, 15, 139, ${opacity})`,
          
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 8,
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "#6B0F8B",
          },
          fillShadowGradientFrom: "white",
          fillShadowGradient: "transparent",
          fillShadowGradientOpacity: 0,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 8,
          alignSelf: "center",
          paddingBottom: 8,
        }}
      />
    </View>
  );
};

export default TrendGraph;