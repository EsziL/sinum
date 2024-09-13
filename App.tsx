import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';


const App = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		async function loadFonts() {
			await Font.loadAsync({
				"Montserrat-normal": require("./src/assets/fonts/montserrat/static/Montserrat-Regular.ttf"),
				"Montserrat-thin": require("./src/assets/fonts/montserrat/static/Montserrat-Thin.ttf"),
			});
			setFontsLoaded(true);
		}
		loadFonts();
	}, []);

	if (!fontsLoaded) {
		return <ActivityIndicator size="large" color="#ffffff" />;
	  }

	return (
		<View style={styles.container}>
			<View style={styles.col}>
				<TouchableOpacity style={styles.distroBtn}>
					<Text style={styles.distroBtnTxt}>Arch</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const { width, height } = Dimensions.get("window");
const vh = height / 100;
const vw = width / 100;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#09060d",
    width: "100%",
    height: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	col: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "80%", // Takes 80% of the parent's height
		width: "100%",
		position: "absolute",
		top: "10%",
	},

	distroBtnTxt: {
		color: "white",
		fontFamily: "Montserrat-normal",
		fontSize: 5 * vh,
		fontWeight: "500",
	},

	distroBtn: {
		backgroundColor: "#261f2e",
		width: "80%",
		height: 20 * vh, // 20% of the viewport height
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
	},

});

export default App;
