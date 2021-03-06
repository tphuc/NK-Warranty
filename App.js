import React from 'react';
import {View, Text, YellowBox} from 'react-native'
import Main from './pages/MainList';
import DetailView from './pages/VoucherDetail';
import HistoryDetail from './components/HistoryDetail';
import { NativeRouter, Route, Link , Switch} from "react-router-native";
import store from './redux/store'
import { Provider } from 'react-redux'

YellowBox.ignoreWarnings(['']);
const Index = () => {
    return(
        <Provider store={store}>
        <NativeRouter>
            <Switch>
                <Route path='/pending/:voucherID' render={({match}) => <DetailView match={match}></DetailView>}></Route>
                <Route path='/history/:voucherID' render={({match}) => <HistoryDetail match={match}></HistoryDetail>}></Route>
                <Route strict path="" component={Main}></Route>
            </Switch>
        </NativeRouter>
        </Provider>
    )
}

export default Index;