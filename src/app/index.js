import { Stack, useFocusEffect, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../Components/Styles";

import { LinearGradient } from "expo-linear-gradient";
import logo from '../assets/impressao-digital.png'
import { Redirect } from "expo-router"
import { useEffect } from "react";


export default function IndexPage(){

    const router = useRouter()

    useEffect(() => {
        
    })


    return(
          <SafeAreaView style={[css.safeArea, css.FlexCenter, {backgroundColor:"#3DC2FF"}]}>
                    <Stack.Screen options={{headerShown: false}} />
        
                    
                    <View style={[css.quadrado, css.FlexCenter, {justifyContent:"center"}]}>
                        <LinearGradient 
                        colors={['#3DC2FF', '#537df0', '#3DC2FF']} 
                        style={{position:"absolute", bottom:0, width:"100%", height:"100%", borderBottomLeftRadius:5, borderBottomRightRadius:5, flex:1, alignItems:"center", justifyContent:"center", flexDirection:"row"}}
                        >
                            <Text style={{fontWeight:"bold", fontSize:60, color:"white"}}>Aluno</Text>
                            <Text style={{fontWeight:"bold", fontSize:60}}>ID</Text>
                            <Image source={logo} style={{width:90, height:90}}></Image>

                        </LinearGradient>




        
            </View>

            <Redirect href="/login"></Redirect>
        </SafeAreaView>  
    )
}   