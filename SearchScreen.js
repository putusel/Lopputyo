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

  //create table
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists books (id integer primary key not null, author text, title text);');
    }, null, updateList);
  }, []);

  // update booklist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from books;', [], (_, { rows }) => 
        setBooks(rows._array)
      );
    });
  };

  //save a book
  const saveBook = () => {
    db.transaction(tx => {
      tx.executeSql('insert into books (author, title) values (?, ?);', [author, title]);  
    }, null, updateList
    )
    
  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Search a book from the database. Type in an author or a title of a book.
      </Text>
      <Input 
        placeholder='Type in an author or a title'
        placeholderTextColor='#696969'
        onChangeText={text => setKeyword(text) } />
      <View>
        <Button 
        buttonStyle={{ width: 200, padding: 10, backgroundColor: '#7b68ee', borderColor: 'gray', marginBottom: 20 }}
        icon={{name: 'search'}} onPress={getRepositories} title='SEARCH' />
      </View>
      <FlatList
        keyExtractor={(item,index) => index.toString()}  
        renderItem={({item}) =>
        <View>
          <Text 
            style={{fontSize:18, fontWeight: "bold", marginBottom: 5}}>{item.volumeInfo.title}
          
          </Text>
          
          <Text 
            style={{fontSize:16, marginBottom: 5 }}>{item.volumeInfo.authors}
          </Text>
          
        <Button 
        buttonStyle={{ width: 100, padding: 10, backgroundColor: '#7b68ee', borderColor: 'gray', marginLeft: 120, marginBottom: 5 }}
        icon={{name: 'save'}} title='SAVE' 
        onPress={saveBook} />
        
      
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
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  renderedList: {
    width: '100%',
    borderColor: '#7b68ee'
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
  },
  text: {
    color: '#7b68ee',
    fontSize: 20,
    marginBottom: 10
  }
});
