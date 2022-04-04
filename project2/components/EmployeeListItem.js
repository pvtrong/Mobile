import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { GenderEnum } from "../commons/enums/gender.enum";
export default function EmployeeListItem(props) {
	const { employee, onPress } = props;
    let image;
	  switch(employee.Gender){
          case GenderEnum.female: {
              image = require("../assets/image/woman.png")
              break;
          }
          case GenderEnum.male: {
            image = require("../assets/image/man.png")
            break;
        }
        default: {
            image = require("../assets/image/man.png")
            break;
        }
      }
	return (
		<TouchableOpacity activeOpacity={0.5} onPress={onPress}>
			<View style={styles.employeeItem}>
            <Image style={styles.employeeImage} source={image}></Image>
				<Text style={styles.employeeName}>{employee.EmployeeName}</Text>
				<Text style={styles.employeeJob}>{employee.PositionName}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	employeeItem: {
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
        flexDirection: 'row'
	},
	employeeImage: {
		width: 64,
		height: 64,
        marginRight: 20
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
