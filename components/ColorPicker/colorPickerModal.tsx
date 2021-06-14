import React, { useEffect } from "react";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  BackHandler,
} from "react-native";
import { Modal, StyleSheet, Text } from "react-native";
import PageColors from "../../colors/pageColors";
import ColorPickerIcon from "./colorPickerIcon";

interface Props {
  colors: PageColors;
  show: boolean;
  close: () => void;
  colorSelected: (color: string) => void;
}

export default function ColorPickerModal(props: Props) {
  const { show, colors, close, colorSelected } = props;

  const styles = StyleSheet.create({
    outsideContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.PRIMARY_LIGHT_1,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
      marginLeft: "87%",
    },
  });

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <TouchableOpacity
        style={styles.outsideContainer}
        onPress={close}
        activeOpacity={0}
      >
        <ScrollView style={styles.container}>
          {PageColors.getColors(25).map((c) => (
            <View key={"colorId-" + c}>
              <ColorPickerIcon
                color={new PageColors(c).PRIMARY_DARK_1}
                onPress={() => {
                  colorSelected(c);
                  close();
                }}
              />
            </View>
          ))}
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
}
