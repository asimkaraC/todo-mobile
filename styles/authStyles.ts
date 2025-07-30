import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },

    title: {
        marginBottom: 32,
        color: '#fff',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },

    input: {
        marginTop: 12,
        width: '90%',
        justifyContent: 'center',
        height: 40,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: '#fff',
        backgroundColor: '#333',
    },
    
    errorMsg: {
        color: '#fd2828fb',
        marginTop: 16,
        textAlign: 'center',
    },

    // successMsg: {
    //     color: '#2cf05aff',
    //     marginTop: 16,
    //     textAlign: 'center',
    // },

    button: {
        marginTop: 24,
        backgroundColor: 'cyan',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',

    },

    switchModeButton: {
        marginTop: 32,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'center',
    },
});

export default styles;
