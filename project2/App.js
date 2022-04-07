// In App.js in a new project

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import Category from './screens/Category';
import Employee from './screens/Employee';
import Categories from './screens/Categories';
import AddEmployee from './screens/AddEmployee';
import Toast from 'react-native-toast-message';
function App() {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator initialRouteName="Categories">
        
        <AppNavigator.Screen name="Phòng ban" component={Categories} />
        <AppNavigator.Screen name="Category" component={Category} />
        <AppNavigator.Screen name="Employee" component={Employee} />
        <AppNavigator.Screen name="AddEmployee" component={AddEmployee} />
      </AppNavigator.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
