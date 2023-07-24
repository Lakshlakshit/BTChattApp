import { StyleSheet, Text, TouchableOpacity, View } from "react-native"



export const Landing = () => {
    return (
        
        <View style={styles.main}>
            <Text style={styles.welcomeText}>
                Welcome to the Bluetooth Chat App
            </Text>
            <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}> Scan Bluetooth Devices </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#0082FC",
        height: "100%",
        paddingTop: "30%"
    },
    welcomeText: {
        color: "white",
        fontSize: 40,
        textAlign: "center",
        fontFamily: "Baloo2-Bold"
    },
    buttonStyle: {
        backgroundColor: 'white',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 50,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 25,
    },
    buttonTextStyle: {
        color: "#0082FC",
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: "Baloo2-medium",
      },
})