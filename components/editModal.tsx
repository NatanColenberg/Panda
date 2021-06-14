import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Image,
} from "react-native";
import PageColors from "../colors/pageColors";
import Item from "../types/item";
import ImagesDisplay from "./ImagesDisplay/imagesDisplay";
import ItemActions from "./itemActions/itemActions";

interface Props {
  show: boolean;
  item: Item;
  close: () => void;
  save: (item: Item) => void;
  colors: PageColors;
  onAddImage: (imageUri: string) => void;
  onRemoveImage: (imageUri: string) => void;
}

const emptyItem = new Item();

export default function EditModal(props: Props) {
  const { show, item, close, save, colors, onAddImage, onRemoveImage } = props;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.PRIMARY_LIGHT_1,
      padding: 20,
    },
    buttonsContainer: {
      flexDirection: "row",
    },
    saveButton: {
      flex: 1,
      backgroundColor: colors.PRIMARY_DARK_1,
      alignItems: "center",
    },
    cancelButton: {
      flex: 1,
      backgroundColor: colors.PRIMARY,
      alignItems: "center",
    },
    buttonText: {
      fontSize: 15,
      padding: 15,
      color: colors.PRIMARY_LIGHT_1,
    },
    titleInput: {
      fontSize: 30,
      marginBottom: 10,
    },
    textInput: {
      fontSize: 20,
      marginBottom: 10,
    },
    smallText: {
      fontSize: 12,
      color: colors.DISABLED,
      marginBottom: 10,
    },
  });

  const [currentItem, setCurrentItem] = useState(item);

  useEffect(() => {
    setCurrentItem(item);
    return () => {
      setCurrentItem(emptyItem);
    };
  }, [show]);

  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={styles.container}>
        <TextInput
          style={styles.titleInput}
          value={currentItem.title}
          onChangeText={(title) => setCurrentItem({ ...currentItem, title })}
          placeholder="Add a Title..."
        />
        <Text style={styles.smallText}>
          Created {moment(item.date).fromNow()}
        </Text>
        <TextInput
          style={styles.textInput}
          value={currentItem.note}
          multiline={true}
          onChangeText={(note) => setCurrentItem({ ...currentItem, note })}
          placeholder="Add a Note..."
        />
        {item && item.images.length > 0 && (
          <ImagesDisplay
            colors={colors}
            images={item.images}
            onRemoveImage={onRemoveImage}
          />
        )}
        <ItemActions colors={colors} onAddImage={onAddImage} />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          style={styles.saveButton}
          onPress={() => {
            save(currentItem);
            close();
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.cancelButton} onPress={close}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}
