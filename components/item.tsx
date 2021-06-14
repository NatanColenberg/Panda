import moment from "moment";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PageColors from "../colors/pageColors";
import Item from "../types/item";

interface Props {
  item: Item;
  onEdit: (item: Item) => void;
  colors: PageColors;
}

export default function ListItem(props: Props) {
  const { item, onEdit, colors } = props;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: colors.PRIMARY_LIGHT_2,
      marginVertical: 3,
      padding: 5,
      paddingLeft: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    text: {
      flex: 1,
      fontSize: 20,
      flexWrap: "nowrap",
    },
    done: {
      textDecorationLine: "line-through",
    },
    date: {
      fontSize: 11,
      alignSelf: "flex-end",
    },
  });

  const getTextStyle = (item: Item): Object => {
    let style = {
      flex: 1,
      fontSize: 20,
      flexWrap: "nowrap",
      textDecorationLine: "none",
      color: colors.PRIMARY_DARK_2,
    };
    if (item.isDone) {
      style.textDecorationLine = "line-through";
      style.color = "#555";
    }

    return style;
  };

  return (
    <TouchableWithoutFeedback key={item.key} onPress={() => onEdit(item)}>
      <View style={styles.container}>
        <Text style={getTextStyle(item)}>• {item.title}</Text>
        <Text style={styles.date}>created {moment(item.date).fromNow()}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
