import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import colors from "../config/colors";

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};
const screenWidth = Dimensions.get("window").width - 20;
const data = {
    labels: ["01/02","","03/02","","05/02","","07/02","","07/02","","07/02",""],
    datasets: [
        {
            data: [20, 45, 28, 50,  40, 80, 43, 70, 45, 30, 50, 78],
            color: (opacity = 1) => `rgba(6, 87, 3, ${opacity})`, // (green) optional
            strokeWidth: 3 // optional
        }
    ],
};
const item = {
    datasets: [
        {
            data: [50, 65, 48, 80,  70, 90, 63, 40, 85, 50, 20, 58],
            color: (opacity = 1) => `rgba(219, 11, 42, ${opacity})`, //(red) optional
            strokeWidth: 2 // optional
        }
    ],
}
class LineChart2 extends Component {

    render() {
        return (
            <View style={styles.container}>
                <LineChart
                    data={data}
                    item={item}
                    width={screenWidth}
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor: 'black',
                        backgroundGradientFrom: '#e4e9f2',
                        labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                        backgroundGradientTo: '#525050',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(183, 208, 247, ${opacity})`, // color inisde line portion
                        style: {
                            borderRadius: 14,
                            
                        }
                    }}
                    bezier={this.props.bez}
                    style={{
                        marginVertical: 8,
                        borderRadius: 10,
                    }}
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