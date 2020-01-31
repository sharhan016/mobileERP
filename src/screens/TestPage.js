import React, { Component } from 'react';
import { ScrollView,StyleSheet, Text,View,TouchableOpacity,Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import colors from '../config/colors';
import TestPage2 from '../screens/TestPage2';
  
const WIDTH = Dimensions.get('screen').width;

export default class App extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
      collapsed: true,
      collapsed2: true,
    };
  
    toggleExpanded = () => {
      this.setState({ collapsed: !this.state.collapsed });
    };

    toggleExpanded2 = () => {
        this.setState({ collapsed2: !this.state.collapsed2 });
      };
  

  
    render() {
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
        

            <TouchableOpacity onPress={this.toggleExpanded2}>
              <Card>
                  <CardSection>
                  <View style={styles.cardHeading}><Text style={styles.title}>Revenues</Text></View>
                  </CardSection>
              </Card>
            </TouchableOpacity>
            <Collapsible collapsed={this.state.collapsed2} align="center">
              <View style={styles.content}>
              <View style={styles.inCard}>
                        <View style={{ height: 10 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Total Sales Revenue</Text>
                            <Text style={styles.textStyle}>$12,543</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Total Other Revenue</Text>
                            <Text style={styles.textStyle}>$10,254</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        <View style={styles.horizontalView}>
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
                    </View>
              </View>
            </Collapsible>


            <TestPage2 />
            {/* <Accordion
              activeSections={activeSections}
              //sections={CONTENT}
              touchableComponent={TouchableOpacity}
              //={multipleSelect}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
            /> */}
          </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      paddingTop: 30,
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
    },
    header: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 5,
      marginLeft: 8,
      marginRight: 8
    },
    active: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10,
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 30,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 16,
      marginRight: 8,
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

  /*

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


  */