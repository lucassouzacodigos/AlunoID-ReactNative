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
import HorarioBlock from "../../Components/HorarioBlock";
import React from "react";




export default function Entrada_saida(){

    const [token, setToken] = useState(null)
    const [pontos, setPontos] = useState([])

    useEffect(() => {
    async function loadToken() {
        const decoded = await decodeToken()
        setToken(decoded)
    }
    loadToken()
}, [])

    async function getHorarios(){

        setTimeout(async() => {
            if (token) {
            const dados = await api.get(`/controle/gethorario/${token.userID}`)
            console.log(dados.response)
            const parsed = dados.data
            setPontos(parsed)
            console.log("Pontos downloaded")
            } else{console.log("no token?")}
            
        }, 500);

    }

    useEffect(() => {
        async function onLoad(){
            await getHorarios()
        }
        onLoad()
        
        
    }, [token])

    
    const diasSorted = [...pontos].reduce((acc, pontoatual) =>{
            const data = pontoatual.data_atual

            if(!acc[data]){
                acc[data] = []
            }

            acc[data].push(pontoatual)
            return acc
        }, {})

    
    const diasSemana = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
    ]

    return(
            <SafeAreaView style={[css.safeArea, css.FlexCenter, {}]}>
                <Stack.Screen options={{headerShown: false}} />
    
                <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                    <Header token={token}></Header>


    
                    <ScrollView style={{width:"90%", borderRadius:15, backgroundColor:"white",padding:15 }} contentContainerStyle={[css.FlexCenter,{}]}>
                        {/* HEADER */}
                        <View style={{backgroundColor:"transparent", width:"100%", height:60, flexDirection:"row", justifyContent:"space-between",}}>
                            <Text style={[css.textoAzul,{fontWeight:"bold", fontSize:30}]}>Horarios: </Text>
                        </View>

                        {pontos.length == 0 && <Text style={css.altoRelevo}>Sem pontos registrados :(</Text>}
                        
                        <ScrollView style={{ width:"100%", height:"auto"}}>

                            {Object.entries(diasSorted)
                            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                            .map(([data, registros, index]) => {
                                const diaSemana = diasSemana[new Date(data + "T00:00:00").getDay()]
                                return(
                                <View key={data} style={css.horariosContainer}>
                                    <View style={css.pontoHeaderDiaSemana}>
                                        <Text style={css.altoRelevo}> {new Date(data + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</Text>
                                        <Text style={css.altoRelevo}> -</Text>
                                        <Text style={css.altoRelevo}> {diaSemana}</Text>
                                    </View>

                                    <ScrollView key={data} style={{}} horizontal={true}>
                                    {registros.map((ponto) => (
                                            <HorarioBlock
                                                key={ponto.id_registro}
                                                ponto={ponto}
                                            />
                                        ))}
                                    </ScrollView>
                                </View>
                            )})}

                        </ScrollView>
    
                    </ScrollView>
                </View>
    
    
            </SafeAreaView>
        )
}