import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};
const screenWidth = Dimensions.get("window").width;
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
};
class LineChart2 extends Component {

    render() {
        return (
            <View style={styles.container}>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
            </View>
        );
    }
}
export default LineChart2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});