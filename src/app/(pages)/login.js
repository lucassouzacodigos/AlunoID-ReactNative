import { Stack, useFocusEffect, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useEffect, useState } from "react";
import {IP} from "../../Components/IPLOCAL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoFoto from '../../assets/impressao-digital.png'
import usericon from '../../assets/usericon.png'
import viewpass from '../../assets/viewpass.png'







export default function login(){


    
    
    
    
    const [debug, setDebug] = useState(false)
    const router = useRouter()
    const [user, setUser] = useState('2') 
    const [senha, setSenha] = useState('123') 
    const [erroLogin, setErroLogin] = useState(false)
    const [loading, setLoading] = useState(false)

    useFocusEffect(() => {
        setTimeout(() => {
            
            if(loading){setLoading(false)}
        }, 2500);
    })
    
    const tentarLogar = async () => {
        setLoading(true)
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
        setTimeout(() => {
            router.push("/splashLogin")
        }, 500);
    }

    }





    return(

        <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
            <Stack.Screen options={{headerShown: false}} />

            <View style={[css.quadrado,css.FlexCenter]}> 
                
                <View style={{height:100, width:300, backgroundColor:"transparent", flexDirection:"row", alignItems:"center", justifyContent:"center", marginBottom:65}}>
                    <TouchableOpacity onPress={() => setDebug(cur => !cur)}><Text style={{color:"rgb(61, 194, 255)", fontWeight:"bold", fontSize:45}}>Aluno</Text></TouchableOpacity>
                    <Text style={{fontWeight:"bold", fontSize:45}}>ID</Text>
                    <Image source={logoFoto} style={{height:80, width:80}}></Image>
                </View>


                <View style={[css.FlexCenter,css.loginInputContainer, {flexDirection:"row"}]}>
                    <Image source={usericon} style={css.inputIcons}/>
                    <TextInput    //INPUT DE RA/CPF
                    style={[{ marginBottom: 25 }, css.input]}
                    onChangeText={setUser}
                    placeholder='RA/CPF'
                    />
                </View>

                <View style={[css.FlexCenter,css.loginInputContainer, {flexDirection:"row"}]}>
                    <Image source={viewpass} style={css.inputIcons}/>
                    <TextInput   //INPUT DE SENHA
                    style={[{ marginBottom: 25 }, css.input]}
                    onChangeText={setSenha}
                    placeholder='Senha'
                    />
                </View>


                {!loading && <TouchableOpacity onPress={tentarLogar}>
                    <View style={{backgroundColor:"rgba(61, 194, 255, 0.87)", height:40, width:200, borderRadius:15, alignItems:"center", justifyContent:"center", }}>
                        {!loading && <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Entrar</Text>}
                    </View>
                </TouchableOpacity>}
                {loading && <View style={{height:40, width:200, borderRadius:15, alignItems:"center", justifyContent:"center"}}>
                        <ActivityIndicator size={50}/>
                            </View>}

                {/* DEBUG STATS */}
                {
                    debug && 
                    <View
                    style={{position:"absolute", top:0}}>
                        <Text>Usuario: {user}</Text>
                        <Text>Senha: {senha}</Text>
                        <Text>IP: {IP}</Text>
                    </View>
                }


            </View>

        </SafeAreaView>
    )
}