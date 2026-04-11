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
import perfilIcon from '../../assets/iconeperfil.png'
import catraca from '../../assets/catraca.png'
import anotacoesIcon from '../../assets/anotacoes.png'
import qrCodeExemplo from '../../assets/qrCodeExemplo.png'
import { LinearGradient } from "expo-linear-gradient";





export default function home(){
    const router = useRouter()
    const [token, setToken] = useState("")



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
                <Header token={token}></Header>
                
                <ScrollView style={{width:"100%", backgroundColor:"transparent"}} contentContainerStyle={{alignItems:"center", marginTop:10}}>

                    {/* DISPLAY DO QR CODE USADO PARA REDIRECIONAR PARA O MODULO DE RECONHECIMENTO FACIAL ---apenas para adm do sistema---*/}
                    {token.tipo_usuario === "Admin" &&
                    <ItemBlock acao={() => router.push("/ADMQRCode")}>
                        <View style={[css.FlexCenter, {backgroundColor:"#F5F5F5", height:150, width:"100%", flexDirection:"row", borderRadius:5}]}>
                            
                            <View style={[css.FlexCenter, {backgroundColor:"none", width:"40%"}]}>
                                <Image source={qrCodeExemplo} style={{height:"90%", width:"90%", backgroundColor:"aa"}} />
                            </View>

                            <View  style={[css.FlexCenter, {height:"auto", backgroundColor:"aa", width:"60%", alignItems:"center", flexDirection:"column", justifyContent:"center"}]}>
                                <Text style={css.textoAzul}>QR Code</Text>
                                <Text style={css.textoAzul}>Controle</Text>
                                <Text style={css.textoAcessar}>Clique para acessar</Text>
                            </View>
                        </View>
                        {/* <View style={{backgroundColor: "#3DC2FF", width:"100%", height:"50%", position:"absolute", bottom:0, borderBottomLeftRadius:5, borderBottomRightRadius:5, opacity:0.5}}></View> */}
                        <LinearGradient colors={['transparent', '#3DC2FF']} style={{position:"absolute", bottom:0, width:"100%", height:"50%", borderBottomLeftRadius:5, borderBottomRightRadius:5}}></LinearGradient>
                    </ItemBlock>}

                    {/* BOTAO REDIRECIONA PRO LEITOR DE QR */}
                    <ItemBlock acao={() => router.push("/leitorQrCode")}>
                        <View style={[css.FlexCenter, {backgroundColor:"#F5F5F5", height:150, width:"100%", flexDirection:"row", borderRadius:5}]}>
                            
                            <View style={[css.FlexCenter, {backgroundColor:"none", width:"40%"}]}>
                                <Image source={leitorQR} style={{height:"90%", width:"90%", backgroundColor:"aa" }} resizeMode="contain" />
                            </View>

                            <View style={[css.FlexCenter, {height:"auto", backgroundColor:"aa", width:"60%", alignItems:"center", flexDirection:"column", justifyContent:"center"}]}>
                                <Text style={css.textoAzul}>Leitor</Text>
                                <Text style={css.textoAzul}>QR Code</Text>
                                <Text style={css.textoAcessar}>Clique para acessar</Text>
                            </View>
                        </View>
                    </ItemBlock>

                        {/* ENTRADA E SAIDA */}
                    {/* <ItemBlock acao={() => router.push("/entrada_saida")}>
                        <View style={[css.FlexCenter, {backgroundColor:"#F5F5F5", height:150, width:"100%", flexDirection:"row", borderRadius:5}]}>
                            
                            <View style={[css.FlexCenter, {backgroundColor:"none", width:"40%"}]}>
                                <Image source={catraca} style={{height:"75%", width:"75%", backgroundColor:"aa"}} resizeMode="contain" />
                            </View>

                            <View style={[css.FlexCenter, {height:"auto", backgroundColor:"aa", width:"60%", alignItems:"center", flexDirection:"column", justifyContent:"center"}]}>
                                <Text style={css.textoAzul}>Registros</Text>
                                <Text style={css.textoAzul}>Entrada e Saida</Text>
                                <Text style={css.textoAcessar}>Clique para acessar</Text>
                            </View>
                        </View>
                    </ItemBlock> */}


                    {/* BLOCO PERFIL */}
                    {/* <ItemBlock acao={() => router.push("perfil")}>
                        <View style={[css.FlexCenter, {backgroundColor:"#F5F5F5", height:150, width:"100%", flexDirection:"row", borderRadius:5}]}>
                            
                            <View style={[css.FlexCenter, {backgroundColor:"none", width:"40%"}]}>
                                <Image source={perfilIcon} style={{height:"75%", width:"75%", backgroundColor:"aa"}} resizeMode="contain" />
                            </View>

                            <View style={[css.FlexCenter, {height:"auto", backgroundColor:"aa", width:"60%", alignItems:"center", flexDirection:"column", justifyContent:"center"}]}>
                                <Text style={css.textoAzul}>Acesse seu</Text>
                                <Text style={css.textoAzul}>Pefil de usuario</Text>
                                <Text style={css.textoAcessar}>Clique para acessar</Text>
                            </View>
                        </View>
                    </ItemBlock> */}

                    {/* BOLOCO ANOTACOES */}
                    <ItemBlock acao={() => router.push("Anotacoes")}>
                        <View style={[css.FlexCenter, {backgroundColor:"#F5F5F5", height:150, width:"100%", flexDirection:"row", borderRadius:5}]}>
                            
                            <View style={[css.FlexCenter, {backgroundColor:"none", width:"40%"}]}>
                                <Image source={anotacoesIcon} style={{height:"75%", width:"75%", backgroundColor:"aa"}} resizeMode="contain" />
                            </View>

                            <View style={[css.FlexCenter, {height:"auto", backgroundColor:"aa", width:"60%", alignItems:"center", flexDirection:"column", justifyContent:"center"}]}>
                                <Text style={css.textoAzul}>Acesse sua</Text>
                                <Text style={css.textoAzul}>Pagina de anotações</Text>
                                <Text style={css.textoAcessar}>Clique para acessar</Text>
                            </View>
                        </View>
                    </ItemBlock>

                    



                    <Botao acao={() => router.push("/leitorQrCode")} text="Voltar" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    <Botao acao={() => alert(JSON.stringify(token))} text="token" largura={200} cor="#3DC2FF"></Botao>
                    
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}