import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import HomeScreen from'./HomeScreen'
import SearchScreen from './SearchScreen';
import BookScreen from './BookScreen';

const Tab = createBottomTabNavigator();

export default function App () {
  return (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home"component={HomeScreen} />
      <Tab.Screen name="Search a book"component={SearchScreen} />
      <Tab.Screen name="Books"component={BookScreen} />
    </Tab.Navigator>
  </NavigationContainer>  
  );
}
