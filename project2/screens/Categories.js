import React, { useState, useEffect } from "react";
import CategoryListItem from "../components/CategoryListItem";
import { FlatList } from "react-native";
import axios from "axios";
import { Config } from "../config/config";
import { useIsFocused } from '@react-navigation/native';
export default function Categories(props) {
	const { navigation } = props;
	const [categories, setCategories] = useState([]);
    const isFocused = useIsFocused();
	useEffect(async () => {
        props.navigation.setOptions({
			title: "Phòng ban",
		});
		axios
			.get(`${Config.BaseUrl}/departments`)
			.then((resp) => {
				const categories = resp.data;
				setCategories(categories);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [isFocused]);
	return (
		<FlatList
			data={categories}
			renderItem={({ item }) => (
				<CategoryListItem
					category={item}
					onPress={() =>
						navigation.navigate("Category", {
							name: item.DepartmentName,
							DepartmentId: item.DepartmentId,
                            departments: categories
						})
					}
				/>
			)}
			keyExtractor={(item) => `${item.DepartmentId}`}
			contentContainerStyle={{
				paddingLeft: 16,
				paddingRight: 16,
			}}
		></FlatList>
	);
}
