import { auth } from '@/lib/firebaseConfig';
import styles from '@/styles/authStyles';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";

export const options = {
        headerShown: false,
    };

export default function AuthPage() {

    const [signedUp, setSignedUp] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>("");

    // const {signIn, signUp} = useAuth();

    const handleLogin = async () => {
        try {
            if (signedUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setError(null);
            router.replace("/(tabs)");
        } catch (err: any) {
            console.log("Authentication error:", err);
            setPassword("");
            setError("Invalid email or password");
        }
        // Reset fields after login
        setEmail("");
        setPassword("");
    }

    const switchMode = () => {
        setSignedUp(prev => !prev);
        setError(null);
        setPassword("");
    }

    return <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >  
        <View style={styles.content}>
            <Text style={styles.title}> { signedUp ? "Create Account" : "Welcome Back" } </Text>

            <TextInput 
                autoCapitalize="none" 
                keyboardType="email-address" 
                placeholder="example@mail.com"
                style={styles.input}
                onChangeText={setEmail}
            />

            <TextInput  
                autoCapitalize="none" 
                secureTextEntry
                placeholder="********"
                style={styles.input}
                onChangeText={setPassword}
            />

            {error && <Text style={styles.errorMsg}> {error}</Text>}

            <Pressable
                onPress={handleLogin}
                style={styles.button}
            >
                <Text> { signedUp ? 'Sign Up' : 'Sign In' } </Text>
            </Pressable>

            <Pressable 
                onPress={switchMode}
                style={styles.switchModeButton}
            >
                <Text style={{ color: 'white' }}> { signedUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up " } </Text>
            </Pressable>
        </View>
    </KeyboardAvoidingView>
}



