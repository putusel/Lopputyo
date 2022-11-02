import React from'react';
import { View, Text, StyleSheet, FlatList } from'react-native';

export default function  BookScreen(route, navigation) {

    const{ data } = route.params;
    
    return (  
        <View style={styles.container}>
        <Text style={styles.text}>Book Shelf</Text>
        <FlatList style={styles.list}
          data={data}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>
        }/>
    </View>  
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   
    input : {
      width:200, 
      borderColor: 'gray', 
      borderWidth: 1,
      fontSize: 20,
    },
    text : {
      fontSize: 20,
    }
  });