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
    const [qrCodeEntrada, setQrCodeEntrada] = useState("Aluno2123TESTE")


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
                
                <ScrollView style={{width:"100%", backgroundColor:"transparent"}} contentContainerStyle={{alignItems:"center", marginTop:10}}>

                    <ItemBlock>
                        <View style={{backgroundColor:"pink"}}>
                            <Text>aaa</Text>
                            <Text>bbb</Text>
                            <Text>ccc</Text>
                        </View>
                    </ItemBlock>
                        
                    <ItemBlock>
                        <Text>{larguraTela.width}</Text>
                    </ItemBlock>

                    <ItemBlock>
                        <QRCode value={qrCodeEntrada} size={larguraTela * 0.8} />
                    </ItemBlock>

                   

                    <Text>{token.userID}</Text>
                    <Text>{token.nome}</Text>
                    
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}