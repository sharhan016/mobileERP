import React, {Component} from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { withNavigation } from 'react-navigation';

class CardDetail extends Component {
    state = {  }
    goToDetail() {
        console.log('button is clicked');
        this.props.navigation.navigate('DetailsPage');
    }
    
    render() {
        const { textStyle, viewStyle, text, spacing } = styles;
        const { name, title, synopsis } = this.props.album;
        const { navigate } = this.props.navigation;
        return(

        <Card>
        <CardSection>
            <View style={viewStyle}>
            <Text style={textStyle}>{title}</Text>
            <Text style={textStyle}>{name}</Text>
            </View>
        </CardSection>
        
        <CardSection>
           <Text style={text, spacing}>{synopsis}</Text>
        </CardSection>

        <CardSection >
            <Button  onPress={ ()=> navigate('DetailsPage',{
                noteId: this.props.album.id,
                noteName: this.props.album.name,
                noteSynopsis: this.props.album.synopsis,
                noteBody: this.props.album.body,
            }) }  />
        </CardSection>
        </Card>


    );
    }
}



const styles= StyleSheet.create({
    spacing : {
        padding: 2
    },
    text : {
        fontSize: 17,
        fontWeight: '500'
        
    },
    textStyle: {
        alignSelf: 'center',
        //color: '#007aff',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10
    },
    viewStyle: {
        flexDirection: 'row'
    }

});

export default withNavigation(CardDetail);


/*

<Text></Text>

<CardSection> </CardSection>


*/




    