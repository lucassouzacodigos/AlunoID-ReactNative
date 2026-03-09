import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'


async function decodeToken(){
    const token = await AsyncStorage.getItem("token")

    var decoded

    if (token != null){
        decoded = jwtDecode(token)
    } 
    else{
        return null
    }

    return {
        "nome": decoded.nome,
        "userID": decoded.userID,
        "tipo_usuario": decoded.tipo_usuario
    }
}

export default decodeToken