import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
} from "react-native";
import { ModeEnum } from "../commons/enums/mode.enum";
import Convert from "../commons/utils/convert";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { Config } from "../config/config";

export default function Employee(props) {
	const isFocused = useIsFocused();
	const [employee, setEmployee] = useState();
	const { route, navigation } = props;
	console.log(navigation.navigate);

	useEffect(async () => {
		try {
			var res = await axios.get(
				`${Config.BaseUrl}/employees/${props.route.params.employeeId}`
			);
			console.log(res.data);
			setEmployee(res.data);
		} catch (err) {
			console.log(err);
		}
	}, [isFocused]);

	useEffect(() => {
		props.navigation.setOptions({
			title: employee && employee.EmployeeName,
		});
	}, [employee]);
	return (
		<ScrollView>
			{/* <TouchableOpacity activeOpacity={0.5} > */}
			<View style={styles.employeeItem}>
				<Image
					style={styles.employeeImage}
					source={Convert.convertImageGender(employee && employee.Gender)}
				></Image>
				<View style={styles.employeeInfo}>
					<Text style={styles.EmployeeName}>
						{employee && employee.EmployeeName}
					</Text>
					<Text>
						{Convert.convertPosition(
							employee && employee.PositionId,
							route.params.positions
						)}
					</Text>
				</View>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() =>
						props.navigation.navigate("AddEmployee", {
							mode: ModeEnum.edit,
							employee: employee,
							positions: route.params.positions,
							departments: route.params.departments,
                            reloadScreen: props.route.params.reloadScreen
						})
					}
				>
					<Image
						style={styles.icon2x}
						source={require("../assets/icon/edit.png")}
					></Image>
				</TouchableOpacity>
			</View>
			<View style={styles.field}>
				<Image
					style={styles.icon}
					source={require("../assets/icon/icon-gender.png")}
				></Image>
				<Text style={styles.label}>{"Giới tính"}</Text>
				<Text style={styles.text}>
					{Convert.convertGender(employee && employee.Gender)}
				</Text>
			</View>
			<View style={styles.field}>
				<Image
					style={styles.icon}
					source={require("../assets/icon/icon-code.png")}
				></Image>
				<Text style={styles.label}>{"Mã nhân viên"}</Text>
				<Text style={styles.text}>{employee && employee.EmployeeCode}</Text>
			</View>
			<View style={styles.field}>
				<Image
					style={styles.icon}
					source={require("../assets/icon/smartphone.png")}
				></Image>
				<Text style={styles.label}>{"Số điện thoại"}</Text>
				<Text style={styles.text}>{employee && employee.PhoneNumber}</Text>
			</View>
			<View style={styles.field}>
				<Image
					style={styles.icon}
					source={require("../assets/icon/mail.png")}
				></Image>
				<Text style={styles.label}>{"Email"}</Text>
				<Text style={styles.text}>{employee && employee.Email}</Text>
			</View>
			<View style={styles.field}>
				<Image
					style={styles.icon}
					source={require("../assets/icon/workspace.png")}
				></Image>
				<Text style={styles.label}>{"Phòng ban"}</Text>
				<Text style={styles.text}>
					{Convert.convertDepartment(
						employee && employee.DepartmentId,
						route.params.departments
					)}
				</Text>
			</View>

			{/* </TouchableOpacity> */}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	employeeItem: {
		width: "100%",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 10,
		flex: 2,
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		padding: 16,
		flexDirection: "row",
	},
	employeeInfo: {
		flex: 1,
	},
	icon2x: {
		width: 48,
		height: 48,
	},
	field: {
		width: "100%",
		alignItems: "center",
		borderTopColor: "#eeee",
		borderTopWidth: 1,
		flex: 2,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		padding: 15,
		flexDirection: "row",
	},
	label: {
		fontSize: 15,
		fontWeight: "500",
		marginRight: "auto",
	},
	employeeImage: {
		width: 64,
		height: 64,
		marginRight: 20,
	},
	icon: {
		width: 24,
		height: 24,
		marginRight: 20,
	},
	EmployeeName: {
		fontWeight: "700",
		marginBottom: 8,
	},
	text: {
		fontWeight: "700",
	},
	employeeJob: {
		textTransform: "uppercase",
		marginBottom: 8,
	},
	mb8: {
		marginBottom: 8,
	},
});
