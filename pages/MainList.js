import React, { Component, Fragment } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import propTypes from 'prop-types';
import { Button, Icon, Header, SearchBar } from 'react-native-elements';
import MenuBtn from '../assets/menuButton';
import Appbar from '../components/Appbar';
import anime from 'animejs';
import { cWhiteMain, cRedMain, cRedSecondary } from '../assets/colors';
import Tabs from '../components/Tabs';
import Card from '../components/Cards';
import { FlatList } from 'react-native';
import { Route, Redirect } from "react-router-native";
import { GetListWarrantyReturnByUser } from '../config/api';



//testing


var testData = []


const Home = () => <Text>Home</Text>;

const List = (props) => <FlatList
    data={props.data}
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
        testData: [],
        searchKey: ''
    }

    componentDidMount() {

        // setTimeout(() => {
        //     this.setState({
        //         testData: [{
        //             voucherID: 'A502996',
        //             name: 'Nguyen Van A',
        //             phone: '0889775268',
        //             location: '99 Nguyễn Thị Minh Khai, District 1, Ho Chi Minh City',
        //             product: "Laptop Macbook Pro 2015 model 15'inch MJLT2",
        //             departure: '22/08/2019',
        //             warehouse: 'Fremont, Califorina',
        //             notes: 'Có tính phí',
        //             price: '2.000.000'
        //         },
        //         {
        //             voucherID: 'B502992',
        //             name: 'Nguyen Van A',
        //             phone: '088990080',
        //             location: '170 Nơ Trang Long, Phường 12, Bình Thạnh, Hồ Chí Minh',
        //             product: "Laptop Macbook Pro 2015 model 15'inch MJLT2",
        //             departure: '31/07/2019',
        //             warehouse: 'Fremont, Califorina',
        //             notes: 'Có tính phí',
        //             price: '2.000.000'
        //         }]
        //     });
        // },
        //  500)

        this.getData()

    }

    getData = () => {
        GetListWarrantyReturnByUser({
            voucherID: 'mainCode',
            name: 'custName',
            phone: 'custTelp',
            location: 'custAddr',
            product: 'art_Name',
            departure: 'dlvrDate',
            warehouse: 'wrhsName',
            notes: 'exlnNote',
            price: 'sum_HVAT'
        })
        .then(data => {this.setState({testData: data})})


    }

    render() {
        return (
            <Fragment>
                <Redirect exact to='pending'></Redirect>
                <Header
                    leftComponent={<MenuBtn onPress={() => this.setState({ isAppbarOpened: true })}></MenuBtn>}
                    centerComponent={{ text: this.props.text, style: { color: cWhiteMain, fontWeight: "900", fontSize: 16, } }}
                    containerStyle={{ backgroundColor: cRedMain, paddingBottom: 10, margin: 0, }}
                />
                <Tabs items={[
                    {
                        tabName: 'Chờ xử lí',
                        route: '/pending'
                    },
                    {
                        tabName: 'Đã xử lí',
                        route: '/history'
                    }
                ]} />
                <SearchBar
                    placeholder="tìm kiếm CT..."
                    onChangeText={(val) => this.setState({ searchKey: val.toUpperCase() })}
                    value={this.state.searchKey}
                    lightTheme={true}
                    round
                />
                <Route exact path='/pending' render={({ match }) =>
                    <FlatList
                        data={this.state.testData.length ? this.state.testData : [{}, {}]}
                        renderItem={({ item }) => { return <Card info={item} match={match} searchKey={this.state.searchKey} ></Card> }}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state.searchKey}
                    />}
                />
                <Route path='/history' component={Home} />
                <Appbar show={this.state.isAppbarOpened} onPressClose={() => this.setState({ isAppbarOpened: false })}></Appbar>
            </Fragment>
        )
    }
}

export default Index;