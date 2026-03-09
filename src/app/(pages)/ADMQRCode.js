import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useEffect, useState } from "react";
import Header from "../../Components/header"
import ItemBlock from "../../Components/itemBlock"
import AsyncStorage from "@react-native-async-storage/async-storage";
import decodeToken from "../../utils/tokenToJson";
import QRCode from "react-native-qrcode-svg";





export default function ADMQRCode(){
    
    const larguraTela = Dimensions.get("window").width
    const [token, setToken] = useState("")
    const [qrCodeEntrada, setQrCodeEntrada] = useState("ALUNOIDFACIALREQUEST")


    useEffect(() => {
    async function loadToken() {
        const decoded = await decodeToken()
        setToken(decoded)
    }
    loadToken()
}, [])



    return(


        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            
            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                <Header></Header>
                
                <ScrollView style={{width:"100%", backgroundColor:"white"}} contentContainerStyle={{alignItems:"center", justifyContent:"center", marginTop:10}}>

                    <ItemBlock>
                        <View style={{backgroundColor:"pink"}}>
                            
                        </View>
                    </ItemBlock>

                    <ItemBlock>
                        <View style={[css.FlexCenter, {}]}> 
                            <Text style={[css.textoAcessar, {textAlign:"center", margin:15, fontSize:25}]}>Escaneie o QR Code para ser redirecionado para o reconhecimento facial</Text>

                            <View style={{margin:15, borderRadius:5, borderColor:"black", borderWidth:5}}>
                                <QRCode value={qrCodeEntrada} size={larguraTela * 0.5} />
                            </View>
                        </View>
                    </ItemBlock>
                    
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}