import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { RowMap, SwipeListView, SwipeRow } from "react-native-swipe-list-view";

import PageColors from "../colors/pageColors";
import Item from "../types/item";
import ListItem from "./item";
import { AntDesign, Feather } from "@expo/vector-icons";

interface Props {
  items: Item[];
  onDone: (item: Item) => void;
  onDelete: (item: Item) => void;
  onEdit: (item: Item) => void;
  colors: PageColors;
}

export default function ItemList(props: Props) {
  const { items, onDone, onDelete, onEdit, colors } = props;

  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      marginHorizontal: 10,
    },
    actionButtonContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.PRIMARY_DARK_1,
      marginVertical: 3,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    actionButtonsLeftContainer: {
      flexDirection: "row",
    },
    actionButtonText: {
      fontSize: 20,
      color: "white",
    },
    noItemsMessage: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return items && items.length ? (
    <SwipeListView
      style={styles.container}
      data={items}
      renderItem={(data) => (
        <TouchableOpacity>
          <ListItem item={data.item} onEdit={onEdit} colors={colors} />
        </TouchableOpacity>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity onPress={() => onDelete(data.item)}>
            <Feather name="trash" size={24} color={colors.PRIMARY_LIGHT_1} />
          </TouchableOpacity>
          <View style={styles.actionButtonsLeftContainer}>
            <TouchableOpacity onPress={() => onDone(data.item)}>
              <Feather
                name="check-circle"
                size={24}
                color={
                  data.item.isDone ? colors.PRIMARY_LIGHT_1 : colors.PRIMARY
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      leftOpenValue={60}
      rightOpenValue={-60}
    />
  ) : (
    <View style={styles.noItemsMessage}>
      <Text>- No Items to display -</Text>
    </View>
  );
}
