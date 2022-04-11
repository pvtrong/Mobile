import React from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ScrollView,
	Image,
    TouchableOpacity
} from "react-native";
import { GenderEnum } from "../commons/enums/gender.enum";
import Convert from "../commons/utils/convert";
export default class Category extends React.Component {
	constructor(props) {
		super(props);
		props.navigation.setOptions({
			title: props.route.params.employee.EmployeeName,
		});
	}
    convertGenderName(Gender){
        return Convert.convertGender(Gender)
    }
	render() {
        let self = this;
		const { route } = this.props;
		let image;
		switch (route.params.employee.Gender.toString()) {
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

        

		return (
			<ScrollView>
				{/* <TouchableOpacity activeOpacity={0.5} > */}
				<View style={styles.employeeItem}>
					<Image style={styles.employeeImage} source={image}></Image>
					<View style={styles.employeeInfo}>
						<Text style={styles.EmployeeName}>
							{route.params.employee.EmployeeName}
						</Text>
						<Text>{route.params.employee.PositionName ? route.params.employee.PositionName : 'Chưa có chức vụ'}</Text>
					</View>
                    <TouchableOpacity activeOpacity={0.5}>
					<Image style={styles.icon2x} source={require("../assets/icon/edit.png")}></Image>
                    </TouchableOpacity>
				</View>
				<View style={styles.field}>
					<Image
						style={styles.icon}
						source={require("../assets/icon/icon-gender.png")}
					></Image>
					<Text style={styles.label}>{"Giới tính"}</Text>
					<Text style={styles.text}>
						{self.convertGenderName(route.params.employee.Gender)}
					</Text>
				</View>
				<View style={styles.field}>
					<Image
						style={styles.icon}
						source={require("../assets/icon/icon-code.png")}
					></Image>
					<Text style={styles.label}>{"Mã nhân viên"}</Text>
					<Text style={styles.text}>
						{route.params.employee.EmployeeCode}
					</Text>
				</View>
				<View style={styles.field}>
					<Image
						style={styles.icon}
						source={require("../assets/icon/smartphone.png")}
					></Image>
					<Text style={styles.label}>{"Số điện thoại"}</Text>
					<Text style={styles.text}>
						{route.params.employee.PhoneNumber}
					</Text>
				</View>
                <View style={styles.field}>
					<Image
						style={styles.icon}
						source={require("../assets/icon/mail.png")}
					></Image>
					<Text style={styles.label}>{"Email"}</Text>
					<Text style={styles.text}>
						{route.params.employee.Email}
					</Text>
				</View>
				<View style={styles.field}>
					<Image
						style={styles.icon}
						source={require("../assets/icon/workspace.png")}
					></Image>
					<Text style={styles.label}>{"Phòng ban"}</Text>
					<Text style={styles.text}>
						{route.params.employee.DepartmentName}
					</Text>
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
        marginBottom: 8
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
    }
});
