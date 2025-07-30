import { auth } from '@/lib/firebaseConfig';
import styles from '@/styles/authStyles';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import Toast from 'react-native-toast-message';

export const options = {
        headerShown: false,
    };

export default function AuthPage() {

    const [signedUp, setSignedUp] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>("");

    const handleLogin = async () => {

        if (!email) {
            setError("Email field can't be empty");
            setTimeout(() => setError(null), 3000);
            return;
        }
        if (!password) {
            setError("Password field can't be empty");
            setTimeout(() => setError(null), 3000);
            return;
        }

        try {
            if (signedUp) {
                await createUserWithEmailAndPassword(auth, email, password);
                setError(null);
                setEmail("");
                setPassword("");
                Toast.show({
                    type: 'success',
                    text1: 'Account created successfully',
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                });
                router.replace("/auth");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                setError(null);
                setEmail("");
                setPassword("");
                Toast.show({
                    type: 'success',
                    text1: 'Logged in successfully',
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                });
                router.replace("/(tabs)");
            }
        } catch (err: any) {
            console.log("Authentication error:", err);
            
            let errorMessage = "An error occurred during authentication";
            if (err.code) {
                switch (err.code) {
                    case "auth/user-not-found":
                        errorMessage = "No account found with that email";
                        setTimeout(() => setError(null), 3000);
                        break;
                    case "auth/email-already-in-use":
                        errorMessage = "That email is already in use";
                        setTimeout(() => setError(null), 3000);
                        break;
                    case "auth/weak-password":
                        errorMessage = "Password should be at least 6 characters";
                        setTimeout(() => setError(null), 3000);
                        break;
                    case "auth/missing-password":
                        errorMessage = "Password field can't be empty";
                        setTimeout(() => setError(null), 3000);
                        break;
                    case "auth/missing-email":
                        errorMessage = "Email field can't be empty";
                        setTimeout(() => setError(null), 3000);
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid email";
                        setTimeout(() => setError(null), 3000);
                        break;                    
                    case "auth/invalid-credential":
                        errorMessage = "Incorrect email or password";
                        setTimeout(() => setError(null), 3000);
                        break;
                    default:
                        errorMessage = err.message || "An error occurred during authentication";
                        setTimeout(() => setError(null), 3000);
                }
            }
            setError(errorMessage);
            setPassword("");
        }
    }

    const switchMode = () => {
        setSignedUp(prev => !prev);
        setError(null);
        setEmail("");
        setPassword("");
    }

    return <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >  
        <View style={styles.content}>
            <Text style={styles.title}> { signedUp ? "Create Account" : "Welcome Back" } </Text>

            <TextInput 
                value={email}
                autoCapitalize="none" 
                keyboardType="email-address" 
                placeholder="example@mail.com"
                style={styles.input}
                onChangeText={setEmail}
            />

            <TextInput
                value={password}
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



