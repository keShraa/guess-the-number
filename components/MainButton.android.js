import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform
} from "react-native";

const MainButton = props => {
	const styles = StyleSheet.create({
		buttonContainer: {
			borderRadius: 25,
			overflow: "hidden"
		},
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

	let ButtonComponent = TouchableOpacity;

	if (Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}

	return (
		<View style={styles.buttonContainer}>
			<ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
				<View style={{ ...styles.button, ...props.style }}>
					<Text style={styles.text}>{props.children}</Text>
				</View>
			</ButtonComponent>
		</View>
	);
};

export default MainButton;
