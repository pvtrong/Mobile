import React, { useEffect, useState }  from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import EmployeeListItem from "../EmployeeListItem";
import axios from "axios";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Config } from "../../config/config";
import { ModeEnum } from "../../commons/enums/mode.enum";

export default function SearchModel({ visible, data, notFound, reloadScreen }) {
    const navigation = useNavigation() 
	const [activeSwipe, setActiveSwipe] = useState(null);
	const [positions, setPositions] = useState([]);
	const [departments, setDepartments] = useState([]);
    const isFocused = useIsFocused(false);
	useEffect(() => {
        if (!visible) return null;

        if (!visible && data.length === 0 && !notFound) return null;

        if (notFound) return <View>
            <Text>{notFound}</Text>;
        </View> 
        console.log(notFound)
    }, [visible, notFound, data])
    useEffect(async () => {
		try {
			var res = await axios.get(`${Config.BaseUrl}/positions`);
			setPositions(res.data);
		} catch (err) {
			console.log(err);
		}
        try {
			var departmentRes = await axios .get(`${Config.BaseUrl}/departments`)
			setDepartments(departmentRes.data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<View style={styles.model} >
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<EmployeeListItem
						positions={positions}
						departments={departments}
						onEdit={() => {
                            navigation.navigate("AddEmployee", {
							mode: ModeEnum.edit,
							employee: item,
							positions: positions,
							departments: departments,
                            reloadScreen: reloadScreen
						})}}
						activeSwipe={activeSwipe}
						reloadScreen={reloadScreen}
						setActiveSwipe={(id) => {
							setActiveSwipe(id), console.log(id);
						}}
						employee={item}
						onPress={() =>
							navigation.navigate("Employee", {
								employeeId: item.id,
								positions: positions,
								departments: departments,
                                reloadScreen: reloadScreen
							})
						}
					/>
				)}
				keyExtractor={(item) => `${item.id}`}
				contentContainerStyle={{
					paddingLeft: 16,
					paddingRight: 16,
				}}
			></FlatList>
		</View>
	);
}
const styles = StyleSheet.create({
    
model:{
    paddingTop: 10,
    flex: 1,
    paddingBottom: 10
}, 
})
 