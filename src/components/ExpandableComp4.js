import React, { Component } from "react";
import { View,Text,StyleSheet,Animated, TouchableOpacity,Touchable, Dimensions} from "react-native";
import Card from './Card';
import CardSection from './CardSection';
//import json from '../screens/data2.json'
import BoxInfo from './BoxInfo';
import colors from "../config/colors";

const WIDTH = Dimensions.get('screen').width;


class ExpandableComp4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        }
        this.componentHeight = new Animated.Value(80)

        this.PE = this.props.PE
        this.OE = this.props.OE
    }
    componentDidMount() {
        console.log('LOOK Expense Comp4',this.PE,this.OE)
     
    }



    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
        !this.state.collapsed ? this.onCollapse() : this.onExpand()

      }
      onExpand = () => {
        Animated.timing(this.componentHeight,{
            duration: 1000,
            toValue: 300,
        }).start();
      }
      onCollapse = () => {
        Animated.timing(this.componentHeight,{
            duration: 100,
            toValue: 80
        }).start();
      }
      static navigationOptions = {
        header: null
    }
    
    render() {
       // console.log('in render',this.state)
        return (
            <Animated.View style={[styles.component ]} >
                
                <TouchableOpacity activeOpacity={.9} onPress={this.toggleExpanded}>
    
                    <Card>
                    <CardSection style={{padding: 0}}>
                        <View style={styles.cardHeading}><Text style={styles.title}>{this.props.title}</Text></View>
                    </CardSection>
                    <Animated.View style={[styles.inCard, { height : this.componentHeight } ]}>
                        <View style={{ height: 10 }}></View>
                        {/* <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Sales Revenue</Text>
                            <Text style={styles.textStyle}>${this.state.amount}</Text>
                        </View>
                        <View style={{ height: 5 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Revenue</Text>
                            <Text style={styles.textStyle}>${this.state.otherAmount}</Text>
                        </View> */}
                        <View style={{ height: 10 }}></View>
                        {/* ############ EXPANDABLE SECTION ################### */}
                        {/* {!this.state.collapsed ? <View>
                            {this.state.revenue.map( (e) => 
                                <BoxInfo subtitle='Maybe' label1={e[0]} amount1={e[1]} /> )}
                        </View> : null} */}
                    </Animated.View>
                    </Card>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default ExpandableComp4;

const styles = StyleSheet.create({
    container: {
       // flex: 1,
        //alignItems: 'center',
    },
    component : {
        //backgroundColor: 'gray',
        alignItems: 'center',
        //justifyContent: 'center',
        //flex: 1

    },
    inCard: {
        backgroundColor: colors.MISCHKA,
        paddingLeft: 10,
        height: 80,
        borderRadius: 1
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
        backgroundColor: colors.SILVER,
        borderRadius: 2
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        paddingTop: 6,
        marginBottom: 10,
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