import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MainButton = props => {
	const styles = StyleSheet.create({
		button: {
			backgroundColor: props.color,
			paddingVertical: 12,
			paddingHorizontal: 30,
			borderRadius: 25
		},
		text: {
			color: "white",
			fontFamily: "open-sans",
			fontSize: 16,
			textAlign: "center"
		}
	});

	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<View style={{ ...styles.button, ...props.style }}>
				<Text style={styles.text}>{props.children}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default MainButton;
