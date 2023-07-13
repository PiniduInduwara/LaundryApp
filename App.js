import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';;
import { Provider } from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';
// import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';


export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator/>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
