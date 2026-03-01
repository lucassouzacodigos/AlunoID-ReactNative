import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useState } from "react";
import {IP} from "../../Components/IPLOCAL";
import AsyncStorage from "@react-native-async-storage/async-storage";








export default function login(){


    
    
    
    
    
    const router = useRouter()
    const [user, setUser] = useState('A') 
    const [senha, setSenha] = useState('A') 
    const [erroLogin, setErroLogin] = useState(false)

    
    const tentarLogar = async () => {
        const response = await fetch(`http://${IP}:3333/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user.toLowerCase(),
                senha: senha
            })
        })
        console.log(response)
        
        if (!response.ok){
            setErroLogin(true)
            alert("Senha/RA Incorretos")
            return
        }
        
        const tokenJson = await response.json()
        if (tokenJson) {

        ///se o login der certo, seta o token no local storage
        await AsyncStorage.setItem('token', tokenJson.token)
        router.push("/home")
        }

    }





    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            <View style={[css.quadrado,css.FlexCenter]}> 



                <TextInput    //INPUT DE RA/CPF
                style={[css.input]} 
                onChangeText={setUser}
                placeholder='RA/CPF'
                />

                <TextInput   //INPUT DE SENHA
                style={[css.input]}
                onChangeText={setSenha}
                placeholder='Senha'
                />

                <Botao text="Entrar" largura="120" acao={tentarLogar} cor="green" />
                <Botao text="Qrcode" largura="120" acao={() => router.push("/qrCodeDisplay")} cor="green" />

                <Text>Usuario: {user}</Text>
                <Text>Senha: {senha}</Text>
                <Text>IP: {IP}</Text>


            </View>

        </SafeAreaView>
    )
}