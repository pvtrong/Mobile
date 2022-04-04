import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, Image } from "react-native";
import { GenderEnum } from "../commons/enums/gender.enum";
export default class Category extends React.Component {
	constructor(props) {
		super(props);
		props.navigation.setOptions({
			title: props.route.params.employee.EmployeeName,
		});
	}

	render() {
		const { route } = this.props;
		let image;
		switch (route.params.employee.Gender) {
			case GenderEnum.female: {
				image = require("../assets/image/woman.png");
				break;
			}
			case GenderEnum.male: {
				image = require("../assets/image/man.png");
				break;
			}
			default: {
				image = require("../assets/image/man.png");
				break;
			}
		}

		return (
			<ScrollView>
				{/* <TouchableOpacity activeOpacity={0.5} > */}
				<View style={styles.employeeItem}>
					<Image style={styles.employeeImage} source={image}></Image>
					<Text style={styles.employeeName}>{route.params.employee.EmployeeName}</Text>
				</View>
                <View style={styles.employeeItem}>
                <Text style={styles.label}>{"Giới tính"}</Text><Text style={styles.employeeName}>{route.params.employee.GenderName}</Text>
				</View>
				{/* </TouchableOpacity> */}
			</ScrollView>
		);
	}
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
    label: {
        textTransform: "uppercase",
		marginBottom: 8,
		fontWeight: "700",
        marginRight: 'auto'
    },
	employeeImage: {
		width: 64,
		height: 64,
		marginRight: 20,
	},
	employeeName: {
		textTransform: "uppercase",
		marginBottom: 8,
		fontWeight: "700",
	},
	employeeJob: {
		textTransform: "uppercase",
		marginBottom: 8,
	},
});
