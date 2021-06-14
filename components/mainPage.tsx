import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Page as PageComp } from "./page";
import PagesList from "./pageTabs";
import { useDispatch, useSelector } from "react-redux";
import Page from "../types/page";
import { useState } from "react";
import { removeList } from "../store/actions/listsActions";

export default function MainPage() {
  const lists: Page[] = useSelector((state: any) => state).lists;
  const [selectedList, setSelectedList] = useState(lists[0]);

  const dispatch = useDispatch();

  const remove = (list: Page) => {
    const otherList = lists.find((l) => l !== list);
    if (otherList) {
      setSelectedList(otherList);
    }
    dispatch(removeList(list));
  };

  const deleteListAlert = (list: Page) => {
    if (lists.length < 2) {
      return;
    }
    const listNameIfExist = list.title ? `the '${list.title}' ` : "a";
    Alert.alert(
      "Delete a List",
      `You are about to Delete ${listNameIfExist} list, Are you Sure?`,
      [
        {
          text: "Cancel",
        },
        { text: "OK", onPress: () => remove(list) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <PageComp page={selectedList} />
      <PagesList
        lists={lists}
        onSelectedList={setSelectedList}
        onRemoveList={deleteListAlert}
        selectedList={selectedList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
