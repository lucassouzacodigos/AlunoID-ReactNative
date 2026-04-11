import { View, Text } from "react-native";
import { css } from "./Styles";
import { useEffect } from "react";
import api from "../utils/api";



export default function notaTab(props){







    return(
        <View style={[css.notaTab, {padding:10, }]}>
            <Text style={[css.notaTabTitulo,{}]}>{props.titulo}</Text>
            <Text style={[css.notaTabContent,{}]}>{props.content}</Text>
        </View>
    )
}