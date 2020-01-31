import React, { Component } from "react";
import { View,StyleSheet, StatusBar} from "react-native";
import Spacer from '../components/Spacer';
import CompanyList from '../components/CompanyList';
import colors from '../config/colors';

class CompanyListView extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.companyList = this.props.navigation.getParam('navigationData');
        this.state = {
            token: 'this_is_a_token'
        }
    }
    componentDidMount(){
        console.log(this.companyList);
    }

   
    render() {
        
        return (
            <View style={styles.container}>
            <StatusBar hidden={true} />
            <Spacer space={30} />
            <CompanyList data={this.companyList} tokenID={this.state.token} nav={this.props.navigation} />
            </View>
        );
    }
}
export default CompanyListView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.LoginBG
    },
});