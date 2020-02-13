import React from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback, TouchableOpacity, FlatList } from 'react-native';

export default function MyLabels({ data, focus }) {
  return <View style={styles.container}>
    <FlatList 
          nestedScrollEnabled={true}
          data = {data}
          keyExtractor = {(d,i) => { 
            return d.key}}
          renderItem = { (data) => {
            //console.log('from FlatList',data);
            return(
              <TouchableOpacity onPress={() => {
                focus(data.index)
                }} key={data.index}>
              <View style={styles.listContainer} >
           <View style={[styles.dot, { backgroundColor: data.item.color }]} />
            <View style={styles.listItem}>
            <Text>{data.item.title}</Text>
            <Text>{data.item.help}</Text>
            </View>
          </View>
          </TouchableOpacity>
            )
          
         }}
          />
      {/* {data.map((arc, index) => (
        <TouchableNativeFeedback onPress={() => {
          focus(index)
          }} key={index}>
          
          
        </TouchableNativeFeedback>
      ))} */}
    </View>;
}


const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 300,
    //backgroundColor: 'gray',
    justifyContent: 'flex-start',
  },
  listItem: {
    marginVertical: 10,
    marginRight: 10,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginHorizontal: 5,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
  }
});
