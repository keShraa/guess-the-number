import React from "react";
import { View, StyleSheet } from "react-native";

import Title from "../components/Title";

import Colors from "../constants/colors";

const NumberContainer = props => {
	return (
		<View style={{ ...styles.container, ...props.style }}>
			<Title style={styles.number}>{props.children}</Title>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: Colors.accent,
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	number: {
		color: Colors.accent
	}
});

export default NumberContainer;
