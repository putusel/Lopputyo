import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { Input, Button, ListItem, Icon} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Image, Dimensions } from 'react-native';


const db = SQLite.openDatabase('database.db');

export default function SearchScreen({}) {

  const [book, setBook] = useState('');
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState('');
  
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
            
      <Input
        placeholder='Type in a book'
        label='ADD A BOOK TO YOUR VIRTUAL BOOKSHELF'
        color= '#7b68ee'
        onChangeText={book => setBook(book)}
        value={book}
      />
      <View >
        <Button 
        buttonStyle={{ width: 200, padding: 10, backgroundColor: '#7b68ee', borderColor: 'gray' }}
        icon={{name: 'save'}} title='SAVE' 
        onPress={saveBook} />
        
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
