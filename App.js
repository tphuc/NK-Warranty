import React from 'react';
import {View} from 'react-native'
import Main from './pages/MainList';
import DetailView from './pages/VoucherDetail';
import { NativeRouter, Route, Link , Switch} from "react-router-native";

const Home = () => (
    <View style={{backgroundColor: '#111111', height:90}}>
    </View>
)
const Index = () => {
    return(
        <NativeRouter>
            <Switch>
                <Route path='/pending/:voucherID' render={({match}) => <DetailView match={match}></DetailView>}></Route>
                <Route strict path="" component={Main}></Route>
            </Switch>
        </NativeRouter>
    )
}

export default Index;