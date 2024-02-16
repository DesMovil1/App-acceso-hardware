import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';

const Gallery = ({ photos }) => {
  return (
    <ScrollView>
      {photos.map((photo, index) => (
        <View key={index} style={styles.photoContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          <Text style={styles.text}>{photo.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  text: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

export default Gallery;
