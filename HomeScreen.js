import { View, Text, StyleSheet, Image } from'react-native';
import React, { useState } from 'react';


export default function HomeScreen() {

    const [texts, setTexts] = useState(["Classics..", "SciFi..", "Fantasy..", "Humour.."]);
    
    return (  
    <View style={styles.container}>
        <View>
            <Text style = {{ fontSize: 40, color: '#7b68ee', marginBottom: 20}}>Welcome to your Bookshelf App!</Text>
            <Image style={styles.image} source={{uri: 'https://th.bing.com/th/id/OIP.ArcTZKdFSUZPOpR-PBfh8gAAAA?w=155&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'}} />
            <Text style={styles.text}>
                You can search a book from a large datatable or write down the name of the book and save it to your virtual bookshelf.
            </Text> 
                
        </View> 
    </View>    
    );
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#e6e6fa',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          marginLeft: 10,
          marginRight: 10,
                    
        },
        text: {
          color: '#7b68ee',
          fontSize: 20
        },
        image : {
            width: 250,
            height: 100,
            marginLeft: 40,
            marginBottom: 20
        },
});