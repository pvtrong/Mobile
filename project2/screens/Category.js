import React, {useEffect, useState} from "react";
import { View, Text, FlatList, Button } from "react-native";
import axios from "axios";
import EmployeeListItem from "../components/EmployeeListItem";
import { PagingEnum } from "../commons/enums/paging.enum";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";
import { ModeEnum } from "../commons/enums/mode.enum";
import { useFocusEffect } from '@react-navigation/native';

export default function Category(props) {
	const [employees, setEmployees] = useState([]);
	const [pageSize, setPageSize] = useState(PagingEnum.first);
	const [pageNumber, setPageNumber] = useState(1);
	const [departmentId, setDepartmentId] = useState(
		props.route.params.departmentId
	);
    
    useFocusEffect(
        React.useCallback(() => {
          const unsubscribe = async function(){
            try {
                var queryStr = Convert.objectToQueryString({pageSize: pageSize, pageNumber: pageNumber, departmentId: departmentId});
                var res = await axios.get(
                    `${Config.BaseUrl}/api/v1/Employees/filter?${queryStr}`
                );
                const employees = res.data.Data;
                setEmployees(employees);
            } catch (err) {
                console.log(err);
            }
          }
    
          return () => unsubscribe();
        },)
      );
	useEffect(async () => {
		let mounted = true;
		props.navigation.setOptions({
			title: props.route.params.name,
		});
		// Update the document title using the browser API
		let self = this;
		try {
			var queryStr = Convert.objectToQueryString({pageSize: pageSize, pageNumber: pageNumber, departmentId: departmentId});
			var res = await axios.get(
				`${Config.BaseUrl}/api/v1/Employees/filter?${queryStr}`
			);
			const employees = res.data.Data;
			setEmployees(employees);
		} catch (err) {
			console.log(err);
		}
		return () => (mounted = false);
	});
	return (
		<View>
			<Button
				title={"Thêm nhân viên"}
				onPress={() =>
					props.navigation.navigate("AddEmployee", {
						mode: ModeEnum.add,
						department: {
							departmentName: props.route.params.name,
							departmentId: departmentId,
						},
					})
				}
			></Button>
			<FlatList
				data={employees}
				renderItem={({ item }) => (
					<EmployeeListItem
						employee={item}
						onPress={() => props.navigation.navigate("Employee", { employee: item })}
					/>
				)}
				keyExtractor={(item) => `${item.EmployeeId}`}
				contentContainerStyle={{
					paddingLeft: 16,
					paddingRight: 16,
				}}
			></FlatList>
		</View>
	);
}
