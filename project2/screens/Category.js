import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import axios from "axios";
import EmployeeListItem from "../components/EmployeeListItem";
import { PagingEnum } from "../commons/enums/paging.enum";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";
import { ModeEnum } from "../commons/enums/mode.enum";

export default class Category extends React.Component {
	constructor(props) {
		super(props);
		props.navigation.setOptions({
			title: props.route.params.name,
		});
		this.state = {
			employees: [],
			filter: {
				pageSize: PagingEnum.first,
				pageNumber: 1,
				departmentId: props.route.params.departmentId,
			},
		};
	}
	render() {
		const { route, navigation } = this.props;
		const { employees } = this.state;
		return (
			<View>
				<Button
					title={"Thêm nhân viên"}
					onPress={() => navigation.navigate("AddEmployee", {mode: ModeEnum.add})}
				></Button>
				<FlatList
					data={employees}
					renderItem={({ item }) => (
						<EmployeeListItem
							employee={item}
							onPress={() =>
								navigation.navigate("Employee", { employee: item })
							}
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

	async componentDidMount() {
		let self = this;
		try {
			const { filter } = this.state;
			var queryStr = Convert.objectToQueryString(filter);
			var res = await axios.get(
				`${Config.BaseUrl}/api/v1/Employees/filter?${queryStr}`
				// `${Config.BaseUrl}/api/v1/Employees`
			);
			// console.log(res.data.Data)
			const employees = res.data.Data;
			self.setState(() => {
				return { employees: employees };
			});
		} catch (err) {
			console.log(err);
		}
	}
}
