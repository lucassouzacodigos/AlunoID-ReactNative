import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../Components/Styles"





export default function Botao(props){
    return(
        <TouchableOpacity 
        style={[css.botao , css.FlexCenter, {width: props.largura, backgroundColor: props.cor, elevation: 5}]}
        onPress={props.acao}
        >
        

            <Text>{props.text}</Text>
        </TouchableOpacity>
    )
}
