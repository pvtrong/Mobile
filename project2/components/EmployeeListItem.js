import React, { useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import { GenderEnum } from "../commons/enums/gender.enum";
import SwipeOut from "react-native-swipeout";
import axios from "axios";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";
import { ModeEnum } from "../commons/enums/mode.enum";
export default function EmployeeListItem(props) {
	const {
		employee,
		onPress,
		activeSwipe,
		setActiveSwipe,
		reloadScreen,
		positions,
        onEdit
	} = props;
	let image;
	switch (employee.Gender.toString()) {
		case GenderEnum.female.toString(): {
			image = require("../assets/image/woman.png");
			break;
		}
		case GenderEnum.male.toString(): {
			image = require("../assets/image/man.png");
			break;
		}
		default: {
			image = require("../assets/image/man.png");
			break;
		}
	}
	var swipeSettings = {
		autoClose: true,
		onOpen: () => {
			if (employee.id !== activeSwipe) setActiveSwipe(employee.id);
		},
		onClose: () => {},
		right: [
            {
				onPress: () => {
					editEmployee();
				},
				text: "Sửa",
				type: "primary",
			},
			{
				onPress: () => {
					showAlert();
				},
				text: "Xoá",
				type: "delete",
			},
           
		],
		rowId: employee.id,
	};

    const editEmployee = function(){
        onEdit();
    }

	const deleteEmployee = async function () {
		try {
			var res = await axios.delete(
				`${Config.BaseUrl}/employees/${employee.id}`
			);
			reloadScreen();
		} catch (error) {
			console.log(error);
		}
	};

	const showAlert = function () {
		Alert.alert(
			"Xoá nhân viên",
			"Bạn chắc chắn xoá nhân viên này?",
			[
				{
					text: "Huỷ",
					onPress: () => setActiveSwipe(null),
					style: "cancel",
				},
				{
					text: "Có",
					onPress: () => deleteEmployee(),
					style: "default",
				},
			],
			{
				cancelable: true,
				onDismiss: () => setActiveSwipe(null),
			}
		);
	};

	return (
		<SwipeOut
			style={styles.swipe}
			{...swipeSettings}
			close={employee.id !== activeSwipe}
		>
			<TouchableOpacity activeOpacity={0.5} onPress={onPress}>
				<View style={styles.employeeItem}>
					<Image style={styles.employeeImage} source={image}></Image>
					<View style={styles.employeeInfo}>
						<Text style={styles.EmployeeName}>
							{employee && employee.EmployeeName}
						</Text>
						<Text>
							{Convert.convertPosition(
								employee && employee.PositionId,
								positions
							)}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</SwipeOut>
	);
}

const styles = StyleSheet.create({
	employeeItem: {
		width: "100%",
		alignItems: "center",
		flex: 1,
		padding: 16,
		flexDirection: "row",
	},
	employeeInfo: {
		flex: 1,
	},
	swipe: {
		borderRadius: 8,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 0 },
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	employeeImage: {
		width: 64,
		height: 64,
		marginRight: 20,
	},
	EmployeeName: {
		textTransform: "uppercase",
		marginBottom: 8,
		fontWeight: "700",
	},
	employeeJob: {
		textTransform: "uppercase",
		marginBottom: 8,
	},
});
