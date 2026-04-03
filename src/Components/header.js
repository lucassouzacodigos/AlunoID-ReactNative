import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "./Styles";
import Botao from "./botao"
import { useEffect, useState } from "react";
import { IP } from "./IPLOCAL";
import api from "../utils/api";




export default function Header({token}){

    const [cpf, setCpf] = useState()
    const router = useRouter()

    useEffect(() => {
        async function getCpf(){
        try{
            const response = await api.get(`/controle/${token.userID}/cpf`)
            setCpf(response.data)
        } catch(err){console.log(err.response.data)}
        }
        if(token){
            getCpf()
        }
    }, [token?.userID])

    return (
        <View style={[css.FlexCenter, {backgroundColor:"transparent",width:"100%", height:"10%", flexDirection:"row", justifyContent:"center", borderTopWidth:0}]}>
            


            
            <View style={[css.FlexCenter, {backgroundColor:"transparent", width:"40%", flexDirection:"row"}]}>
                <Text style={{fontWeight:450, fontSize:18}}>Aluno</Text>
                <Text style={{fontWeight:450, fontSize:18}}>ID</Text>

                <Image source={require("../assets/impressao-digital.png")} style={{height:40, width:40}}></Image>
                {/* <Text>{cpf}</Text> */}
                {/* <Text>{token.userID}</Text> */}
                {/* <Text>{`/controle/${token.userID}/cpf`}</Text> */}
            </View>

            {
                cpf && 
                <TouchableOpacity onPress={() => router.push("/perfil")} style={{height:50, width:50, position:"absolute", right:15, borderRadius:200}}>
                    <Image 
                        style={{height:50, width:50, borderRadius:200, elevation:10, borderColor:"black", borderWidth:2}}
                        source={{ uri: `http://${IP}:3333/fotos/${token.nome}/${cpf}.png`}}
                    />
                </TouchableOpacity>
            }
            
            

        </View>
    )
}