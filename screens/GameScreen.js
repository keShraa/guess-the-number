import React, { useState, useRef, useEffect } from "react";
import {
	View,
	StyleSheet,
	Alert,
	ScrollView,
	FlatList,
	Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenOrientation } from "expo";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Text from "../components/Text";
import MainButton from "../components/MainButton";

import Colors from "../constants/colors";
import { height, width } from "../constants/styles";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rand = Math.floor(Math.random() * (max - min)) + min;

	if (rand === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rand;
	}
};

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<Text style={{ opacity: 0.4 }}>#{listLength - itemData.index}</Text>
		<Text>{itemData.item}</Text>
	</View>
);

const GameScreen = props => {
	// LOCK ORIENTATION ON THIS SCREEN
	// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		height()
	);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceHeight(height());
		};

		Dimensions.addEventListener("change", updateLayout);

		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" }
			]);
			return;
		}

		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}

		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setPastGuesses(curPastGuesses => [
			nextNumber.toString(),
			...curPastGuesses
		]);
	};

	let gameControls = (
		<View style={{ alignItems: "center", marginTop: 10 }}>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.card}>
				<MainButton
					title="LOWER"
					onPress={nextGuessHandler.bind(this, "lower")}
					color={Colors.accent}
				>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton
					title="GREATER"
					onPress={nextGuessHandler.bind(this, "greater")}
					color={Colors.primary}
				>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
		</View>
	);

	if (availableDeviceHeight < 500) {
		gameControls = (
			<Card style={styles.controls}>
				<MainButton
					title="LOWER"
					onPress={nextGuessHandler.bind(this, "lower")}
					color={Colors.accent}
				>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<NumberContainer>{currentGuess}</NumberContainer>
				<MainButton
					title="GREATER"
					onPress={nextGuessHandler.bind(this, "greater")}
					color={Colors.primary}
				>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
		);
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			{gameControls}
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
				<FlatList
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	controls: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: height() > 600 ? 20 : 5,
		width: width() * 0.7,
		marginTop: 10
	},
	card: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: height() > 600 ? 20 : 5,
		width: 300,
		maxWidth: "80%"
	},
	listContainer: {
		flex: 1,
		width: width() > 350 ? "60%" : "80%"
	},
	list: {
		justifyContent: "flex-end",
		flexGrow: 1
	},
	listItem: {
		borderWidth: 1,
		borderColor: Colors.accent,
		borderRadius: 10,
		padding: 10,
		marginVertical: 2,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	}
});

export default GameScreen;
