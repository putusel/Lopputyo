import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { Input, Button, ListItem, Icon} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Image, Dimensions } from 'react-native';


const db = SQLite.openDatabase('database.db');

export default function SearchScreen({navigation}) {

  const [book, setBook] = useState('');
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {  
    fetch(`https://www.googleapis.com/books/v1/volumes?q="${keyword}"`)  
    .then(response => response.json())  
    .then(data => setRepositories(data.items))  
    .catch(error => {         
          Alert.alert('Error', error);   
    });
    setKeyword('');
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
      tx.executeSql('create table if not exists books (id integer primary key not null, place text);');
    }, null, updateList);
  }, []);

  //insert a book
  const saveBook = () => {
    db.transaction(tx => {
      tx.executeSql('insert into books (book) values (?);', [book]);    
    }, null, updateList
    )
    setBooks([books])
    setBook('');
    }
  // delete item from table
  const deleteItem = (id) => {
  Alert.alert("Do you want to remove the book?", "The book will be deleted permanently from your virtual book shelf",
      [
        {
          text: "Cancel"
        },
        { text: "OK", onPress: () =>
          db.transaction(tx => {
            tx.executeSql('delete from books where id = ?;', [id]);
          }, null, updateList)
        }
      ]
    );
  };


  // update books
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from books;', [], (_, { rows }) => 
        setBooks(rows._array)
      );
    }, null, null);
  };

  // render items
  const renderItem= ({ item }) => (
    <ListItem topDivider bottomDivider>
      <ListItem.Content>
        <View style={styles.list}>
          <View style={styles.books}>
            <ListItem.Title numberOfLines={1} onLongPress={() => deleteItem(item.id)}>{item.book}</ListItem.Title>
          </View>
            <ListItem onPress={() => navigation.navigate('BookScreen', {book: item.book})}>
              <Text style={{color: 'grey'}}>Add to book shelf</Text>
              <Icon name="book" size={18} color='grey' />
            </ListItem>
        </View>
      </ListItem.Content>
    </ListItem>
  );
  
  return (
    <View style={styles.container}>
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
      <Input 
        placeholder='Type in an author or a title'
        label='SEARCH A BOOK FROM A DATABASE TO YOUR VIRTUAL BOOK SHELF'
        onChangeText={text => setKeyword(text) } />
      <View>
        <Button 
        buttonStyle={{ width: 200, padding: 10, backgroundColor: '#C2C0C7', borderColor: 'gray' }}
        icon={{name: 'search'}} onPress={getRepositories} title='SEARCH' />
      </View>
  
      <Input
        placeholder='Type in a book'
        label='ADD A BOOK TO YOUR VIRTUAL BOOK SHELF'
        onChangeText={book => setBook(book)}
        value={book}
      />
      <View >
        <Button 
        buttonStyle={{ width: 200, padding: 10, backgroundColor: '#C2C0C7', borderColor: 'gray' }}
        icon={{name: 'save'}} title='SAVE' 
        onPress={saveBook} />
        <Button 
        icon={{name: 'book'}} title='Books' 
        buttonStyle={{ width: 200, padding: 10, backgroundColor: '#C2C0C7', borderColor: 'gray', marginTop: 10 }}
        onPress={()=> navigation.navigate('BookScreen', {data: books})} /> 
      </View>
      <FlatList
        style={styles.renderedList}
        keyExtractor={item => item.id.toString()}
        data={books}
        renderItem={renderItem}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
