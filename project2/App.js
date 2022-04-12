// In App.js in a new project

import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import Home from "./screens/Home";
import Toast from "react-native-toast-message";
import Setting from "./screens/Setting";
import Search from "./screens/Search";
import Ionicons from 'react-native-vector-icons/Ionicons';

function App() {
	return (
		<NavigationContainer>
			<TabNavigator.Navigator screenOptions={({ route }) => ({
                headerShown: false,
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;
							if (route.name === "Home") {
								iconName = focused
									? "home"
									: "home-outline";
							} else if (route.name === "Setting") {
								iconName = focused ? "settings" : "settings-outline";
							} else if(route.name === "Search"){
                                iconName = focused ? "search" : "search-outline";
                            }

							// You can return any component that you like here!
							return <Ionicons name={iconName} size={size} color={color} />;
						},
						tabBarActiveTintColor: "tomato",
						tabBarInactiveTintColor: "gray",
                        
					})}>
				<TabNavigator.Screen
					
					name="Home"
					component={Home}
				/>
                <TabNavigator.Screen name="Search" component={Search} />
				<TabNavigator.Screen name="Setting" component={Setting} />
				
			</TabNavigator.Navigator>
			<Toast />
		</NavigationContainer>
	);
}

export default App;
