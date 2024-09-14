import { View, Text, StyleSheet, Pressable, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';

interface DistroBtnProps {
	children: React.ReactNode;
}

const DistroButton: React.FC<DistroBtnProps> = ({ children }) => {
	const [pressed, setPressed] = useState(false);

	const handlePressIn = ()=>{setPressed(true);};
	const handlePressOut = ()=>{setPressed(false);};

	return (
		<Pressable
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			style={[
				styles.distroBtn,
				pressed ? styles.activeBtn : null,
			]}
		>
			{children}
		</Pressable>
	)

};

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
		// Add a background to the ActivityIndicator view to see if that renders the background
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#ffffff" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.col}>
				<DistroButton>
					<Text style={styles.distroBtnTxt}>Arch</Text>
				</DistroButton>
			</View>
      <View style={styles.navbar}>
			
      </View>
		</View>
	);
};

const { width, height } = Dimensions.get("window");
const vh = height / 100;
const vw = width / 100;

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#09060d", // Background for the loading screen
	},
	container: {
		flex: 1, 
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#09060d", // Main container background
	},
	col: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "80%",
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
		height: 20 * vh, 
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
	},
	activeBtn: {
		backgroundColor: "#000",
	},
  navbar: {
		display: "flex",
    flexDirection: "row",
		backgroundColor: "#261f2e",
		width: "100%",
		height: 6 * vh,
		position: "absolute",
		top: "94%",
	},
});

export default App;
