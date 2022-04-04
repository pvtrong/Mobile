import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
// import { departmentImage} from "../commons/constants/department-image.constant"
export default function EmployeeListItem(props) {
	const { employee, onPress } = props;
	//   const image = departmentImage.find(item => item.Name === category.DepartmentName).Image;
	return (
		<TouchableOpacity activeOpacity={0.5} onPress={onPress}>
			<View style={styles.categoryItem}>
				<Text style={styles.categoryName}>{employee.EmployeeName}</Text>
				{/* <Image style={styles.categoryImage} source={image}></Image> */}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	categoryItem: {
		width: "100%",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 10,
		flex: 1,
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		padding: 16,
	},
	categoryImage: {
		width: 64,
		height: 64,
	},
	categoryName: {
		textTransform: "uppercase",
		marginBottom: 8,
		fontWeight: "700",
	},
});
