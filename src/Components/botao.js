import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../Components/Styles"





export default function Botao(props){
    return(
        <TouchableOpacity 
        style={[css.botao , css.FlexCenter, {borderRadius:props.borderRadius? props.borderRadius : 15, width: props.largura, backgroundColor: props.cor, elevation: 5, marginVertical:10, height:props.height? props.height : 35}]}
        onPress={props.acao}
        >
        

            <Text style={{fontWeight: props.fontWeight? props.fontWeight : "normal", fontSize: props.fontSize? props.fontSize : 16}}>{props.text}</Text>
        </TouchableOpacity>
    )
}
