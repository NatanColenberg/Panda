import Color from "color";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { addList } from "../store/actions/listsActions";
import Page from "../types/page";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  lists: Page[];
  selectedList: Page;
  onSelectedList: (list: Page) => void;
  onRemoveList: (list: Page) => void;
}

export default function PageTabs(props: Props) {
  const { lists, selectedList, onSelectedList, onRemoveList } = props;
  const dispatch = useDispatch();

  const createNewList = () => {
    const newList = new Page();
    dispatch(addList(newList));
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: "black",
      height: 60,
      paddingBottom: 10,
    },
    page: {
      padding: 10,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    addPageButton: {
      justifyContent: "center",
      marginHorizontal: 30,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        {lists.map((list) => (
          <TouchableOpacity
            key={list.key}
            style={{
              ...styles.page,
              backgroundColor: list.colors.PRIMARY,
              width: list === selectedList ? 140 : 70,
            }}
            onPress={() => onSelectedList(list)}
            onLongPress={() => onRemoveList(list)}
          ></TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        key="Add_New_List"
        style={styles.addPageButton}
        onPress={() => createNewList()}
      >
        <AntDesign name="pluscircleo" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
