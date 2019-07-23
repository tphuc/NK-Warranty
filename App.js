import React from 'react';
import {View} from 'react-native'
import Main from './pages/PendingPage'
import { NativeRouter, Route, Link } from "react-router-native";
const Index = () => {
    return(
        <NativeRouter>
            <Main></Main>
        </NativeRouter>

    )
}

export default Index;