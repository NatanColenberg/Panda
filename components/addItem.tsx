import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import PageColors from "../colors/pageColors";
import Item from "../types/item";
import { AntDesign } from "@expo/vector-icons";
import Color from "color";

interface Props {
  onNewItem: (item: Item) => void;
  colors: PageColors;
}

export default function AddItem(props: Props) {
  const { onNewItem, colors } = props;
  const [text, setText] = useState("");

  const addNewItem = () => {
    if (text === "") {
      return;
    }

    const newItem = new Item(text);
    onNewItem(newItem);
    setText("");
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingTop: 20,
      paddingHorizontal: 10,
    },
    textInput: {
      flex: 1,
      borderBottomWidth: 2,
      borderBottomColor: colors.PRIMARY_DARK_2,
      fontSize: 20,
      marginBottom: 10,
      color: Color(colors.PRIMARY).isLight()
        ? colors.PRIMARY_DARK_2
        : colors.PRIMARY_LIGHT_2,
    },
    icon: {
      marginVertical: 10,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Add a new item..."
        placeholderTextColor={
          Color(colors.PRIMARY).isLight()
            ? colors.PRIMARY_DARK_1
            : colors.PRIMARY_LIGHT_1
        }
        value={text}
        onChangeText={setText}
        blurOnSubmit={false}
        onSubmitEditing={addNewItem}
      />
      <TouchableOpacity style={styles.icon} onPress={addNewItem}>
        <AntDesign name="pluscircle" size={40} color={colors.PRIMARY_DARK_2} />
      </TouchableOpacity>
    </View>
  );
}
