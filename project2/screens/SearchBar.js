import React, {useState, useRef} from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SearchModel from "../components/base/SearchModel";
import axios from "axios";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";
const _ = require('lodash');

let timeOutId;
// const debounce = (func, delay) => {
//     return (...args) => {
//         if(timeOutId) clearTimeout(timeOutId);
//         timeOutId = setTimeout(() => {
//             func.apply(null, args);
//         }, delay);
//     }
// }



export default function SearchBar(props) {
    const [keyword, setKeyword] = useState('')
    const [data, setData] = useState([])
    const [notFound, setNotFound] = useState('')
    const [visible, setVisible] = useState(false)

    

    const handleChange = ({nativeEvent}) => {
        const {text} = nativeEvent;
        setKeyword(text);
        debounceSearch(text);
        // setVisible(true)
    }

    const debounceSearch = useRef(_.debounce((nextValue) => handleSearch(nextValue), 1000)).current;


    const handleSearch = async (value) => {
        console.log("searching");
        try {
			var queryStr = Convert.objectToQueryString({
				q: value
			});
            console.log(value)
			var res = await axios.get(`${Config.BaseUrl}/employees?${queryStr}`);
			const data = res.data;
            console.log(data);
			setData(data);
            setNotFound('')
		} catch (err) {
            setNotFound('Có lỗi xảy ra vui lòng thử lại!')
			console.log(err);
		}
    }

	return (
        <>
            <View style={styles.container}>
			<TextInput
				autoFocus={true}
				style={styles.input}
				value={keyword}
				onChange={handleChange}
				placeholder="Tìm kiếm mã nhân viên, số điện thoại, email"
			></TextInput>
		</View>
        <SearchModel visible={visible} data={data} notFound={notFound}></SearchModel>
        </>
		
	);
}

const styles = StyleSheet.create({
    container: {
		backgroundColor: "#fff",
		height: "100%",
	},
    input: {
        marginTop: 16,
		borderColor: "#EBF0FF",
		borderWidth: 1,
		borderRadius: 4,
		marginBottom: 12,
		marginLeft: 16,
		marginRight: 16,
		height: 48,
		padding: 16,
	},
})