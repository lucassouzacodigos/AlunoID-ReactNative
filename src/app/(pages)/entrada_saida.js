import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useEffect, useState } from "react";
import Header from "../../Components/header"
import ItemBlock from "../../Components/itemBlock"
import AsyncStorage from "@react-native-async-storage/async-storage";
import decodeToken from "../../utils/tokenToJson";
import leitorQR from '../../assets/leitorQR.png'
import catraca from '../../assets/catraca.png'
import qrCodeExemplo from '../../assets/qrCodeExemplo.png'
import { LinearGradient } from "expo-linear-gradient";
import api from "../../utils/api";





export default function Entrada_saida(){

    const [token, setToken] = useState()
    const [horarios, setHorarios] = useState([])

    useEffect(() => {
        async function loadToken(){
            const decoded = await decodeToken()
            setToken(decoded)
        }
        loadToken()
    }, [])

    useEffect(() => {
        if (!token?.userID) return

        async function getHorarios(){
            try{
            const response = await api.get(`/controle/gethorario/${token?.userID}`)
            setHorarios(response.data)
            console.log(response.data)
            } catch(err) {setHorarios([])}
        }
        getHorarios()
    }, [token])


    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter, {}]}>
                    <Stack.Screen options={{headerShown: false}} />
        
                    
                    <View style={[css.quadrado, css.FlexCenter, {justifyContent:"center"}]}>
                        
                        <Text>ENTRADA E SAIDA</Text>
                        <Text>{token?.userID}</Text>
                        

        
                    </View>
        
                </SafeAreaView>


    )
}