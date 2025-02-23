import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Colors from "@/constants/Colors";
import { LoginCredentials } from "@/types/auth";
import { VerifyAccount } from "@/api/post/auth";

export default function VerificationForm({setIsVerificationComplete, setIsLoading}: {
    setIsVerificationComplete: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>,
}) {
    const { control, handleSubmit, reset } = useForm<{verification_code: string}>();

    const onSubmit: SubmitHandler<{verification_code: string}> = async (data) => {
        try {

            setIsLoading(true)
    
            const response = await VerifyAccount(data.verification_code)
            console.log("verify res: ", response)

            if(response === "user_verification_success"){

                setIsLoading(false)
                const successVierifcationMsg = "You're now officially been verified, you can now start scanning";
                Alert.alert(
                    "Verification Successful",
                    successVierifcationMsg,
                    [
                        {
                            text: "Procceed on Scanning",
                            onPress: () => setIsVerificationComplete(true),
                        },
                    ],
                    { cancelable: false }
                );


            } else if(response === "incorrect_code"){

                setIsLoading(false)
                const incorrectCodeMsg = "Verification code is incorrect, Please try again";
                Alert.alert(
                    "Verification Error",
                    incorrectCodeMsg,
                );

            } else {

                setIsLoading(false)
                const errorMessage = "There is an error in the verification proccess, please try again";
                Alert.alert(
                    "Verification Error",
                    errorMessage,
                );
            }

            reset()

                      
        } catch (error) {
            console.error(error)
            setIsLoading(false)

        }
    };    

    return (
        <View style={styles.auth_container}>
            <View style={styles.inputs}>
               

                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Verification Code"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                keyboardType={'default'} 

                            />
                        )}
                        name="verification_code"
                    />
                </View>
                    
                <Pressable
                        style={({ pressed }) => [
                            styles.login_btn,
                            { opacity: pressed ? 0.75 : 1 }
                        ]}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.text}>Verify</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    auth_container: {
        width: '100%',
        height: '30%', 
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
    },
    inputs: {
        width: '75%',
    },
    inputContainer: {
        width: '100%',
    },
    
    input: {
        borderBottomColor: '#00e2e6',
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        padding: 6,
        marginBottom: 15
    },

    login_btn: {
        backgroundColor: Colors.theme.backgroundcolor,
        borderRadius: Colors.theme.radius,
        color: Colors.theme.whiteText,
        padding: 9,
        width: '70%',
        alignItems: 'center',
        marginTop: 20
    },
    text: {
        color: Colors.theme.whiteText,
        fontWeight: "bold",
        textAlign: 'center'
    },
    title: {
        color: Colors.theme.whiteText,
        fontSize: Colors.theme.titleTextSize,
        fontWeight: "bold",
        marginBottom: 20
    },
    error: {
        color: 'red',
    },
});
