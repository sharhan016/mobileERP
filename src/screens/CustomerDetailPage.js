import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';


class CustomerDetailPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    render(){
        return(
            <View>
                <Text>{this.state.data}</Text>
            </View>
        );
    }

}


export default CustomerDetailPage;

const styles = StyleSheet.create({

})