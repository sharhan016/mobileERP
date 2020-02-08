import React from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback } from 'react-native';

export default function MyLabels({ data, focus }) {
  return <View style={styles.container}>
      {data.map((arc, index) => (
        <TouchableNativeFeedback onPress={() => {
          focus(index)
          }} key={index}>
          <View style={styles.listContainer} >
            <View style={[styles.dot, { backgroundColor: arc.color }]} />
            <View style={styles.listItem}>
              <Text>{arc.title}</Text>
              <Text>{arc.help}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>;
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 400,
    backgroundColor: 'gray',
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
