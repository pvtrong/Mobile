import React from "react";
import { View, Text } from "react-native";
import AppNavigator from "../AppNavigator";
import Category from "../screens/Category";
import Employee from "../screens/Employee";
import SearchBar from "../screens/SearchBar";
import AddEmployee from "../screens/AddEmployee";

export default function Search(props) {
	return (
		<AppNavigator.Navigator initialRouteName="SearchBar">
			<AppNavigator.Screen name="SearchBar" component={SearchBar} />
			<AppNavigator.Screen name="Category" component={Category} />
			<AppNavigator.Screen name="Employee" component={Employee} />
			<AppNavigator.Screen name="AddEmployee" component={AddEmployee} />
		</AppNavigator.Navigator>
	);
}
