import { Stack, useFocusEffect, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
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
import logo from '../../assets/impressao-digital.png'


export default function SplashLogin(){

    const router = useRouter()


    
    useFocusEffect(() => {
        async function redirect(){
            setTimeout(() => {
                router.replace("/home")
            }, 150);
        }
        redirect()
    })

    
    
    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter, {backgroundColor:"#3DC2FF"}]}>
                    <Stack.Screen options={{headerShown: false}} />
        
                    
                    <View style={[css.quadrado, css.FlexCenter, {justifyContent:"center"}]}>
                        <LinearGradient 
                        colors={['#3DC2FF', '#537df0', '#3DC2FF']} 
                        style={{position:"absolute", bottom:0, width:"100%", height:"100%", borderBottomLeftRadius:5, borderBottomRightRadius:5, flex:1, alignItems:"center", justifyContent:"center", flexDirection:"row"}}
                        >
                            <Text style={{fontWeight:"bold", fontSize:60, color:"white"}}>Aluno</Text>
                            <Text style={{fontWeight:"bold", fontSize:60}}>ID</Text>
                            <Image source={logo} style={{width:90, height:90}}></Image>

                        </LinearGradient>




        
            </View>

        </SafeAreaView>


    )
}