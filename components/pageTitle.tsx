import Color from "color";
import React, { useState } from "react";
import { useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import PageColors from "../colors/pageColors";

interface Props {
  title: string;
  colors: PageColors;
  onEditTitle: (title: string) => void;
}

export default function PageTitle(props: Props) {
  const { title, colors, onEditTitle } = props;
  const [editedTitle, setEditedTitle] = useState(title);

  useEffect(() => {
    setEditedTitle(props.title);
  }, [props.title]);

  const styles = StyleSheet.create({
    container: {
      marginTop: 60,
      padding: 10,
    },
    textInput: {
      fontSize: 30,
      color: Color(colors.PRIMARY).isLight()
        ? colors.PRIMARY_DARK_2
        : colors.PRIMARY_LIGHT_2,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Add a Title..."
        placeholderTextColor={
          Color(colors.PRIMARY).isLight()
            ? colors.PRIMARY_DARK_1
            : colors.PRIMARY_LIGHT_1
        }
        value={editedTitle}
        onChangeText={setEditedTitle}
        onBlur={() => onEditTitle(editedTitle)}
      />
    </View>
  );
}
