import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, Dimensions, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useState, useRef, useEffect } from "react";
import {IP} from "../../Components/IPLOCAL";
import { CameraView, useCameraPermissions } from "expo-camera";
import decodeToken from "../../utils/tokenToJson";



export default function leitorFacial(){

    const router = useRouter()
    const larguraTela = Dimensions.get("window").width     
    const alturaTela = Dimensions.get("window").height     
    const [token, setToken] = useState("")
    const [permission, requestPermission] = useCameraPermissions()
    const [cameraOpen, setCameraOpen] = useState(true)
    const cameraRef = useRef()
    const [fotoUri, setFotoUri] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [carregando, setCarregando] = useState(false)

    useEffect(() => {
    async function loadToken() {
        const decoded = await decodeToken()
        setToken(decoded)
    }
    loadToken()
}, [])
    const tirarFoto = async () =>{

        setCarregando(true)
        if(!cameraRef.current) return


        const foto = await cameraRef.current.takePictureAsync({
            base64: true
        })
        setFotoUri(foto.uri)
        setCameraOpen(false)


        const response = await fetch(`http://${IP}:3333/facial/comparar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },     body: JSON.stringify({
                imagemuri: foto.base64,
                id: token.userID
            })
        })
        const data = await response.json()
        //Só entra nesse if se o reconhecimento for TRUE
        if (data.match) {
            alert(`Rosto identificado, passagem liberada para: ${token.nome}`)
            setCameraOpen(false)
            router.push("/home")
        } 
        //Entra nesse else caso nao seja a mesma pessoa logada
        else {
            alert("não é a mesma pessoa")
            setCameraOpen(true)
        }
        setCarregando(false)
    }



    //caso nao tenho permissao da camera
    if (!permission?.granted) {
        return (
            <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
                <Stack.Screen options={{headerShown: false}} />
                <View style={[css.quadrado,css.FlexCenter]}> 
                    <Text style={{fontWeight:"bold", margin:10}}>Sem permissao para usar a camera :'(</Text>
                    <Botao text="Perimitir acesso" largura={120} cor="green" acao={requestPermission}></Botao>
                </View>
            </SafeAreaView>
        )
    }

    //caso tenha permissao de ver a camera
    return(
            <SafeAreaView style={[css.safeArea, css.FlexCenter]}>
                <Stack.Screen options={{headerShown: false}} />
    
                <View style={[css.quadrado,css.FlexCenter]}> 
    

    
                    <Text>{token.userID}</Text>
                    <Text>{token.nome}</Text>


                    { cameraOpen &&
                    <View>
                        <CameraView  ref={cameraRef} style={[css.cameraView, {width:larguraTela * 0.7, height:350, borderRadius: 15}]} facing="front" /> 

                        <Botao text="Leitura Facial" 
                        fontWeight="bold" 
                        fontSize={30} 
                        largura={larguraTela * 0.6} 
                        height={70} 
                        borderRadius={15} 
                        cor="lightblue" 
                        acao={tirarFoto} />
                    </View>
                    }

                    {carregando && 
                        <View>
                            <Text>Carregando...</Text>
                            <ActivityIndicator size="large" color="blue" />
                        </View>
                    }
    
    
                </View>
    
            </SafeAreaView>
            
        )
}


