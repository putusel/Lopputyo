import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { Input, Button, ListItem, Icon} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Image, Dimensions } from 'react-native';


const db = SQLite.openDatabase('database.db');

export default function SearchScreen({navigation}) {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {  
    fetch(`https://www.googleapis.com/books/v1/volumes?q="${keyword}"`)  
    .then(response => response.json())  
    .then(data => setRepositories(data.items))  
    .catch(error => {         
          Alert.alert('Error', error);   
    });
    //setKeyword('');
  }
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };
 
  return (
    <View style={styles.container}>
      
      <Input 
        placeholder='Type in an author or a title'
        label='SEARCH A BOOK FROM A DATABASE TO YOUR VIRTUAL BOOK SHELF'
        onChangeText={text => setKeyword(text) } />
      <View>
        <Button 
        buttonStyle={{ width: 200, padding: 10, backgroundColor: '#7b68ee', borderColor: 'gray' }}
        icon={{name: 'search'}} onPress={getRepositories} title='SEARCH' />
      </View>
      <FlatList
        keyExtractor={(item,index) => index.toString()}  
        renderItem={({item}) =>
        <View>
          <Text 
            style={{fontSize:16, fontWeight: "bold"}}>{item.title}
          </Text>
          
        </View>} 
      data={repositories}
      ItemSeparatorComponent={listSeparator} />
           
    <StatusBar style="auto" />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  renderedList: {
    width: '100%'
  },
  list:{
    flexDirection:'row',
    justifyContent: "space-evenly",
    width: 'auto'
  },
  button: {
    width: '90%',
    backgroundColor: 'red',
    color: 'red',
    borderColor: 'red',
    
    marginBottom: 50
  }
});
