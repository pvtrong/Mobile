import React, {useEffect}from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert  } from "react-native";
import { GenderEnum } from "../commons/enums/gender.enum";
import Swipeout from 'react-native-swipeout';
import axios from 'axios'
import { Config } from "../config/config";
export default function EmployeeListItem(props) {
	const { employee, onPress, activeSwipe, setActiveSwipe, reloadScreen } = props;
    let image;
	  switch(employee.Gender.toString()){
          case GenderEnum.female.toString(): {
              image = require("../assets/image/woman.png")
              break;
          }
          case GenderEnum.male.toString(): {
            image = require("../assets/image/man.png")
            break;
        }
        default: {
            image = require("../assets/image/man.png")
            break;
        }
      }
      var swipeSettings = {
        autoClose: true,
        onOpen: () => {
            if(employee.id !== activeSwipe) setActiveSwipe(employee.id)
        },
        onClose: () => {

        },
        right: [{onPress: () => {
            deleteEmployee()
        }, text: 'Delete', type: 'delete'}],
        rowId: employee.id,
    }

    const deleteEmployee = async function(){
        try {
            var res = await axios.delete(`${Config.BaseUrl}/employees/${employee.id}`)
            reloadScreen()
        } catch (error) {
            console.log(error)
        }
    }


	return (
        <Swipeout style={styles.swipe} {...swipeSettings} close={employee.id !== activeSwipe}>
            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                <View style={styles.employeeItem}>
                <Image style={styles.employeeImage} source={image}></Image>
                    <Text style={styles.EmployeeName}>{employee.EmployeeName}</Text>
                    <Text style={styles.employeeJob}>{employee.PositionName}</Text>
                </View>
            </TouchableOpacity>
         </Swipeout>
	);
}

const styles = StyleSheet.create({
	employeeItem: {
		width: "100%",
		alignItems: "center",
		flex: 1,
		padding: 16,
        flexDirection: 'row'
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
        marginRight: 20
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
