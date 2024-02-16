import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, View, TextInput, Text } from 'react-native';
import { Camera } from 'expo-camera';

const Camara = ({ onCapture }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState('');
  const [photoName, setPhotoName] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  const handleSavePhoto = () => {
    if (photoUri && photoName) {
      onCapture(photoUri, photoName);
      setPhotoUri('');
      setPhotoName('');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {photoUri ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter photo name"
            value={photoName}
            onChangeText={setPhotoName}
          />
          <Button title="Save Photo" onPress={handleSavePhoto} />
        </View>
      ) : (
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Flip Camera" onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }} />
            <Button title="Capture" onPress={handleCapture} />
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Camara;
