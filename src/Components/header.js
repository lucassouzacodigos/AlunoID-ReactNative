import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "./Styles";
import Botao from "./botao"
import { useState } from "react";




export default function Header(){
    return (
        <View style={[css.FlexCenter, {backgroundColor:"transparent",width:"100%", height:"10%", flexDirection:"row", justifyContent:"center", borderTopWidth:2}]}>
            


            
            <View style={[css.FlexCenter, {backgroundColor:"transparent", width:"40%", flexDirection:"row"}]}>
                <Text style={{fontWeight:450, fontSize:18}}>Aluno</Text>
                <Text style={{fontWeight:450, fontSize:18}}>ID</Text>
                <Image source={require("../assets/impressao-digital.png")} style={{height:40, width:40}}></Image>
            </View>

            <Image style={{height:50, width:50, position:"absolute", right:15}} source={require("../assets/perfil-de-usuario.png")}></Image>

        </View>
    )
}