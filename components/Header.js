import React from "react";
import { View, StyleSheet } from "react-native";

import Title from "../components/Title";

import Colors from "../constants/colors";

const Header = props => {
	return (
		<View style={styles.header}>
			<Title style={styles.headerTitle}>{props.title}</Title>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 90,
		paddingTop: 36,
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	headerTitle: {
		color: "white",
		fontSize: 18
	}
});

export default Header;
