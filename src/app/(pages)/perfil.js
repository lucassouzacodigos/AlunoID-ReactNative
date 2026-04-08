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
import { IP } from "../../Components/IPLOCAL";
import InputNomeado from "../../Components/InputNomeado";
import getEndereco from "../../utils/cep";
import dadosPessoais from '../../assets/dadosPessoais.png'
import enderecoEContato from '../../assets/enderecoecontato.png'



export default function Perfil(){

    const [endereco, setEndereco] = useState()
    const [token, setToken] = useState()
    const [cpf, setCpf] = useState()
    const [dadosAluno, setDadosAluno] = useState()
    
        useEffect(() => {
            async function loadToken() {
                const decoded = await decodeToken()
                setToken(decoded)
            }
            loadToken()
        }, [])

        useEffect(() => {
            if(!token?.userID) return

            async function getDados(){
                const response = await api.get(`/controle/getaluno/${token.userID}`)
                setDadosAluno(response.data)
                const endereco = await getEndereco(response.data.cep)
                setEndereco(endereco)
            }
            getDados()
        }, [token])


    return(
        <SafeAreaView style={[css.safeArea, css.FlexCenter, {}]}>
            <Stack.Screen options={{headerShown: false}} />

            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                <Header token={token}></Header>

                <ItemBlock>
                    <View style={[css.FlexCenter, {backgroundColor:"#fff", height:150, width:"100%", flexDirection:"row", borderRadius:15, justifyContent:"start", padding:5}]}>

                        { //foto de perfil
                            dadosAluno?.cpf && 
                            <Image style={{height:100, width:100, borderRadius:1500, elevation:10, borderColor:"black", borderWidth:2, margin:5}} 
                            source={{ uri: `http://${IP}:3333/fotos/${token?.nome}/${dadosAluno?.cpf}.png`}}></Image>
                        }
                        
                        {/* Textos ao lado da foto */}
                        <View style={{flexDirection:"column"}}>
                            <Text style={[css.altoRelevo, {}]}>{dadosAluno?.nome}</Text>
                            <Text style={[ {fontSize:15}]}>ETEC Embu</Text>
                        </View>
                    </View>
                </ItemBlock>


                <ItemBlock>
                    <View style={[css.FlexCenter, {backgroundColor:"#fff", height:"auto", width:"100%", flexDirection:"row", borderRadius:15, alignItems:"start", padding:5, justifyContent:"start", flexWrap:"wrap"}]}>
                        <Image source={dadosPessoais} style={{position:"absolute", right:15, top:15, width:50, height:50}} />
                        <Text style={{margin:5, marginRight:140, fontWeight:"bold", fontSize:25, color:"black", borderBottomColor:"black", borderBottomWidth:2}}>Dados Pessoais: </Text>
                        
                        <InputNomeado titulo="Cpf" content={dadosAluno?.cpf}/>
                        <InputNomeado titulo="Data Nasc." content={dadosAluno?.data_nasc}/>
                    </View>
                </ItemBlock>



                {/* ENDEREÇÔ E CONTATO */}
                <ItemBlock>
                    <View style={[css.FlexCenter, {backgroundColor:"#fff", height:"auto", width:"100%", flexDirection:"row", borderRadius:15, alignItems:"start", padding:5, justifyContent:"start", flexWrap:"wrap"}]}>
                        <Image source={enderecoEContato} style={{position:"absolute", right:15, top:15, width:50, height:50}} />
                        <Text style={{margin:5, marginRight:140, fontWeight:"bold", fontSize:25, color:"black", borderBottomColor:"black", borderBottomWidth:2}}>Endereço: </Text>
                        
                        
                        <InputNomeado titulo="CEP" content={dadosAluno?.cep}/>
                        <InputNomeado titulo="Rua" content={endereco?.logradouro}/>
                        <InputNomeado titulo="N°" content={dadosAluno?.numero_casa}/>
                        <InputNomeado titulo="Bairro" content={endereco?.bairro}/>
                        <InputNomeado titulo="Cidade" content={endereco?.localidade}/>
                        {dadosAluno?.complemento && <InputNomeado titulo="Complemento" content={dadosAluno?.complemento} />}
                    </View>
                </ItemBlock>





                

                
            </View>


        </SafeAreaView>
    )
}

