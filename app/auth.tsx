import { auth } from '@/lib/firebaseConfig';
import styles from '@/styles/authStyles';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";

export default function AuthPage() {

    const [signedUp, setSignedUp] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>("");

    // const {signIn, signUp} = useAuth();

    const handleLogin = async () => {
        setError(null);
        try {
            if (signedUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err: any) {
            setError(err.message);
        }
        // Reset fields after login
        setEmail("");
        setPassword("");
    }

    const switchMode = () => {
        setSignedUp(prev => !prev);
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

            {error && <Text style={{color: "red"}}> {error}</Text>}

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
                <Text> { signedUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up " } </Text>
            </Pressable>
        </View>
    </KeyboardAvoidingView>
}



