import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Camara from './components/Camara';
import Gallery from './components/Gallery';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = (uri, name) => { 
    const newPhoto = { uri, name };
    setPhotos(currentPhotos => [...currentPhotos, newPhoto]);
    setShowCamera(false);
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <Camara onCapture={handleCapture} />
      ) : (
        <>
          <Button title="Open Camera" onPress={() => setShowCamera(true)} />
          <Gallery photos={photos} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 5,
    marginLeft: 3,
    marginRight: 3,
    flex: 1,
  },
});
