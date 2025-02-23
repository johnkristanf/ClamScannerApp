import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import * as MediaLibrary from "expo-media-library"; 

import { resizeImage } from "./resize";
import { getInfoAsync } from "expo-file-system";

import { FetchMolluskDetails, Scan } from "@/api/post/scan";
import { Location, MolluskScannedDetails } from "@/types/reports";
import { Alert } from "react-native";


export const openGallery = async (
    setImageForScanning: React.Dispatch<React.SetStateAction<string | undefined>>,
    setScannedData: React.Dispatch<React.SetStateAction<MolluskScannedDetails | undefined>>,
    setCancelOrReported: React.Dispatch<React.SetStateAction<boolean>>,
    setCapturedImageLocation: React.Dispatch<React.SetStateAction<Location | undefined>> 
) => {

   

    const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: false
    });

    const { canceled, assets } = result;

    if (!canceled && assets[0].uri) {

        const selectedImageUri = result.assets[0].uri; 
        setImageForScanning(selectedImageUri);

        const resizedImageUri = await resizeImage(selectedImageUri, 512, 512, 0.8)
        console.log("Resized Image URI:", resizedImageUri);

        
        const cameraAlbum = await MediaLibrary.getAlbumAsync("Camera");
                
        try {
            const assetResult = await MediaLibrary.getAssetsAsync({
                album: cameraAlbum.id, 
                first: 1000,
                mediaType: MediaLibrary.MediaType.photo,
            });

            // Find the matching asset by comparing URIs
            const matchingAsset = assetResult.assets.find((asset) => {
                return asset.filename === result.assets[0].fileName
            });

              
            if (matchingAsset) {
                console.log("matchingAsset: ", matchingAsset);
                
                const assetInfo = await MediaLibrary.getAssetInfoAsync(matchingAsset.id);
                const location = assetInfo.location;

                if (location) {
                    console.log("Location found:", location);
                    
                    setCapturedImageLocation({
                        latitude: location.latitude,
                        longitude: location.longitude
                    })

                } else {
                    console.log("No GPS location data found in the image.");
                }

            } else {
                console.log("No matching asset found for the selected image.");
            }

        } catch (error) {
            console.error("Error while retrieving image metadata:", error);
            Alert.alert("Error", "Failed to retrieve image metadata.");
        }

        if(resizedImageUri){

            const fileInfo = await getInfoAsync(resizedImageUri);
            if (!fileInfo.exists) throw new Error('File does not exist');

            const formData = new FormData();
            formData.append('captured_image_file', {
                uri:  resizedImageUri,
                name: fileInfo.uri.split('/').pop(),
                type: 'image/jpeg',

            } as any);

            const scanRespData = await Scan(formData, setCancelOrReported) 
            console.log("scanRespData.prediction_percentage", scanRespData.prediction_percentage);
            
            

            if(scanRespData){
                FetchMolluskDetails(scanRespData.mollusk_classified_result).
                then(molluskDetails => setScannedData({
                    ...molluskDetails,
                    percentage: scanRespData.prediction_percentage
                })).
                catch(err => console.error(err))

            } else {
                const errorMsg = "Request timeout due to slow internet connection, you will be redirected back and try to scan again.";
                Alert.alert(
                    "Error in Scanning", 
                    errorMsg,

                    [
                        {
                        text: "Return",
                        onPress: () => setCancelOrReported(true),
                        },
                    ],

                    { cancelable: false }
                );
            }
             
        }
      
    }
};

