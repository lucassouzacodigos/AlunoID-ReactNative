import { router, Stack, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { css } from "../../Components/Styles";
import Botao from "../../Components/botao"
import { useState, useRef, useEffect } from "react";
import {IP} from "../../Components/IPLOCAL";
import { CameraView, useCameraPermissions } from "expo-camera";
import decodeToken from "../../utils/tokenToJson";



export default function leitorQrCode(){

    const larguraTela = Dimensions.get("window").width     
    const [token, setToken] = useState("")
    const [permission, requestPermission] = useCameraPermissions()
    const [cameraOpen, setCameraOpen] = useState(true)
    const cameraRef = useRef()
    const [fotoUri, setFotoUri] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [scanned, setScanned] = useState(false)

    const handleScan = ({data}) => {
        setScanned(true)
        alert("Qr Code Scaneado: redirecionando pra login facial : ")
        router.push("/leitorFacial")
    }

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
            alert(token.nome + " Reconhecido")
        } else alert("não é a mesma pessoa")

        
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
    

    
                    <Botao text="Abrir Camera" largura={120} cor="lightblue" acao={() => setCameraOpen(cur => !cur)} />
                    <Botao text="Tirar Foto" largura={190} cor="lightblue" acao={tirarFoto} />
                    <Text>{token.userID}</Text>
                    <Text>{token.nome}</Text>


                    { cameraOpen && 
                        <CameraView 
                        ref={cameraRef} 
                        style={{width:larguraTela, height:larguraTela}} 
                        facing="back"
                        barcodeScannerSettings={{barcodeTypes: ["qr"]}}
                        onBarcodeScanned={scanned ? undefined: handleScan}
                        />
                    }

                    {carregando && <Text>Carregando...</Text>}
    
    
                </View>
    
            </SafeAreaView>
        )
}


