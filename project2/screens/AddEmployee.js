import React from "react";
import { View, Text, FlatList, Button, StyleSheet, Picker } from "react-native";
import axios from "axios";
import EmployeeListItem from "../components/EmployeeListItem";
import { PagingEnum } from "../commons/enums/paging.enum";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";
import { TextInput } from "react-native-gesture-handler";
import { ModeEnum } from "../commons/enums/mode.enum";
import Toast from "react-native-toast-message";
import { GenderConstant } from "../commons/constants/gender.constant";
import { GenderEnum } from "../commons/enums/gender.enum";
export default class AddEmployee extends React.Component {
	constructor(props) {
		super(props);
		props.navigation.setOptions({
			title: "Thêm nhân viên mới",
		});
		this.state = {
			employee: {},
			genders: [
				{
					label: "Nam",
					value: GenderEnum.male,
				},
				{
					label: "Nữ",
					value: GenderEnum.female,
				},
				{
					label: "Khác",
					value: GenderEnum.other,
				},
			],
		};
	}

	handleEmployeeCode = (employeeCode) => {
		this.setState((prevState) => {
			let employee = Object.assign({}, prevState.employee);
			employee.EmployeeCode = employeeCode;
			return { employee };
		});
	};
	handleEmployeeName = (employeeName) => {
		this.setState((prevState) => {
			let employee = Object.assign({}, prevState.employee);
			employee.EmployeeName = employeeName;
			return { employee };
		});
		console.log(this.state.employee);
	};
	handlePhoneNumber = (phoneNumber) => {
		this.setState((prevState) => {
			let employee = Object.assign({}, prevState.employee);
			employee.PhoneNumber = phoneNumber;
			return { employee };
		});
		console.log(this.state.employee);
	};
	handleEmail = (email) => {
		this.setState((prevState) => {
			let employee = Object.assign({}, prevState.employee);
			employee.Email = email;
			return { employee };
		});
		console.log(this.state.employee);
	};
	handleGender = (gender) => {
		this.setState((prevState) => {
			let employee = Object.assign({}, prevState.employee);
			switch (gender) {
				case GenderEnum.male: {
					employee.GenderName = "Nam";
					break;
				}
				case GenderEnum.female: {
					employee.GenderName = "Nữ";
					break;
				}
				default: {
					employee.GenderName = "Khác";
					break;
				}
			}
			employee.Gender = gender;
			return { employee };
		});
	};

	showToast() {
		Toast.show({
			type: "success",
			text1: "Hello",
		});
	}

	render() {
		const { route, navigation } = this.props;
		let self = this;
		const { employee, genders } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Mã nhân viên</Text>
					<TextInput
						style={styles.input}
						placeholder="Nhập mã nhân viên"
						value={employee.EmployeeCode}
						onChangeText={self.handleEmployeeCode}
						editable={false}
					></TextInput>
				</View>

				<View style={styles.formControl}>
					<Text style={styles.label}>Họ và tên</Text>
					<TextInput
						autoFocus={true}
						style={styles.input}
						value={employee.EmployeeName}
						onChangeText={self.handleEmployeeName}
						placeholder="Nhập họ và tên"
					></TextInput>
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Giới tính</Text>

					<View style={styles.select}>
                    <Picker
						selectedValue={employee.Gender}
						onValueChange={(itemValue, itemIndex) => {self.handleGender(itemValue)}}
                        style={{ fontWeight: 'bold'}}
					>
						{genders.map((x, index) => (
							<Picker.Item key={index} label={x.label} value={x.value} />
						))}
					</Picker>
                    </View>
				</View>
                <View style={styles.formControl}>
					<Text style={styles.label}>Giới tính</Text>

					<View style={styles.select}>
                            
                    </View>
				</View>
                
				<View style={styles.formControl}>
					<Text style={styles.label}>Số điện thoại</Text>
					<TextInput
						style={styles.input}
						value={employee.PhoneNumber}
						onChangeText={self.handlePhoneNumber}
						placeholder="Nhập số điện thoại"
					></TextInput>
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						value={employee.Email}
						onChangeText={self.handleEmail}
						placeholder="Nhập email"
					></TextInput>
				</View>
				<Button title="Thêm" onPress={this.showToast}></Button>
			</View>
		);
	}

	async componentDidMount() {
		let self = this;
		console.log(this);
		switch (self.props.route.params.mode) {
			case ModeEnum.add: {
				try {
					var res = await axios.get(
						`${Config.BaseUrl}/api/v1/Employees/NewEmployeeCode`
					);
					const employee = {};
					employee.EmployeeCode = res.data;
					self.setState(() => {
						return { employee: employee };
					});
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: "100%",
	},
	formControl: {
		marginTop: 16,
	},
	input: {
		borderColor: "#EBF0FF",
		borderWidth: 1,
		borderRadius: 4,
		marginBottom: 12,
		marginLeft: 16,
		marginRight: 16,
		height: 48,
		padding: 16,
        
	},
	label: {
		color: "#223263",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 12,
		marginLeft: 16,
		marginRight: 16,
	},
	select: {
		height: 48,
		marginBottom: 12,
		marginLeft: 16,
		marginRight: 16,
		borderColor: "#EBF0FF",
		borderWidth: 1,
        borderRadius: 4,
        
	},
});
