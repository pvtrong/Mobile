import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import axios from "axios";
import EmployeeListItem from "../components/EmployeeListItem";
import { PagingEnum } from "../commons/enums/paging.enum";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";
import { TextInput } from "react-native-gesture-handler";
import { ModeEnum } from "../commons/enums/mode.enum";
import Toast from "react-native-toast-message";
import { GenderConstant } from "../commons/constants/gender.constant";
import { Picker } from "@react-native-picker/picker";
import { GenderEnum } from "../commons/enums/gender.enum";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from '@react-navigation/native';
export default function AddEmployee(props) {
	const [employeeCode, setEmployeeCode] = useState(null);
	const [employeeName, setEmployeeName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("088888888");
	const [email, setEmail] = useState("a@gmail.com");
	const [gender, setGender] = useState(GenderEnum.male);
	const [genderName, setGenderName] = useState("Nam");
	const [birthday, setBirthday] = useState(new Date());
	const [genders, setGenders] = useState([
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
	]);

    useFocusEffect(
        React.useCallback(() => {
          const unsubscribe = async function(){
            try {
                var res = await axios.get(
                    `${Config.BaseUrl}/api/v1/Employees/NewEmployeeCode`
                );
                setEmployeeCode(res.data);
                console.log("data2", res.data);
            } catch (err) {
                console.log(err);
                
            }
          }
    
          return () => unsubscribe();
        })
      );
	useEffect(async () => {
		let mounted = true;
		props.navigation.setOptions({
			title: "Thêm nhân viên mới",
		});
		// Update the document title using the browser API
		switch (props.route.params.mode) {
			case ModeEnum.add: {
				try {
					var res = await axios.get(
						`${Config.BaseUrl}/api/v1/Employees/NewEmployeeCode`
					);
					if (mounted) {
						setEmployeeCode(res.data);
					}
                    console.log("data1", res.data);
				} catch (err) {
					console.log(err);
				}
			}
		}
		return () => (mounted = false);
	}, [props.route.params]);

    let addEmployee = async function() {
        let employee = {
            employeeCode: employeeCode,
            employeeName: employeeName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            genderName: genderName,
            departmentName: props.route.params.department.departmentName,
            departmentId: props.route.params.department.departmentId,
        }
        console.log(employee)
        try {
            var res = await axios.post(
                `${Config.BaseUrl}/api/v1/Employees`, employee
            );

            console.log(res.error)
        } catch (err) {
            console.log(err);
        }
    }
	return (
		<View style={styles.container}>
			<View style={styles.formControl}>
				<Text style={styles.label}>Mã nhân viên</Text>
				<TextInput
					style={styles.input}
					placeholder="Nhập mã nhân viên"
					value={employeeCode}
					onChangeText={(text) => setEmployeeCode(text)}
					editable={false}
				></TextInput>
			</View>
			<View style={styles.formControl}>
				<Text style={styles.label}>Họ và tên</Text>
				<TextInput
					autoFocus={true}
					style={styles.input}
					value={employeeName}
					onChangeText={(text) => setEmployeeName(text)}
					placeholder="Nhập họ và tên"
				></TextInput>
			</View>
			<View style={styles.formControl}>
				<Text style={styles.label}>Giới tính</Text>

				<View style={styles.select}>
					<Picker
						selectedValue={gender}
						onValueChange={(itemValue, itemIndex) => {
							setGender(itemValue);
                            setGenderName(genders[itemIndex].label)
						}}
						style={{ fontWeight: "bold" }}
					>
						{genders.map((x, index) => (
							<Picker.Item key={index} label={x.label} value={x.value} />
						))}
					</Picker>
				</View>
			</View>
			{/* <View style={styles.formControl}>
				<Text style={styles.label}>Ngày sinh</Text>
				<View style={styles.select}>
					<Text style={styles.label}>{new Date(birthday).toString()}</Text>
				</View>
				<RNDateTimePicker
					mode="date"
					onChange={(value) => {
						setBirthday(new Date(value.nativeEvent.timestamp));
					}}
					value={birthday}
				/>
			</View> */}

			<View style={styles.formControl}>
				<Text style={styles.label}>Số điện thoại</Text>
				<TextInput
					style={styles.input}
					value={phoneNumber}
					onChangeText={(text) => setPhoneNumber(text)}
					placeholder="Nhập số điện thoại"
				></TextInput>
			</View>
			<View style={styles.formControl}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					value={email}
					onChangeText={(text) => setEmail(text)}
					placeholder="Nhập email"
				></TextInput>
			</View>
			<Button
				title="Thêm"
				onPress={() => addEmployee()
				}
			></Button>
			{/* <Button title="Thêm" ></Button> */}
		</View>
	);
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
