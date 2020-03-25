import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
	bold: {
		fontFamily: "open-sans-bold"
	},
	text: {
		fontFamily: "open-sans"
	}
});

export const height = () => Dimensions.get("window").height;
export const width = () => Dimensions.get("window").width;
