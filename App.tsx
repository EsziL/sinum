import 'expo-dev-client';
import { Animated, View, Text, StyleSheet, Pressable, Dimensions, ActivityIndicator, ViewStyle, Image, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState, useRef } from 'react';
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';
import { listDir, writeFile, buildDistro } from "./src/main/Linux";
import { LinearGradient } from 'expo-linear-gradient';

interface DistroBtnProps {
	children: React.ReactNode;
	onPress?: () => void;
	style?: object;
}

const DistroButton: React.FC<DistroBtnProps> = ({ children, onPress, style }) => {
	const [pressed, setPressed] = useState(false);

	const bgColorAnim = useRef(new Animated.Value(0)).current;

	const backgroundColor = bgColorAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["#261f2e", "#17121c"],
	});

	const handlePressIn = ()=>{
		setPressed(true);
		Animated.timing(bgColorAnim, {
			toValue: 1,
			duration: 100,
			useNativeDriver: false,
		}).start();
	};
	const handlePress = () => { if(onPress) onPress(); };
	const handlePressOut = ()=>{
		setPressed(false);
		Animated.timing(bgColorAnim, {
			toValue: 0,
			duration: 100,
			useNativeDriver: false,
		}).start();
		handlePress();
	};


	return (
    <Animated.View
      onTouchStart={handlePressIn} // Equivalent of onPressIn
      onTouchEnd={handlePressOut}
      style={[
        styles.distroBtn,
        { backgroundColor },
		style // Apply animated background color
      ]}
    >
      {children}
    </Animated.View>
  );
};

interface NavBarBtnProps {
	children: React.ReactNode;
	
}
 
const NavBarButton: React.FC<NavBarBtnProps> = ({ children }) => {
	const [pressed, setPressed] = useState(false);

	const fontSizeAnim = useRef(new Animated.Value(16)).current;

	const handlePressIn = ()=>{
		setPressed(true);
		Animated.timing(fontSizeAnim, {
			toValue: 14,
			duration: 50,
			useNativeDriver: false,
		}).start();
	};
	const handlePressOut = ()=>{
		setPressed(false);
		Animated.timing(fontSizeAnim, {
			toValue: 16,
			duration: 50,
			useNativeDriver: false,
		}).start();
	};

	

	return (
		<Pressable
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			style={styles.navBtn}
		>
			<Animated.Text style={[
					styles.navbarTxt,
				{ fontSize: fontSizeAnim }
				]}>
				{children}
			</Animated.Text>
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
				"Nexa-heavy": require("./src/assets/fonts/nexa/Nexa-Heavy.ttf"), 
				"Nexa-extralight": require("./src/assets/fonts/nexa/Nexa-ExtraLight.ttf"),
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

	const archBuild = async () => { await buildDistro("arch"); };

	return (
		<View style={styles.container}>
			<StatusBar
			backgroundColor={"#09060d"}
			barStyle={"light-content"}
			/>
			<Text style={styles.mainTxt}>Create a system</Text>
			<LinearGradient
				colors={['rgba(9,6,13,1)', 'rgba(9,6,13,0)']}
				style={styles.colGradientTop}
			/>
			<ScrollView style={styles.col} contentContainerStyle={styles.col2}>
				<DistroButton onPress={archBuild} style={{ marginTop: 20 }}>
					<Text style={styles.distroBtnTxt}>Arch</Text>
					<Text style={styles.distroBtnCred}>The Arch Linux community</Text>
					<Text style={styles.distroBtnVersion}>v2024.09.01</Text>
					<Image source={require('./src/assets/arch.png')} style={styles.distroImg}></Image>
				</DistroButton>
				<DistroButton>
					<Text style={styles.distroBtnTxt}>Debian</Text>
					<Text style={styles.distroBtnCred}>The Debian Project</Text>
					<Text style={styles.distroBtnVersion}>v12.7</Text>
					<Image source={require('./src/assets/debian.png')} style={styles.distroImg}></Image>
				</DistroButton>
				<DistroButton>
					<Text style={styles.distroBtnTxt}>Ubuntu</Text>
					<Text style={styles.distroBtnCred}>Canonical</Text>
					<Text style={styles.distroBtnVersion}>v24.04.1 LTS</Text>
					<Image source={require('./src/assets/ubuntu.png')} style={styles.distroImg}></Image>
				</DistroButton>
				<DistroButton style={{ marginBottom: 20 }}>
					<Text style={styles.distroBtnTxt}>Fedora</Text>
					<Text style={styles.distroBtnCred}>Fedora Project</Text>
					<Text style={styles.distroBtnVersion}>v40</Text>
					<Image source={require('./src/assets/fedora.png')} style={styles.distroImg}></Image>
				</DistroButton>
			</ScrollView>
			<LinearGradient
				colors={['rgba(9,6,13,0)', 'rgba(9,6,13,1)']}
				style={styles.colGradientBottom}
			/>
      		<View style={styles.navbar}>
				<NavBarButton>
					<Text style={styles.navbarTxt}>Create</Text>
				</NavBarButton>
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
		height: "80%",
		width: "100%",
		flexDirection: "column",
		position: "absolute",
		top: "10%",
	},
	col2: {
		rowGap: 20,
		flexGrow: 1,
		alignItems: "center",
	},
	colGradientTop: {
		height: 20, 
		position: "absolute",
		width: "100%",
		zIndex: 1,
		top: "10%",
	},
	colGradientBottom: {
		height: 20, 
		position: "absolute",
		width: "100%",
		zIndex: 1,
		top: "87.5%",
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
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: 20, 
	} as ViewStyle,
	distroBtnCred: {
		color: "white",
		fontFamily: "Montserrat-thin",
		fontSize: 1.5*vh,
	},
	distroBtnVersion: {
		color: "white",
		fontFamily: "Montserrat-thin",
		position: "relative",
		top: 45,
	},
	distroImg: {
		width: 100,
		height: 100,
		resizeMode: "contain",
		position: "relative",
		top: -65,
		left: 150,
	},
  	navbar: {
		display: "flex",
    	flexDirection: "row",
		backgroundColor: "#261f2e",
		width: "90%",
		height: 6 * vh,
		position: "absolute",
		top: "91%",
		left: "5%",
		borderRadius: 999,
	},
	navbarTxt: {
		color: "white",
		fontFamily: "Montserrat-thin",
	},
	navBtn: {
		height: "100%",
		width: "33.333%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 2 * vh,
	},
	mainTxt: {
		color: "white",
		fontFamily: "Nexa-heavy",
		zIndex: 2,
		fontSize: 4.5 * vh,
		width: "100%",
		textAlign: "center",
		position: "absolute",
		top: "3.5%",
	},
});

export default App;
