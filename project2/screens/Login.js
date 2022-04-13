import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
} from "react-native";
import { Config } from "../config/config";

export default function Login({setIsSignedIn}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const passwordInput = useRef(null);
    const emailInput = useRef(null);
    const btnLogin = useRef(null);
    const loginOnClick = async () => {
        if(!email) {
            emailInput.current.focus();
            return;
        }
        if(!password) {
            passwordInput.current.focus();
            return;
        }
        try {
            console.log(email, password)
			var res = await axios.post(`${Config.BaseUrl}/login`, {
                email: email,
                password: password
            });
            await SecureStore.setItemAsync("accessToken", res.data.accessToken);
            setIsSignedIn(true)
		} catch (err) {
			console.log(err);
		}
    }

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("../assets/image/logo.png")}
			/>

			<StatusBar style="auto" />
			<View style={styles.inputView}>
				<TextInput
                ref={emailInput}
					autoFocus={true}
					style={styles.TextInput}
					placeholder="Email."
					placeholderTextColor="#003f5c"
					onChangeText={(email) => setEmail(email)}
                    onSubmitEditing={() => passwordInput.current.focus()}
				/>
			</View>

			<View style={styles.inputView}>
				<TextInput
                    ref={passwordInput}
					style={styles.TextInput}
					placeholder="Password."
					placeholderTextColor="#003f5c"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
                    onSubmitEditing={() => {loginOnClick()}}
				/>
			</View>

			<TouchableOpacity>
				<Text style={styles.forgot_button}>Forgot Password?</Text>
			</TouchableOpacity>

			<TouchableOpacity ref={btnLogin} onPress={loginOnClick} style={styles.loginBtn}>
				<Text style={styles.loginText}>LOGIN</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center",
	},

	image: {
		marginBottom: 40,
		height: 150,
		width: 150,
	},

	inputView: {
		height: 45,
		marginBottom: 20,
		width: "100%",
		paddingHorizontal: 20,
	},

	TextInput: {
		borderColor: "#ccc",
		borderRadius: 4,
		borderWidth: 1,
		height: 50,
		flex: 1,
		paddingHorizontal: 16,
	},

	forgot_button: {
		height: 30,
		color: "#40BFFF",
	},

	loginBtn: {
		width: "80%",
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#40BFFF",
	},
	loginText: {
		color: "#fff",
	},
});
