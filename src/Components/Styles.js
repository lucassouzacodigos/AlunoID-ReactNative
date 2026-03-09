import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("screen")


export const css = StyleSheet.create({
    FlexCenter:{
        alignItems: "center",
        justifyContent: "center",
    },
    safeArea:{
        backgroundColor: "#3DC2FF",
        backgroundColor: "white",
        width: width,
        height: height,
    },
    quadrado:{
        backgroundColor: "white",
        height: "100%",
        width: width,
        borderRadius: 8,
    },
    input:{
        textAlign: "center",
        width: "80%",
        borderBottomWidth: 1,
        borderColor: "black",
        margin: 13,
    },
    botao:{
        fontWeight: "bold",
        height: 35,
        backgroundColor: "#f5f5f5",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "rgba(53, 53, 53, 1)00ff"
    },
    cameraView: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
    textoAzul:{
        fontSize: 20,
        fontWeight: "bold",
        color: "lightblue",
    },
    textoAcessar:{
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
    }
})