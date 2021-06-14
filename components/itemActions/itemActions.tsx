import React from "react";
import PageColors from "../../colors/pageColors";
import { Entypo } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult } from "react-native";

interface Props {
  colors: PageColors;
  onAddImage: (imageUri: string) => void;
}

const ICON_SIZE = 23;

export default function ItemActions(props: Props) {
  const { colors, onAddImage } = props;

  const actions = [
    {
      text: "Image from device",
      icon: (
        <Entypo name="image" size={ICON_SIZE} color={colors.PRIMARY_DARK_2} />
      ),
      name: "image",
      color: colors.PRIMARY,
      textColor: colors.PRIMARY_DARK_2,
      textBackground: colors.PRIMARY_LIGHT_1,
    },
    {
      text: "Take a Photo",
      icon: (
        <MaterialIcons
          name="add-a-photo"
          size={ICON_SIZE}
          color={colors.PRIMARY_DARK_2}
        />
      ),
      name: "photo",
      color: colors.PRIMARY,
      textColor: colors.PRIMARY_DARK_2,
      textBackground: colors.PRIMARY_LIGHT_1,
    },
    {
      text: "Location",
      icon: (
        <Entypo
          name="location"
          size={ICON_SIZE}
          color={colors.PRIMARY_DARK_2}
        />
      ),
      name: "location",
      color: colors.PRIMARY,
      textColor: colors.PRIMARY_DARK_2,
      textBackground: colors.PRIMARY_LIGHT_1,
    },
    {
      text: "Remainder",
      icon: (
        <Entypo name="bell" size={ICON_SIZE} color={colors.PRIMARY_DARK_2} />
      ),
      name: "remainder",
      color: colors.PRIMARY,
      textColor: colors.PRIMARY_DARK_2,
      textBackground: colors.PRIMARY_LIGHT_1,
    },
    {
      text: "Link",
      icon: (
        <Entypo name="link" size={ICON_SIZE} color={colors.PRIMARY_DARK_2} />
      ),
      name: "link",
      color: colors.PRIMARY,
      textColor: colors.PRIMARY_DARK_2,
      textBackground: colors.PRIMARY_LIGHT_1,
    },
  ];

  const onSelect = (name?: string) => {
    switch (name) {
      case "image":
        getImage(name);
        break;
      case "photo":
        getImage(name);
        break;

      default:
        break;
    }
  };

  const getImage = async (from: string) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // quality: 1,
    };

    let result: any;
    if (from === "image") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else if (from === "photo") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.cancelled) {
      onAddImage(result.uri);
    }
  };

  return (
    <FloatingAction
      actions={actions}
      onPressItem={onSelect}
      color={colors.PRIMARY_DARK_1}
    />
  );
}
