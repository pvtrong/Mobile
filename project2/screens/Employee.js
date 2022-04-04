import React from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";

export default class Category extends React.Component {
	constructor(props) {
		super(props);
		props.navigation.setOptions({
			title: props.route.params.name,
		});
	}
	render() {
		const { route } = this.props;
		return (
			// <FlatList
			// 	data={employees}
			// 	renderItem={({ item }) => (
			// 		<EmployeeListItem
			// 			employee={item}
			// 			onPress={() => navigation.navigate("Employee")}
			// 		/>
			// 	)}
			// 	keyExtractor={(item) => `${item.EmployeeId}`}
			// 	contentContainerStyle={{
			// 		paddingLeft: 16,
			// 		paddingRight: 16,
			// 	}}
			// ></FlatList>
            <View><Text>Ten cau thu</Text></View>
		);
	}
}
