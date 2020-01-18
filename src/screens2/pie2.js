import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
const width = (Dimensions.get('window').width) - 25;
const height = Dimensions.get('window').height;
const pieData = [
    {
        name: 'Seoul',
        population: 215000,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Toronto',
        population: 28000,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Beijing',
        population: 5276,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'New York',
        population: 85380,
        color: 'green',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    // {
    //     name: 'Moscow',
    //     population: 119200,
    //     color: 'rgb(0, 0, 255)',
    //     legendFontColor: '#7F7F7F',
    //     legendFontSize: 15,
    // },
    // {
    //     name: 'Delhi',
    //     population: 119200,
    //     color: 'rgb(0, 255, 68)',
    //     legendFontColor: '#7F7F7F',
    //     legendFontSize: 15,
    // },
    // {
    //     name: 'Agra',
    //     population: 119200,
    //     color: 'rgb(0, 217, 255)',
    //     legendFontColor: '#7F7F7F',
    //     legendFontSize: 15,
    // },
    // {
    //     name: 'Indore',
    //     population: 119200,
    //     color: 'rgb(195, 255, 0)',
    //     legendFontColor: '#7F7F7F',
    //     legendFontSize: 15,
    // },
];
class pie2 extends Component {
    constructor(props){
        super(props);
    }
    state = {
        chartConfig: {
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = .1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 56
            },
        }
    }

    render() {
        console.log(this.props.data)
        return (
             <View style={styles.container}>
                 <Text style={{fontSize: 17, textAlign: 'center',paddingTop: 10, paddingBottom: 5}}>Sales Analysis</Text>
                <PieChart
                    data={pieData}
                    width={width - 5}
                    height={220}
                    chartConfig={this.state.chartConfig}
                    accessor="population"
                    backgroundColor="#fff"
                    //paddingLeft="10"
                    absolute
                />
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 15,
        backgroundColor: 'white',
        paddingRight: 20
    }
});

export default pie2;