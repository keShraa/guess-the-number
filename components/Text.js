import React from "react";
import { Text as Tx, StyleSheet } from "react-native";

const Text = props => (
	<Tx style={{ ...props.style, ...styles.text }}>{props.children}</Tx>
);

const styles = StyleSheet.create({
	text: {
		fontFamily: "open-sans"
	}
});

export default Text;
