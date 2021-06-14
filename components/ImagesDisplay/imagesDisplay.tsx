import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Modal } from "react-native";
import PageColors from "../../colors/pageColors";
import ImageIcon from "./imageIcon";
import ImageView from "react-native-image-viewing";

interface Props {
  colors: PageColors;
  images: string[];
  onRemoveImage: (imageUri: string) => void;
}

export default function ImagesDisplay(props: Props) {
  const { colors, images, onRemoveImage } = props;

  const [showImage, setShowImage] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.PRIMARY_LIGHT_1,
    },
    text: {
      marginTop: 10,
      fontSize: 20,
      color: colors.PRIMARY_DARK_2,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Images:</Text>
      <ScrollView horizontal={true}>
        {images.map((image, index) => (
          <ImageIcon
            key={image}
            colors={colors}
            image={image}
            index={index}
            onImageClicked={(index: number) => {
              setSelectedImageIndex(index);
              setShowImage(true);
            }}
            onRemoveImage={onRemoveImage}
          />
        ))}
      </ScrollView>

      <ImageView
        images={images.map((i) => {
          return { uri: i };
        })}
        imageIndex={selectedImageIndex}
        visible={showImage}
        onRequestClose={() => setShowImage(false)}
        backgroundColor={colors.PRIMARY_LIGHT_1}
        swipeToCloseEnabled={false}
      />
    </View>
  );
}
