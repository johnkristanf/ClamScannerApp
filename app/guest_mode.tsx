import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, Alert } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function App() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [_, requestPermission] = useCameraPermissions();
    const [camFacing, setCamFacing] = useState<string>('back');
    

    useEffect(() => {
        const guestModeMsg = "This tab is meant for capturing endangered mollusk for later reporting. \n \n Note that the location must be turned on to set the report address.";
        Alert.alert(
            "Guest Mode Instruction",
            guestModeMsg,
        );
    }, [])
    

    useEffect(() => {
        (async () => {
        const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        requestPermission();

        
        setHasPermission(locationStatus === 'granted' && mediaStatus === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photoData = await cameraRef.current.takePictureAsync();

            if(photoData && photoData.uri){
                setPhoto(photoData.uri);

                // Save the image to gallery
                const asset = await MediaLibrary.createAssetAsync(photoData.uri);
                await MediaLibrary.createAlbumAsync('Camera', asset, false);

                const guestModeMsg = "Saved to Local Storage";
                Alert.alert(
                    "Image Saved Successfully",
                    guestModeMsg,
                );
            }
        
        }
    };

    function toggleCameraFacing() {
      setCamFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    if (hasPermission === null) {
        return <View><Text>Requesting permissions...</Text></View>;
    }
    if (hasPermission === false) {
        return <View><Text>No access to camera or location</Text></View>;
    }

 

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={camFacing as CameraType}>
        <View style={styles.buttonContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.button_scan,
                    { backgroundColor: pressed ? 'gray' : Colors.theme.backgroundcolor },
                ]}
                onPress={takePicture}
                >
                    <Text style={styles.text}>Capture</Text>
            </Pressable>
        </View>
      </CameraView>


      <View style={styles.header}>
                <FontAwesome
                    name="arrow-left"
                    size={35}
                    color="white"
                    style={styles.icon}
                    onPress={() => router.replace('/')}
                />
                <FontAwesome
                    name="rotate-right"
                    size={35}
                    color="white"
                    style={styles.icon}
                    onPress={toggleCameraFacing}
                />
            </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  button_scan: {
    backgroundColor: Colors.theme.backgroundcolor,
    color: Colors.theme.whiteText,
    width: '100%',
    height: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    top: 15,
    zIndex: 1
  },

  icon: {
    paddingHorizontal: 10,
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  preview: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});
