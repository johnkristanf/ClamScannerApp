import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import LoginForm from '@/components/auth/LoginForm';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export default function LoginPage() {
  const [loginnedUser, setLoginnedUser] = useState<string | undefined>(undefined);

  useEffect(() => {

    if (loginnedUser) {

      if(loginnedUser === "user"){
        router.replace("/(users)/scan");
        setLoginnedUser(undefined)

      }

      if(loginnedUser === "personnel"){
        router.replace("/(personnel)/reports");
        setLoginnedUser(undefined)

      }
      
    }

  }, [loginnedUser]);

    return (
        <ImageBackground
          source={require('../assets/images/login_bg.png')}
          style={styles.login_form_container}
        >

          <View style={styles.form}>

            <View style={styles.flex_row}>

              <Link href="/" >
                <FontAwesome name='chevron-left' size={20} color="black"/>
              </Link>

              <Text style={styles.text}>Login</Text>
            </View> 

            <LoginForm setLoginnedUser={setLoginnedUser} />
          </View>
         

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
  }


});