import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useEffect, useState } from "react";
import Header from "../../Components/header"
import ItemBlock from "../../Components/itemBlock"
import AsyncStorage from "@react-native-async-storage/async-storage";
import decodeToken from "../../utils/tokenToJson";





export default function home(){
    
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
                <Header></Header>
                
                <ScrollView style={{width:"100%", backgroundColor:"transparent"}} contentContainerStyle={{alignItems:"center", marginTop:10}}>

                    <ItemBlock>
                        <View style={{backgroundColor:"pink"}}>
                            <Text>aaa</Text>
                            <Text>bbb</Text>
                            <Text>ccc</Text>
                        </View>
                    </ItemBlock>
                        
                    <ItemBlock>
                        <Text>aaa</Text>
                        <Text>DDD</Text>
                        <Text>ccc</Text>
                    </ItemBlock>

                    <ItemBlock/>
                    <ItemBlock/>
                    <ItemBlock/>

                    <Text>{token.userID}</Text>
                    <Text>{token.nome}</Text>
                    <Botao text="Exibir token" cor="lightblue" largura={120} acao={() => console.log("botao clicado")}></Botao>
                    
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}