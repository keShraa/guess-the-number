import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

import Text from "../components/Text";
import Title from "../components/Title";
import MainButton from "../components/MainButton";

import success from "../assets/success.png";
import Colors from "../constants/colors";
import { height } from "../constants/styles";

const GameOverScreen = props => {
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		height()
	);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceHeight(height());
		};

		Dimensions.addEventListener("change", updateLayout);

		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<Title style={styles.title}>The Game is Over!</Title>
				{availableDeviceHeight > 700 ? (
					<View style={styles.imageContainer}>
						<Image
							source={success}
							style={styles.image}
							resizeMode="cover"
							fadeDuration={300}
						/>
					</View>
				) : null}
				<View style={styles.resultContainer}>
					<Text style={styles.resultText}>
						{"Your phone needed "}
						<Title style={styles.highlight}>
							{props.roundsNumber}
						</Title>
						{" rounds to guess the number "}
						<Title style={styles.highlight}>
							{props.userNumber}
						</Title>
					</Text>
				</View>
			</View>
			<View style={styles.containerButton}>
				<MainButton onPress={props.onRestart} color={Colors.accent}>
					NEW GAME
				</MainButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	container: {
		alignItems: "center",
		marginBottom: 60
	},
	title: {
		fontSize: 20
	},
	containerButton: {
		width: "75%",
		position: "absolute",
		bottom: 40
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: 40
	},
	resultText: {
		textAlign: "justify"
	},
	highlight: {
		fontSize: 20,
		color: Colors.primary
	},
	imageContainer: {
		borderRadius: 125,
		borderWidth: 3,
		borderColor: "black",
		width: 250,
		height: 250,
		overflow: "hidden",
		marginVertical: 30
	},
	image: {
		width: "100%",
		height: "100%"
	}
});

export default GameOverScreen;
