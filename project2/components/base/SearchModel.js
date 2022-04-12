import React, { useEffect, useState }  from "react";
import { View, Text, ScrollView } from "react-native";
import EmployeeListItem from "../EmployeeListItem";
import axios from "axios";

import { useIsFocused } from '@react-navigation/native';
import { Config } from "../../config/config";
import { ModeEnum } from "../../commons/enums/mode.enum";

export default function SearchModel({ visible, data, notFound }) {

	const [activeSwipe, setActiveSwipe] = useState();
	const [positions, setPositions] = useState();
	const [departments, setDepartments] = useState();
    const isFocused = useIsFocused();
	if (!visible) return null;

	if (!visible && data.length === 0 && !notFound) return null;

	if (notFound) return <View>
        <Text>{notFound}</Text>;
    </View> 

    useEffect(async () => {
		try {
			var res = await axios.get(`${Config.BaseUrl}/positions`);
			setPositions(res.data);
		} catch (err) {
			console.log(err);
		}
        axios
			.get(`${Config.BaseUrl}/departments`)
			.then((resp) => {
				const departments = resp.data;
				setDepartments(departments);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<View>
			<ScrollView>
				{data.map((item) => (
					<EmployeeListItem
						positions={positions}
						departments={departments}
						onEdit={() => {
							props.navigation.navigate("AddEmployee", {
								mode: ModeEnum.edit,
								employee: item,
								positions: positions,
								departments: departments,
							});
						}}
						activeSwipe={activeSwipe}
						// reloadScreen={reloadScreen}
						setActiveSwipe={(id) => {
							setActiveSwipe(id), console.log(id);
						}}
						employee={item}
						onPress={() =>
							props.navigation.navigate("Employee", {
								employeeId: item.id,
								positions: positions,
								departments: departments,
							})
						}
					></EmployeeListItem>
				))}
			</ScrollView>
		</View>
	);
}
