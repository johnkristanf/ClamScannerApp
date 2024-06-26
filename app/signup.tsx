import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SignupForm from '@/components/auth/SignupForm';
import { Link, router } from 'expo-router';

export default function SignupPage() {
    const [isSignup, setIsSignup] = useState<boolean>(false);

    useEffect(() => {
        if (isSignup) {
            Alert.alert(
                "Success",
                "Sign up Successfully",
                [
                    {
                        text: "Procced now to Login",
                        onPress: () => router.replace("/login"),
                    },
                ],
                { cancelable: false }
            );
        }
    }, [isSignup]);

    return (
        <ImageBackground
            source={require('../assets/images/signup_bg.jpg')}
            style={styles.signup_form_container}
        >
            <View style={styles.form}>

                <View style={styles.flex_row}>
                    <Link href="/">
                        <FontAwesome name='chevron-left' size={20} color="black" />
                    </Link>

                    <Text style={styles.text}>Registration</Text>

                </View>

                <SignupForm setIsSignup={setIsSignup} />

                

            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    signup_form_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex_row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginRight: 20,
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
        alignItems: 'flex-end',
        gap: 50,
        marginTop: 120,
    },
    login_link: {
        marginTop: 20,
        fontSize: 18,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
