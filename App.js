import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import HomeScreen from'./HomeScreen'
import SearchScreen from './SearchScreen';
import BookScreen from './BookScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route }) => ({  // Navigator can be customized using screenOptions          
          tabBarIcon: ({ focused, color, size }) => {             
            // Function tabBarIcon is given the focused state,    
            // color and size params            
            let iconName;           
             if (route.name === 'Home') {              
              iconName = 'md-home'; 
              color = '#7b68ee';            
            } else if (route.name === 'Search') {              
              iconName = 'md-search';
              color = '#7b68ee';            
            } else if (route.name === 'Bookshelf') {              
              iconName = 'md-library';
              color = '#7b68ee';  
            } 
              return <Ionicons name={iconName} size={size} color={color} />;   //it returns an icon component          
            },        
          })}>
            <Tab.Screen name="Home"component={HomeScreen} />
            <Tab.Screen name="Search"component={SearchScreen} />
            <Tab.Screen name="Bookshelf"component={BookScreen} />
      </Tab.Navigator>    
    </NavigationContainer>
    
  );
}
