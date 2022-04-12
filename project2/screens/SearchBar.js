import React, {useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import SearchModel from "../components/base/SearchModel";
import axios from "axios";
import Convert from "../commons/utils/convert";
import { Config } from "../config/config";
const _ = require('lodash');
import { useIsFocused } from "@react-navigation/native";


export default function SearchBar(props) {
    const [keyword, setKeyword] = useState('')
    const [data, setData] = useState([])
    const [notFound, setNotFound] = useState('')
    const [visible, setVisible] = useState(true)
    const textInputRef = useRef(null);
    const isFocused = useIsFocused();

    const handleChange = ({nativeEvent}) => {
        const {text} = nativeEvent;
        setKeyword(text);
        debounceSearch(text);
    }
    const reloadScreen = function () {
		handleSearch(keyword)
	};

    const debounceSearch = useRef(_.debounce((nextValue) => handleSearch(nextValue), 1000)).current;


    const handleSearch = async (value) => {
        try {
			var queryStr = Convert.objectToQueryString({
				q: value
			});
			var res = await axios.get(`${Config.BaseUrl}/employees?${queryStr}`);
			const data = res.data;
			setData(data);
            setNotFound('')
		} catch (err) {
            setNotFound('Có lỗi xảy ra vui lòng thử lại!')
			console.log(err);
		}
    }

    useEffect(async () => {
        textInputRef.current.focus();
	}, [ isFocused]);

	return (
        <>
            <View style={styles.container}>
                <TextInput
                 ref={textInputRef} 
                    autoFocus={true}
                    style={styles.input}
                    value={keyword}
                    onChange={handleChange}
                    placeholder="Tìm kiếm mã nhân viên, số điện thoại, email"
                    clearButtonMode="always"
                ></TextInput>
                <TouchableOpacity
                onPress={() => setKeyword('')}
                style={styles.clear}
                ><Text>x</Text></TouchableOpacity>
            </View>
            <SearchModel reloadScreen={reloadScreen} visible={true} data={data} notFound={notFound}></SearchModel>
        </>
		
	);
}

const styles = StyleSheet.create({
    clear: {
        height: 20,
        width: 20,
        backgroundColor: "#000",
        zIndex: 10,
        position: "absolute"
    },
    container: {
		backgroundColor: "#fff",
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