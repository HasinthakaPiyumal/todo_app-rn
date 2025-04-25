import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import './assets/styles/main.css';

// Define the types for our navigation stack
type RootStackParamList = {
  Home: undefined;
  // Add more screens here as you create them
  // TaskDetails: { taskId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'white'
            }
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* Add more screens here as you create them */}
          {/* <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
