import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import Title from "../components/Title";

import Colors from "../constants/colors";

const Header = props => {
	return (
		<View
			style={{
				...styles.baseHeader,
				...Platform.select({
					ios: styles.headerIOS,
					android: styles.headerAndroid
				})
			}}
		>
			<Title style={styles.headerTitle}>{props.title}</Title>
		</View>
	);
};

const styles = StyleSheet.create({
	baseHeader: {
		width: "100%",
		height: 90,
		paddingTop: 36,
		alignItems: "center",
		justifyContent: "center"
	},
	headerIOS: {
		backgroundColor: "white",
		borderBottomColor: "#ccc",
		borderBottomWidth: 1
	},
	headerAndroid: {
		backgroundColor: Colors.primary
	},
	headerTitle: {
		color: Platform.OS === "android" ? "white" : Colors.primary,
		fontSize: 18
	}
});

export default Header;
