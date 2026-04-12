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
        width: "100%",
        // backgroundColor:"pink",
        marginBottom:0,
    },
    inputIcons:{
        position:"absolute",
        right:0,
        height:40,
        width:40,
    },
    loginInputContainer:{
        height:"auto",
        width:"65%",
        borderBottomWidth: 1,
        borderColor: "black",
        // backgroundColor:"teal",
        marginBottom:25,
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
    },
    altoRelevo:{
        fontSize: 20,
        fontWeight: "bold",
    },
    notaTab:{
        elevation:10,
        height:"auto",
        margin:10,
        backgroundColor:"white"
    },
    notaTabTitulo:{
        fontWeight:"bold",
        fontSize:14
    },
    notaTabContent:{
        fontSize:12,
    },
    horariosContainer:{
        margin:5,
        borderBlockColor:"black",
        borderWidth:1,
        borderStyle:"solid"
    },
    pontoHeaderDiaSemana:{
        flexDirection:"row",
        marginVertical:15,
    },
})