import React, { Component } from "react";
import { View,Text,StyleSheet,Dimensions, TouchableOpacity, Animated} from "react-native";
import Card from '../components/Card';
import CardSection from '../components/CardSection';
const WIDTH = Dimensions.get('screen').width;
const SR = 'Sales Revenue';
const TSR = 'Total Sales Revenue';
const OR = 'Other Revenue';
const TOR = 'Total Other Revenue';
class TestPage2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true
        }
    }
    toggleExpanded = () => {

        this.setState({ collapsed: !this.state.collapsed });
      };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.toggleExpanded}>
                <Card>
                    <CardSection >
                        <View style={styles.cardHeading}><Text style={styles.title}>Revenues</Text></View>
                    </CardSection>
                    <View style={styles.inCard}>
                        <View style={{ height: 10 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>{this.state.collapsed ? SR: TSR}</Text>
                            <Text style={styles.textStyle}>$12,543</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>{this.state.collapsed ? OR: TOR}</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        {!this.state.collapsed ? <View><View style={styles.horizontalView}>
                            <Text style={styles.subtitle}>Cash Receipt</Text>
                            {/* <Text style={styles.textStyle}>$10,254</Text> */}
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Customer Receipts</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Receipts</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.subtitle}>Bank Deposit</Text>
                            {/* <Text style={styles.textStyle}>$10,254</Text> */}
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Customer Receipts</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Receipts</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.subtitle}>Check Deposit</Text>
                            {/* <Text style={styles.textStyle}>$10,254</Text> */}
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Customer Receipts</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Receipts</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        </View> : null}
                    </View>
                </Card>
                </TouchableOpacity>
            
                
            </View>

        );
    }
}
export default TestPage2;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    inCard: {
        paddingLeft: 10
    },
    textStyle: {
        fontSize: 17
    },
    headingTextStyle: {
        fontSize: 18
    },
    horizontalView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 15,
        justifyContent: 'space-between'
    },
    cardHeading: {
        alignItems: 'center',
        width: WIDTH - 50,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
      },
      subtitle: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '300',
        textDecorationLine: 'underline',
        //marginBottom: 10,
        marginTop: 10
      },
});