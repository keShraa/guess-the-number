import React from "react";
import { Text as Tx, StyleSheet } from "react-native";

const Title = props => (
	<Tx style={{ ...styles.title, ...props.style }}>{props.children}</Tx>
);

const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 20
	}
});

export default Title;
