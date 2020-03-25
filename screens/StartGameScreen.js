import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Dimensions
} from "react-native";

import Title from "../components/Title";
import Text from "../components/Text";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

import Colors from "../constants/colors";
import { width } from "../constants/styles";

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const [buttonWidth, setButtonWidth] = useState(width() / 3.1);

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(width() / 3.1);
		};

		Dimensions.addEventListener("change", updateLayout);
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid number!",
				"Number has to be a number between 1 and 99.",
				[
					{
						text: "Okay",
						style: "destructive",
						onPress: resetInputHandler
					}
				]
			);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You selected</Text>
				<NumberContainer style={{ marginVertical: 10 }}>
					<Text>{selectedNumber}</Text>
				</NumberContainer>
				<View style={styles.buttonStart}>
					<MainButton
						onPress={() => props.onStartGame(selectedNumber)}
						color={Colors.primary}
					>
						START GAME
					</MainButton>
				</View>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={30}
			>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<View style={styles.screen}>
						<Title style={styles.title}>Start a New Game!</Title>
						<Card style={styles.card}>
							<Text>Select a Number</Text>
							<Input
								style={styles.input}
								blurOnSubmit
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<MainButton
									onPress={resetInputHandler}
									color={Colors.accent}
									style={{ width: buttonWidth }}
								>
									RESET
								</MainButton>
								<MainButton
									onPress={confirmInputHandler}
									color={Colors.primary}
									style={{ width: buttonWidth }}
								>
									CONFIRM
								</MainButton>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	title: {
		marginVertical: 10
	},
	card: {
		width: "80%",
		minWidth: 300,
		alignItems: "center"
	},
	input: {
		width: 50,
		textAlign: "center",
		marginBottom: 20
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between"
	},
	buttonStart: {
		width: "100%"
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center",
		minWidth: 300,
		width: "80%"
	}
});

export default StartGameScreen;
