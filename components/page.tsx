import React, { useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useDispatch } from "react-redux";
import {
  addItem,
  changeColor,
  editItem,
  editListTitle,
  markAsDone,
  removeItem,
} from "../store/actions/listsActions";
import Item from "../types/item";
import PageType from "../types/page";
import AddItem from "./addItem";
import ColorPickerIcon from "./ColorPicker/colorPickerIcon";
import ColorPickerModal from "./ColorPicker/colorPickerModal";
import EditModal from "./editModal";
import ItemList from "./itemList";
import PageTitle from "./pageTitle";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  page: PageType;
}

export function Page(props: Props) {
  const { page } = props;
  const [itemForEdit, setItemForEdit] = useState(new Item());
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isColorPickerModalOpen, setIsColorPickerModalOpen] = useState(false);

  const dispatch = useDispatch();

  const { items, colors } = page;

  const addItemToList = (item: Item) => {
    dispatch(addItem(page, item));
  };

  const markItemAsDone = (item: Item) => {
    dispatch(markAsDone(item));
  };

  const removeItemFromList = (item: Item) => {
    dispatch(removeItem(page, item));
  };

  const editPageTitle = (title: string) => {
    dispatch(editListTitle(page, title));
  };

  const editItemInList = (item: Item) => {
    dispatch(editItem(page, item));
  };

  const changePageColor = (color: string) => {
    dispatch(changeColor(page, color));
  };

  const openEditModal = (item: Item) => {
    setItemForEdit(item);
    setIsItemModalOpen(true);
  };

  const addImageToItem = (imageUri: string) => {
    const item = { ...itemForEdit };
    item.images.push(imageUri);
    editItemInList(item);
  };

  const removeImageFromItem = (imageUri: string) => {
    let item = { ...itemForEdit };
    item.images = item.images.filter((uri) => uri !== imageUri);
    editItemInList(item);
  };

  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  return (
    <AnimatedLinearGradient
      style={styles.container}
      colors={colors.PRIMARY_GRADIENT}
    >
      <View style={styles.titleRow}>
        {/* Page Title */}
        <View style={styles.pageTitle}>
          <PageTitle
            title={page.title}
            colors={page.colors}
            onEditTitle={editPageTitle}
          />
        </View>

        {/* Color Picker Icon */}
        <View>
          <ColorPickerIcon
            color={page.colors.PRIMARY_DARK_1}
            onPress={() => setIsColorPickerModalOpen(true)}
          />
        </View>
      </View>

      {/* Add New Item */}
      <AddItem onNewItem={addItemToList} colors={colors} />

      {/* List of Items */}
      <ItemList
        items={items}
        onDone={markItemAsDone}
        onDelete={removeItemFromList}
        onEdit={openEditModal}
        colors={page.colors}
      />

      {/* Item Modal */}
      <EditModal
        item={itemForEdit}
        show={isItemModalOpen}
        close={() => setIsItemModalOpen(false)}
        save={editItemInList}
        colors={colors}
        onAddImage={addImageToItem}
        onRemoveImage={removeImageFromItem}
      />

      {/* Color Picker Modal */}
      <ColorPickerModal
        show={isColorPickerModalOpen}
        close={() => setIsColorPickerModalOpen(false)}
        colors={colors}
        colorSelected={changePageColor}
      />
    </AnimatedLinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  pageTitle: {
    flex: 1,
  },
});
