import React, { Component, Fragment } from 'react';
import { View, Text, } from 'react-native'
import propTypes from 'prop-types';
import { Button, Icon, Header } from 'react-native-elements';
import MenuBtn from '../assets/menuButton';
import Appbar from '../assets/appBar';
import anime from 'animejs';
import { cWhiteMain, cRedMain, cRedSecondary } from '../assets/colors';
import Tabs from '../assets/Tabs';
import SearchBar from '../assets/searchBar';
import Card from '../assets/Cards';
import { FlatList } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
//testing


const testData = [
    {
        voucherID: 'A502996',
        name: 'Nguyen Van A',
        phone: '0889775268',
        location: '99 Nguyễn Thị Minh Khai, District 1, Ho Chi Minh City',
        product: "Laptop Macbook Pro 2015 model 15'inch MJLT2",
        warehouse: 'Fremont, Califorina',
        notes: 'Có tính phí',
        price: '2.000.000'
    },
    {
        voucherID: 'A502992',
        name: 'Nguyen Van A',
        phone: '088990080',
        location: '99 Nguyen Thi Minh Khai, Q1, Tp HCM',
        product: "Laptop Macbook Pro 2015 model 15'inch MJLT2",
        warehouse: 'Fremont, Califorina',
        notes: 'Có tính phí',
        price: '2.000.000'
    }
]

const Home = () => <Text>Home</Text>;

const List = () => <FlatList
    data={testData}
    keyExtractor={(item, index) => item.voucherID}
    renderItem={({ item }) => <Card info={item}></Card>}
/>

class Index extends Component {

    static propTypes = {
        text: propTypes.string,
    }

    static defaultProps = {
        text: 'TRẢ HÀNG BẢO HÀNH'
    }

    state = {
        isAppbarOpened: false,
    }

    render() {
        return (
            <Fragment>
                <Header
                    leftComponent={
                        <MenuBtn onPress={() => this.setState({ isAppbarOpened: true })}></MenuBtn>
                    }
                    centerComponent={{ text: this.props.text, style: { color: cWhiteMain, fontWeight: "900", fontSize: 16, } }}
                    containerStyle={{ backgroundColor: cRedMain, paddingBottom: 10, margin: 0, }}
                />

                <Tabs></Tabs>

                <SearchBar></SearchBar>
                <Route
                    path='/pending'
                    component={
                        List
                    }
                />
                <Route
                    path='/complete'
                    component={
                        Home
                    }
                />


                <Appbar show={this.state.isAppbarOpened} onPressClose={() => this.setState({ isAppbarOpened: false })}></Appbar>

            </Fragment>

        )
    }
}

export default Index;