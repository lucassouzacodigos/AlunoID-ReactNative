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
import NotaTab from '../../Components/notaTab'
import notaIcon from '../../assets/anotacoes.png'
import notinhasIcone from '../../assets/notinhasIcone.png'


export default function Perfil(){

    const [endereco, setEndereco] = useState()
    const [token, setToken] = useState(null)
    const [cpf, setCpf] = useState()
    const [dadosAluno, setDadosAluno] = useState()
    const [notas, setNotas] = useState([])
    
        useEffect(() => {
            async function loadToken() {
                const decoded = await decodeToken()
                setToken(decoded)
            }
            loadToken()
        }, [])

        async function getNotas(){
                try{
                const response = await api.get(`/controle/getnotas/${token.userID}`)
                const toarray = [...response.data]
                setNotas(toarray)
                } catch(err){
                    console.log(err)
                }
            }

        useEffect(() => {
            if (token == null){
                console.log("token vazio")
                return
            }
            getNotas()
        },[token])




    return(
        <SafeAreaView style={[css.safeArea, css.FlexCenter, {}]}>
            <Stack.Screen options={{headerShown: false}} />

            <View style={[css.quadrado, css.FlexCenter, {justifyContent:"start"}]}>
                <Header token={token}></Header>

                <ScrollView style={{width:"90%", borderRadius:15, backgroundColor:"white",padding:15 }} contentContainerStyle={[css.FlexCenter,{}]}>
                    <View style={{backgroundColor:"transparent", width:"100%", height:60, flexDirection:"row", justifyContent:"space-between",}}>
                        <Text style={[css.textoAzul,{fontWeight:"bold", fontSize:30}]}>Anotacoes: </Text>
                        <Image source={notaIcon} style={{height:45, width:45}}></Image>
                    </View>

                    <View style={{ width:"100%", }}>
                        {notas.length > 0 && notas.map((nota) => {
                            return(
                                <NotaTab refresh={() => getNotas()} identifier={nota.anotacao_id} key={nota.anotacao_id} titulo={nota.titulo} content={nota.conteudo}/>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>


        </SafeAreaView>
    )
}

