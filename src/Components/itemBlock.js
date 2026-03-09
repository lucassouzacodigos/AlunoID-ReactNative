import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "./Styles";
import Botao from "./botao"
import { useState } from "react";




export default function itemBlock({children, acao}){
    return (
        <TouchableOpacity onPress={acao} style={[css.FlexCenter, {backgroundColor:"#F0F0F0", width:"90%", height:"auto", flexDirection:"row", justifyContent:"center", elevation:10, borderRadius:15, marginVertical:15}]}>
            

            {children}
            
            

        </TouchableOpacity>
    )
}