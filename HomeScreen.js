import { View, Text, StyleSheet } from'react-native';
import React, { useState } from 'react';


export default function HomeScreen() {

    const [texts, setTexts] = useState(["Classics..", "SciFi..", "Fantasy..", "Humour.."]);
    
    return (  
    <View style={styles.container}>
        <View>
            <Text>Welcome to your Book App! You can search a book from a large datatable and save it to your virtual book shelf. You can also write down the name of the book you would like to read</Text> 

      
 
        </View> 
    </View>    
    );
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          marginLeft: 10,
          marginRight: 10,
                    
        }
});