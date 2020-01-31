import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Card from '../components/Card';
import CardSection from '../components/CardSection';

import TestPage from '../screens2/Testpage';
import TablePage from '../screens2/TablePage';

const WIDTH = Dimensions.get('screen').width;

class Report extends Component {
    render() {
        return (
            <View style={styles.container}>                
                <Card>
                    <CardSection >
                        <View style={styles.cardHeading}><Text style={styles.headingTextStyle}>Revenues</Text></View>
                    </CardSection>
                    <View style={styles.inCard}>
                        <View style={{ height: 10 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Sales Revenue</Text>
                            <Text style={styles.textStyle}>$12,543</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Revenue</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                    </View>
                </Card>
                {/* NEED TO SPLIT THIS INTO COMPONENTS */}
                <Card>
                    <CardSection >
                        <View style={styles.cardHeading}><Text style={styles.headingTextStyle}>Expenses</Text></View>
                    </CardSection>
                    <View style={styles.inCard}>
                        <View style={{ height: 10 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Purchase Expense</Text>
                            <Text style={styles.textStyle}>$12,543</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Expense</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                    </View>
                </Card>
                {/*NEED TO SPLIT THIS INTO COMPONENTS*/}
                <Card>
                    <CardSection >
                        <View style={styles.cardHeading}><Text style={styles.headingTextStyle}>Receipts</Text></View>
                    </CardSection>
                    <View style={styles.inCard}>
                        <View style={{ height: 10 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Customer Receipts</Text>
                            <Text style={styles.textStyle}>$12,543</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Receipts</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                    </View>
                </Card>
                {/*NEED TO SPLIT THIS INTO COMPONENTS*/}
                <Card>
                    <CardSection >
                        <View style={styles.cardHeading}><Text style={styles.headingTextStyle}>Payments</Text></View>
                    </CardSection>
                    <View style={styles.inCard}>
                        <View style={{ height: 10 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Supplier Payments</Text>
                            <Text style={styles.textStyle}>$12,543</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Payments</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                    </View>
                </Card>


                <Card>
                <CardSection >
                        <View style={styles.cardHeading}><Text style={styles.headingTextStyle}>Stock Value</Text></View>
                    </CardSection>
                <TestPage />
                </Card>

                <Card>
                <CardSection >
                        <View style={styles.cardHeading}><Text style={styles.headingTextStyle}>Department Wise Sales</Text></View>
                    </CardSection>
                <TablePage />
                </Card>

            </View>
        );
    }
}
export default Report;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
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
    }
});