



// In App.js in a new project

import React from "react";
import AppNavigator from "../AppNavigator";
import Category from "../screens/Category";
import Employee from "../screens/Employee";
import Categories from "../screens/Categories";
import AddEmployee from "../screens/AddEmployee";

export default function Home() {
	return (
			<AppNavigator.Navigator initialRouteName="Categories">
					<AppNavigator.Screen name="Categories" component={Categories} />
					<AppNavigator.Screen name="Category" component={Category} />
					<AppNavigator.Screen name="Employee" component={Employee} />
					<AppNavigator.Screen name="AddEmployee" component={AddEmployee} />
				</AppNavigator.Navigator>
	);
}

