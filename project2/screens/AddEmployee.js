import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
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
export default function AddEmployee(props) {
	const [EmployeeCode, setEmployeeCode] = useState(null);
	const [EmployeeName, setEmployeeName] = useState("");
	const [PhoneNumber, setPhoneNumber] = useState("088888888");
	const [Email, setEmail] = useState("a@gmail.com");
	const [Gender, setGender] = useState(GenderEnum.male);
	const [birthday, setBirthday] = useState(new Date());
    const [reload, setReload] = useState(false); 
	const [Genders, setGenders] = useState([
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
    const [positions, setPositions] = useState([]);
    const [PositionId, setPositionId] = useState([]);
    useEffect(async () => {
        props.navigation.setOptions({
			title: "Thêm nhân viên mới",
		});
		// Update the document title using the browser API
        try {
            var res = await axios.get(
                `${Config.BaseUrl}/positions`
            );
            setPositions(res.data);
        } catch (err) {
            console.log(err);
        }
	}, []);

    useEffect(() => {
		setPositionId(positions && positions.length > 0 && positions[0].PositionId)
	}, [positions]);

	useEffect(async () => {
		
		// Update the document title using the browser API
		switch (props.route.params.mode) {
			case ModeEnum.add: {
				try {
					var res = await axios.get(
						`${Config.BaseUrl}/employees?_limit=1&_page=1&_sort=CreatedTime&_order=desc`
					);
                    console.log("Lấy mã nv thành công", res.data[0])
						setEmployeeCode('NV-' + (parseInt(res.data[0].EmployeeCode.split('NV-')[1]) + 1));
						setEmployeeName('');
						setEmail('');
						setPhoneNumber('');
						setGender(GenderEnum.male);
						setGender(positions && positions.length > 0 && positions[0].PositionId);
				} catch (err) {
					console.log(err);
				}
			}
		}
	}, [props.route.params, reload]);

    
    let addEmployee = async function() {
        let employee = {
            EmployeeCode: EmployeeCode,
            EmployeeName: EmployeeName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Gender: Gender,
            DepartmentId: props.route.params.department.DepartmentId,
            PositionId: PositionId,
            id: Convert.broofa(),
            CreatedTime: new Date()
        }
        console.log(employee)
        try {
            var res = await axios.post(
                `${Config.BaseUrl}/employees`, employee
            );
            console.log(res.data)
            setReload(prev => !prev);
            Toast.show({
                type: 'success',
                text1: 'Thêm nhân viên thành công!'
              });
        } catch (err) {
            console.log(err);
        }
    }
	return (
        <ScrollView>
            <View style={styles.container}>
			<View style={styles.formControl}>
				<Text style={styles.label}>Mã nhân viên</Text>
				<TextInput
					style={styles.input}
					placeholder="Nhập mã nhân viên"
					value={EmployeeCode}
					onChangeText={(text) => setEmployeeCode(text)}
					editable={false}
				></TextInput>
			</View>
			<View style={styles.formControl}>
				<Text style={styles.label}>Họ và tên</Text>
				<TextInput
					autoFocus={true}
					style={styles.input}
					value={EmployeeName}
					onChangeText={(text) => setEmployeeName(text)}
					placeholder="Nhập họ và tên"
				></TextInput>
			</View>
			<View style={styles.formControl}>
				<Text style={styles.label}>Giới tính</Text>

				<View style={styles.select}>
					<Picker
						selectedValue={Gender}
						onValueChange={(itemValue, itemIndex) => {
							setGender(itemValue);
                            setGenderName(Genders[itemIndex].label)
						}}
						style={{ fontWeight: "bold" }}
					>
						{Genders.map((x, index) => (
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
					value={PhoneNumber}
					onChangeText={(text) => setPhoneNumber(text)}
					placeholder="Nhập số điện thoại"
				></TextInput>
			</View>
			<View style={styles.formControl}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					value={Email}
					onChangeText={(text) => setEmail(text)}
					placeholder="Nhập Email"
				></TextInput>
			</View>
            <View style={styles.formControl}>
				<Text style={styles.label}>Chức vụ</Text>

				<View style={styles.select}>
					<Picker
						selectedValue={PositionId}
						onValueChange={(itemValue, itemIndex) => {
							setPositionId(itemValue);
						}}
						style={{ fontWeight: "bold" }}
					>
						{positions.map((x, index) => (
							<Picker.Item key={index} label={x.PositionName} value={x.PositionId} />
						))}
					</Picker>
				</View>
			</View>
			<Button
				title="Thêm"
				onPress={() => addEmployee()
				}
			></Button>
			{/* <Button title="Thêm" ></Button> */}
		</View>
        </ScrollView>
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
