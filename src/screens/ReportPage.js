import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = (Dimensions.get('window').width);
class ReportPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        let today = moment();
        let day = today.format("DD-MM-YYYY")
        this.state = {
            currentDate: new Date(),
            date: day,
            markedDate: moment(new Date()).format("YYYY-MM-DD")
        }
    }
    incrementDate = () => {
        const { date } = this.state;
        let new_date = moment(date, "DD-MM-YYYY").add(1, 'days').format("DD-MM-YYYY");
        this.setState({ date: new_date  })
    }
    decrementDate = () => {
        const { date } = this.state;
        let new_date = moment(date, "DD-MM-YYYY").subtract(1, 'days').format("DD-MM-YYYY");
        this.setState({ date: new_date  })
    }
    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={this.decrementDate}><Ionicons name="md-arrow-dropleft-circle" size={25} color={'black'} /></TouchableOpacity>
                    <Text> {this.state.date} </Text>
                    <TouchableOpacity onPress={this.incrementDate}><Ionicons name="md-arrow-dropright-circle" size={25} color={'black'} /></TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default ReportPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    dateContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        width: width,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});