import { View, Text, Image, TouchableOpacity } from "react-native";
import { css } from "./Styles";
import { useEffect } from "react";
import api from "../utils/api";
import notinhaIcone from '../assets/notinhasIcone.png'
import apagarNota from '../assets/apagarnota.png'




export default function notaTab(props){

    const deletarNota = async (notaID) => {
        await api.delete(`/controle/deletarnota/${notaID}`)
        props.refresh()
    }





    return(
        <View style={[css.notaTab, {padding:10, flexDirection:"column", borderRadius:8, backgroundColor:"#2596be"}]}>
            <View style={{width:"100%", marginVertical:10, paddingVertical:10, borderBottomColor:"black", borderBottomWidth:1, flexDirection:"row", alignItems:"center"}}>
                <Image source={notinhaIcone}></Image>

                <View style={{width:"80%"}}>
                    <Text style={[css.notaTabTitulo,{}]}>{props.titulo}</Text>
                </View>

                <TouchableOpacity onPress={() => deletarNota(props.identifier)} style={{height:30, width:30}}>
                    <Image source={apagarNota} style={{height:30, width:30}}></Image>
                </TouchableOpacity>
            </View>


            <View style={{width:"100%", alignItems:"flex-start"}}>
                <Text style={[css.notaTabContent,{}]}>{props.content}</Text>
            </View>
        </View>
    )
}