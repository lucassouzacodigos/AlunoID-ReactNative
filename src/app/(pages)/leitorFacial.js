import { Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, Dimensions, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useState, useRef, useEffect } from "react";
import {IP} from "../../Components/IPLOCAL";
import { CameraView, useCameraPermissions } from "expo-camera";
import decodeToken from "../../utils/tokenToJson";
import cameraIcon from '../../assets/cameraIcon.png'



export default function leitorFacial(){

    const router = useRouter()
    const larguraTela = Dimensions.get("window").width     
    const alturaTela = Dimensions.get("window").height     
    const [token, setToken] = useState("")
    const [permission, requestPermission] = useCameraPermissions()
    const [cameraOpen, setCameraOpen] = useState(false)
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

    setTimeout(() => {
        if(cameraOpen == false){
            setCameraOpen(true)
        }
    }, 1500);
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
        let data

        try {
            const text = await response.text()

            // tenta converter pra JSON
            data = JSON.parse(text)

        } catch (err) {
            console.log("Resposta não é JSON (provavelmente HTML)")

            // força comportamento de erro
            data = { match: false }
        }
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

    const debug = () => {
        setCameraOpen((cur) => !cur)
        setCarregando((cur) => !cur)
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
            <SafeAreaView style={[css.safeArea, css.FlexCenter, {backgroundColor:"white"}]} edges={[]} >
                <Stack.Screen options={{headerShown: false}}  />
    
                <View style={[css.quadrado,css.FlexCenter, {backgroundColor:"#3DC2FF", height:"100%"}]}> 
    

    
                    {/* <Text>{token.userID}</Text> */}


                    { cameraOpen &&
                    <View style={{justifyContent:"center", alignItems:"center", backgroundColor:"transparent", height:"100%", width:"100%"}}>

                        <CameraView  ref={cameraRef} style={[css.cameraView, {width:larguraTela * 1, height:"100%", justifyContent:"space-between", paddingVertical:50}]} facing="front">
                        
                        <View style={{height:"10%", alignItems:"center", justifyContent:"center", width:"100%"}}>
                            <Text style={{fontWeight:"bold", fontSize:20, backgroundColor:"transparent", width:"100%", color:"black", textAlign:"center", justifyContent:"center", alignItems:"center"}}>Reconhecimento facial para:</Text>
                            
                            <Text style={{color:"black", backgroundColor:"transparent", width:"100%", fontSize:23, justifyContent:"center", fontWeight:"bold", textAlign:"center"}}>{token.nome}</Text>
                        </View>
                            
                            <TouchableOpacity onPress={tirarFoto} style={{borderColor:"white", borderWidth:2, padding:15, borderRadius:200, alignItems:"center", justifyContent:"center"}}>
                                <Image style={{height:75, width:75}} source={cameraIcon}></Image>
                            </TouchableOpacity>

                        </CameraView> 

                        
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


