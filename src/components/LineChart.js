import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import colors from "../config/colors";
import jsonData from '../screens/data2.json'

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

//let json = jsonData.requestedData //TODO: modify here with props
//let json = []



class LineChart2 extends Component {

    constructor(props) {
        super(props);
        //const json = jsonData.requestedData
         const json = this.props.lineData
        this.labels = json.Labels
        this.sale = [0, ...json.SalesData]
        this.purchase = [0,...json.PurchaseData]
        
        
    }


    render() {
        const saleData = this.sale.map((s) => { return parseInt(s) })
        const purchaseData = this.purchase.map((s) => { return parseInt(s) })
        const data = {
            labels: this.labels,
            //labels: ["01/02","","03/02","","05/02","","07/02","","07/02","","07/02",""],
            datasets: [
                {
                    data: saleData,
                    color: (opacity = 0) => `rgb(16, 61, 133)`,
                    // color: (opacity = 0) => `rgba(0, 128, 0, ${opacity})`, // (green) optional
                    strokeWidth: 2 // optional
                }
            ],
        };
        const item = {
            datasets: [
                {
                    data: purchaseData,
                    //color: (opacity = 0) => `rgb(219, 11, 42)`,
                    color: (opacity = 0) => `rgb(224, 11, 11, ${opacity})`, //(red) optional
                    strokeWidth: 4 // optional
                }
            ],
        }
        return (
            <View style={styles.container}>
                <LineChart
                    data={data}
                    item={item}
                    width={screenWidth}
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: '#eff0f2',
                        //backgroundGradientFrom: '#e4e9f2',
                        labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                        //backgroundGradientTo: '#092d5f',
                        backgroundGradientTo: '#c9dcfc',
                        decimalPlaces: 0, // optional, defaults to 2dp
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