import { Location } from "@/types/reports";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, reverseGeocodeAsync } from "expo-location";

interface Address {
    city: string;
    province: string;
    district: string;
}
  
export const getLocation = async (): Promise<Location | null> => {

    let { status } = await requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return null;
    }
  
    let location = await getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
  
    return { latitude, longitude };
};


export const getAddressFromLocation = async (latitude: number, longitude: number): Promise<Address> => {
    
    let address: Address = { city: '', province: '', district: '' };
    
    try {

        let result = await reverseGeocodeAsync({
            latitude,
            longitude,
        });

        if (result.length > 0) {
            console.log("result: ", result);
            
            const { city, subregion, district } = result[0];

            address = {
                city: city || '',
                province: subregion || '',
                district: district || '',
            };

        }

    } catch (error) {
      console.log(error);
    }
    
    return address;

};