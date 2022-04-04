import React from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import EmployeeListItem from "../components/EmployeeListItem";
import { PagingEnum } from "../commons/enums/paging.enum";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";

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
				employeeFilter: '',
				departmentId: '',
				positionId: '',
			},
		};
	}
	render() {
		const { route, navigation } = this.props;
		const { employees } = this.state;
		return (
			<FlatList
				data={employees}
				renderItem={({ item }) => (
					<EmployeeListItem
						employee={item}
						onPress={() => navigation.navigate("Employee", {employee: item}) }
					/>
				)}
				keyExtractor={(item) => `${item.EmployeeId}`}
				contentContainerStyle={{
					paddingLeft: 16,
					paddingRight: 16,
				}}
			></FlatList>
		);
	}

	async componentDidMount() {
        let self = this;
		try {
			const { filter } = this.state;
			var queryStr = Convert.objectToQueryString(filter)
			var res = await axios.get(
				// `${Config.BaseUrl}/api/v1/Employees/filter?${queryStr}`
				`${Config.BaseUrl}/api/v1/Employees`
			);
			const employees = res.data;
            console.log(employees)
			self.setState(() => { return {employees: employees}  });
		} catch (err) {
			console.log(err);
		}
	}
}
