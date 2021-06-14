import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import PageColors from "../../colors/pageColors";

interface Props {
  color: string;
  onPress: () => void;
}

const SIZE = 30;

export default function ColorPickerIcon(props: Props) {
  const { color, onPress } = props;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color,
      width: SIZE,
      height: SIZE,
      margin: 10,
      marginRight: 15,
      borderRadius: SIZE,
      borderWidth: 3,
      borderColor: "white",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    ></TouchableOpacity>
  );
}
