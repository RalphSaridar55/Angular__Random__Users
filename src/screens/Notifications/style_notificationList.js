import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const styles = StyleSheet.create({
  chatsContainer: {
    backgroundColor:'#E9F3FF'
  },
  containerChat: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
  },
});
