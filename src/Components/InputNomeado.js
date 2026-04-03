import { Text, Image, View } from "react-native";




export default function InputNomeado(props){




    return(
        <View style={{margin:5, flexDirection:"row", alignItems:"flex-end",backgroundColor:"white", borderRadius:10}}>
            <Text style={{color:"#1C3D6E", fontWeight:"bold", fontSize:20}}>{props.titulo}: </Text>
            <Text style={{marginRight:50, fontWeight:"bold", fontSize:17}}>{props.content}</Text>
        </View>
    )
}