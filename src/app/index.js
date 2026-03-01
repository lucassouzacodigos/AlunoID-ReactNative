import React from "react"
import {Text} from 'react-native'
import { Redirect } from "expo-router"

export default function IndexPage(){
    return(
            <Redirect href="../login" />
    )
}   