import React, { Component, Fragment } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import propTypes from 'prop-types';
import { Header, SearchBar, Icon } from 'react-native-elements';
import MenuBtn from '../assets/menuButton';
import Appbar from '../components/Appbar';
import DatePicker, { dateToMMDDYYYY } from '../components/DatePicker';


import { cWhiteMain, cRedMain, cRedSecondary, cGreyMain, cGreySecondary, cWhiteSecondary } from '../assets/colors';
import Tabs from '../components/Tabs';
import VoucherCard from '../components/VoucherCard';
import { FlatList } from 'react-native';
import { Route, Redirect } from "react-router-native";
import { GetListWarrantyReturnByUser, GetHistoryWarrantyReturn, EMplCode } from '../config/api';
import { NO_DATA, SEVER_NOT_RESPOND } from '../config/errors';
import { VN_NO_WARRANTY, VN_SEVER_NOT_RESPOND } from '../config/words';

import { SetHistoryQueryParams } from '../redux/actions'
import store from '../redux/store';


const errorDisplay = {
    [NO_DATA]: VN_NO_WARRANTY,
    [SEVER_NOT_RESPOND]: VN_SEVER_NOT_RESPOND
}


const List = (props) => <FlatList
    data={props.data}
    keyExtractor={(item, index) => item.voucherID}
    renderItem={({ item }) => <VoucherCard info={item}></VoucherCard>}
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
        dataPending: [],
        dataHistory: [],
        searchKey: '',
        filterModalOpen: false,
        savedParams: {
            fromDate: dateToMMDDYYYY(new Date()),
            toDate: dateToMMDDYYYY(new Date())
        }
    }

    componentDidMount() {
        this.getData('/pending')
    }

    constructor(props) {
        super(props)
    }

    getData = (route) => {
        switch (route) {
            case '/pending':
                this.getListPendingWarranty({
                    'EMplCode': EMplCode,
                })
                break

            case '/history':
                this.getHistoryWarranty({
                    'FromDate': store.getState() ? store.getState().params['FromDate'] : dateToMMDDYYYY(new Date()),
                    'To__Date': store.getState() ? store.getState().params['To__Date'] : dateToMMDDYYYY(new Date()),
                    'EMplCode': EMplCode,
                })
                break

            default:
                break
        }
    }

    getListPendingWarranty = (params) => {
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
        },
            params
        )
            .then(data => {
                if (data.length) this.setState({ dataPending: data });
                else this.setState({ dataPending: NO_DATA })
            })
            .catch(res => { console.log(res); this.setState({ dataPending: SEVER_NOT_RESPOND }) })
    }

    getHistoryWarranty = (params) => {
        store.dispatch(SetHistoryQueryParams(params))

        GetHistoryWarrantyReturn({
            voucherID: 'mainCode',
            name: 'custName',
            phone: 'custTelp',
            location: 'custAddr',
            product: 'art_Name',
            departure: 'dlvrDate',
            warehouse: 'wrhsName',
            notes: 'exlnNote',
            price: 'sum_HVAT'
        },
            params
        )
            .then(data => {
                if (data.length) this.setState({ dataHistory: data });
                else this.setState({ dataHistory: NO_DATA })
            })
            .catch(res => { console.log(res); this.setState({ dataHistory: SEVER_NOT_RESPOND }) })
    }


    render() {
        return (
            <Fragment>
                <Redirect exact to='pending'></Redirect>
                <Header
                    leftComponent={<MenuBtn onPress={() => this.setState({ isAppbarOpened: true })}></MenuBtn>}
                    centerComponent={{ text: this.props.text, style: { color: cWhiteMain, fontWeight: "900", fontSize: 16, } }}
                    containerStyle={{ backgroundColor: cRedMain, paddingBottom: 10, margin: 0, }}
                    rightComponent={this.tabs && this.tabs.getSelectedItem().route === '/history' && <Icon name='filter' color={cWhiteSecondary} type='feather' onPress={() => { this.setState({ filterModalOpen: true }) }} />}
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
                ]}
                    onChange={item => this.getData(item.route)}
                    ref={ref => this.tabs = ref}
                />
                <SearchBar
                    placeholder="tìm kiếm CT..."
                    onChangeText={(val) => this.setState({ searchKey: val.toUpperCase() })}
                    value={this.state.searchKey}
                    lightTheme={true}
                    round
                />
                <Route exact path='/pending' render={({ match }) =>
                    this.state.dataPending === NO_DATA || this.state.dataPending === SEVER_NOT_RESPOND ?
                        <TouchableHighlight
                            onPress={() => { this.getData('/pending'); this.setState({ dataPending: [] }); }}
                            underlayColor={cWhiteSecondary}
                        >
                            <View >
                                <Text style={{ alignSelf: 'center', color: 'grey', padding: 20 }} >{errorDisplay[this.state.dataPending]}</Text>
                                <Icon type='feather' style={{ alignSelf: 'center' }} color='grey' name='refresh-cw' />
                            </View>
                        </TouchableHighlight>
                        :
                        <FlatList
                            data={this.state.dataPending.length ? this.state.dataPending : [{}, {}]}
                            renderItem={({ item }) => { return <VoucherCard info={item} match={match} searchKey={this.state.searchKey} ></VoucherCard> }}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state.searchKey}
                        />}
                />
                <Route exact path='/history' render={({ match }) =>

                    <React.Fragment>
                        {
                            this.state.dataHistory === NO_DATA || this.state.dataHistory === SEVER_NOT_RESPOND ?
                                <TouchableHighlight
                                    underlayColor={cWhiteSecondary}
                                    onPress={() => { this.getData('/history'); this.setState({ dataHistory: [] }); }}>
                                    <View >
                                        <Text style={{ alignSelf: 'center', color: 'grey', padding: 20 }} >{errorDisplay[this.state.dataHistory]}</Text>
                                        <Icon type='feather' style={{ alignSelf: 'center' }} color='grey' name='refresh-cw' />
                                    </View>
                                </TouchableHighlight>
                                :
                                <FlatList
                                    data={this.state.dataHistory.length ? this.state.dataHistory : [{}, {}]}
                                    renderItem={({ item }) => { return <VoucherCard info={item} match={match} searchKey={this.state.searchKey} ></VoucherCard> }}
                                    keyExtractor={(item, index) => index.toString()}
                                    extraData={this.state.searchKey}
                                />
                        }
                        <DatePicker visible={this.state.filterModalOpen} onClose={() => {
                            this.setState({ filterModalOpen: false });
                        }}
                            onApply={(start, end) => {

                                this.setState({
                                    savedParams: {
                                        fromDate: start,
                                        toDate: end
                                    }
                                });
                                this.getHistoryWarranty({
                                    'FromDate': start,
                                    'To__Date': end,
                                    'EMplCode': EMplCode,
                                })
                            }} ></DatePicker>
                    </React.Fragment>
                }
                />
                <Appbar show={this.state.isAppbarOpened} onPressClose={() => this.setState({ isAppbarOpened: false })}></Appbar>
            </Fragment>
        )
    }
}

export default Index;