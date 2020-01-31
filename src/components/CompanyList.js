import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import { ListItem } from 'react-native-elements';
//import UserAvatar from 'react-native-user-avatar';
import colors from "../config/colors";

const CompanyList = (props) => {
    
        const data = props.data;
        const navigation = props.nav;
        const tokenId = props["tokenID"];
    //
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={event => event.CompanyID}
                renderItem={(event) => {
                    const navigationParams = {
                        "ID": event.item.CompanyID,
                        "TOKEN": tokenId,
                    }
                    return <TouchableOpacity onPress={() => navigation.navigate('SignIn', navigationParams)}>
                            <View style={styles.listContainer}>
                                <ListItem
                                    containerStyle={styles.listStyle}
                                    titleStyle={{ color: 'white' }}
                                    subtitleStyle={{ color: 'white' }}
                                    title={' ' + event.item.CompanyName}
                                    subtitle={' ' + event.item.Website}
                                />
                            </View>
                    </TouchableOpacity>
                }}
            />
        </View>
    )
}
export default CompanyList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.LoginBG,
        justifyContent: 'center'
    },
    listContainer: {
        marginLeft: 8,
        marginRight: 8,
        //paddingTop: 10,
        paddingBottom: 2
    },
    listStyle: {
        borderRadius: 7,
        backgroundColor: colors.HEADER_BLUE,
        //backgroundColor: '#FFFFFF2b',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
    },
});