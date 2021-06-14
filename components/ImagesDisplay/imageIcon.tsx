import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PageColors from "../../colors/pageColors";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  colors: PageColors;
  image: string;
  index: number;
  onImageClicked: (index: number) => void;
  onRemoveImage: (imageUri: string) => void;
}

export default function ImageIcon(props: Props) {
  const { colors, image, index, onImageClicked, onRemoveImage } = props;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-end",
    },
    icon: {
      position: "relative",
      bottom: 12,
      right: 2,
    },
    image: {
      marginTop: 10,
      marginRight: 10,
      width: 100,
      height: 100,
      borderRadius: 10,
      borderColor: colors.PRIMARY_LIGHT_2,
      borderWidth: 3,
    },
  });

  const removeImage = () => {
    Alert.alert(
      "Remove an Image",
      `You are about to Remove an Image from this Item, Are you Sure?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => onRemoveImage(image) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onImageClicked(index)}>
        <Image key={image} source={{ uri: image }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={removeImage} style={styles.icon}>
        <AntDesign name="closecircle" size={22} color={colors.PRIMARY_DARK_2} />
      </TouchableOpacity>
    </View>
  );
}
