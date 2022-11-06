import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { Input, Button, ListItem, Icon} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Image, Dimensions } from 'react-native';


const db = SQLite.openDatabase('booklistdatabase.db');

export default function SearchScreen({}) {

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);
    
  //create table
   useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists books (id integer primary key not null, book text);');
    }, null, updateList);
  }, []);

  //save a book
  const saveBook = () => {
    db.transaction(tx => {
      tx.executeSql('insert into books (author, title) values (?, ?);', [author, title]);  
    }, null, updateList
    )
    setAuthor('');
    setTitle('');
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

  // update booklist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from books;', [], (_, { rows }) => 
        setBooks(rows._array)
      );
    });
  };

  // render items
  const renderItem = ({item}) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.author}</ListItem.Subtitle>  
      </ListItem.Content>
      <Icon type='material' name='delete' color='red' onPress={ () => deleteItem(item.id)} />
    </ListItem>
  )

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is your virtual bookshelf. Type in an author and a title of a book.
      </Text>     
      <Input
        placeholder='Type in an author'
        placeholderTextColor='#696969'
        onChangeText={author => setAuthor(author)}
        value={author}
      />
      <Input
        placeholder='Type in a title'
        placeholderTextColor='#696969'
        onChangeText={title => setTitle(title)}
        value={title}
      />
      <View >
        <Button 
        buttonStyle={{ width: 200, padding: 10, backgroundColor: '#7b68ee', borderColor: 'gray' }}
        icon={{name: 'save'}} title='SAVE' 
        onPress={saveBook} />
        
      </View>
      <FlatList
        style={books}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={listSeparator}
       
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
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
    marginBottom: 50,
  },
    text: {
      color: '#7b68ee',
      fontSize: 20,
      marginBottom: 10
    }
  
});
