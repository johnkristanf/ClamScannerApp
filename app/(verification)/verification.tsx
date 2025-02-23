import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Modal, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import VerificationForm from '@/components/auth/VerificationForm';

export default function VerificationPage() {
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isVerificationComplete, setIsVerificationComplete] = useState<boolean>(false);


    useEffect(() => {
        if(isVerificationComplete){
          router.replace('/(users)/scan')
        }
    }, [isVerificationComplete])

    return (
        <ImageBackground
          source={require('../../assets/images/login_bg.png')}
          style={styles.login_form_container}
        >

          <View style={styles.form}>

            <View style={styles.flex_row}>

              <Link href="/" >
                <FontAwesome name='chevron-left' size={20} color="black"/>
              </Link>

              <Text style={styles.text}>Verification</Text>
            </View> 

            <VerificationForm 
              setIsVerificationComplete={setIsVerificationComplete} 
              setIsLoading={setIsLoading} 
            />
          </View>

          {
            isLoading && (
              <Modal visible={isLoading} transparent={true} animationType="fade">
                <TouchableOpacity style={styles.modalBackground} onPress={() => setIsLoading(false)}>
                  <View style={styles.modalContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.modalText}>Verifying....</Text>
                  </View>
                </TouchableOpacity>
              </Modal>
         
            )
          }

         

        </ImageBackground>
    );
}


const styles = StyleSheet.create({

  login_form_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 15
  },

  text: {
    fontSize: 40,
    fontWeight: '300',
  },

  form: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 8,
    marginTop: 30
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 200,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
  },


});