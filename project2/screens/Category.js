import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import axios from "axios";
import EmployeeListItem from "../components/EmployeeListItem";
import { PagingEnum } from "../commons/enums/paging.enum";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";
import { ModeEnum } from "../commons/enums/mode.enum";
import { useIsFocused } from "@react-navigation/native";

export default function Category(props) {
	const [employees, setEmployees] = useState([]);
	const [_limit, setLimit] = useState(PagingEnum.first);
	const [_page, setPage] = useState(1);
	const [_sort, setSort] = useState("EmployeeCode");
	const [_order, setOrder] = useState("asc");
	const [activeSwipe, setActiveSwipe] = useState();
	const [positions, setPositions] = useState();
	const [DepartmentId, setDepartmentId] = useState(
		props.route.params.DepartmentId
	);

    
	const { route } = props;
	const isFocused = useIsFocused();
	const reloadScreen = async function () {
		try {
			var queryStr = Convert.objectToQueryString({
				_limit: _limit,
				_page: _page,
				DepartmentId: DepartmentId,
				_sort: _sort,
				_order: _order,
			});
			var res = await axios.get(`${Config.BaseUrl}/employees?${queryStr}`);
			const employees = res.data;
			setEmployees(employees);
			setActiveSwipe(null);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(async () => {
		props.navigation.setOptions({
			title: props.route.params.name,
		});
		reloadScreen();
	}, [ _limit, _page, DepartmentId, _sort, _order]);

	useEffect(async () => {
		try {
			var res = await axios.get(`${Config.BaseUrl}/positions`);
			setPositions(res.data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<View>
			<Button
				title={"Thêm nhân viên"}
				onPress={() =>
					props.navigation.navigate("AddEmployee", {
						mode: ModeEnum.add,
						DepartmentName: props.route.params.name,
						DepartmentId: DepartmentId,
						departments: props.route.params.departments,
						positions: positions,
                        reloadScreen: reloadScreen
					})
				}
			></Button>
			<FlatList
				data={employees}
				renderItem={({ item }) => (
					<EmployeeListItem
						positions={positions}
						departments={props.route.params.departments}
						onEdit={() => {
                            props.navigation.navigate("AddEmployee", {
							mode: ModeEnum.edit,
							employee: item,
							positions: positions,
							departments: props.route.params.departments,
                            reloadScreen: reloadScreen,
						})}}
						activeSwipe={activeSwipe}
						reloadScreen={reloadScreen}
						setActiveSwipe={(id) => {
							setActiveSwipe(id), console.log(id);
						}}
						employee={item}
						onPress={() =>
							props.navigation.navigate("Employee", {
								employeeId: item.id,
								positions: positions,
								departments: props.route.params.departments,
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
