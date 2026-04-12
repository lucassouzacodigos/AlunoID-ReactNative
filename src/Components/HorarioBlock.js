import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "./Styles";
import Botao from "./botao"
import { useEffect, useState } from "react";
import { IP } from "./IPLOCAL";
import api from "../utils/api";







export default function HorarioBlock({ponto}){



    return(
        <View style={{width:70, height:50, flexDirection:"column",alignItems:"center", justifyContent:"center", margin:10, backgroundColor: ponto.action == "Entrada" ? "green" : "red", borderRadius:5}}>
            <Text style={{fontSize:20, fontWeight:"bold", borderBottomColor:"black", borderBottomWidth:1}}>{ponto.hora_ponto.slice(0, 5)}</Text> 
            <Text style={{fontSize:16, fontWeight:"bold"}}>{ponto.action}</Text>
        </View>
    )
}