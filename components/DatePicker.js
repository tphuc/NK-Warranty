import React, { Component } from 'react'
import { View, Modal, Text, TouchableHighlight, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements'
import ListItem from './ListItem';
import { Row, Col, Grid } from 'react-native-easy-grid'
import { cWhiteMain, cRedMain, cBlueMain } from '../assets/colors';
import {VN_TIME_TODAY, VN_TIME_LAST_WEEK, VN_TIME_TWO_WEEK, VN_TIME_CUST} from '../config/words';
import store from '../redux/store'

const getdateOffset = (date, offset) => {
    return new Date(date.getTime() + (offset * 24 * 60 * 60 * 1000));
}

export const dateToMMDDYYYY = (string) => {
    var dd = string.getDate();
    var mm = string.getMonth() + 1; //January is 0!
    var yyyy = string.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return mm + '/' + dd + '/' + yyyy;
}



export default class MyDatePicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            option: 'Hôm nay',
            startDate: store.getState().params ? store.getState().params['FromDate'] : dateToMMDDYYYY(new Date()),
            endDate: store.getState().params ? store.getState().params['To__Date']: dateToMMDDYYYY(new Date()),
        }
    }

    getDayRange = (option) => {
        switch (option) {
            case VN_TIME_TODAY:
                var startDate = dateToMMDDYYYY(new Date())
                return [startDate, startDate]

            case VN_TIME_LAST_WEEK:
                var endDate = dateToMMDDYYYY(new Date())
                var startDate = dateToMMDDYYYY(getdateOffset(new Date(), -7))
                return [startDate, endDate]
            
            case VN_TIME_TWO_WEEK:
                var endDate = dateToMMDDYYYY(new Date())
                var startDate = dateToMMDDYYYY(getdateOffset(new Date(), -14))
                return [startDate, endDate]

            
            case VN_TIME_CUST:
            default:
                return [this.state.startDate, this.state.endDate]

        }

    }

    render() {
        const { visible, onClose, onApply } = this.props
        return (

            <Modal
                animationType="slide"
                visible={visible}
            >
                <View style={{ marginTop: 100 }}>
                    {
                        [VN_TIME_TODAY, VN_TIME_LAST_WEEK, VN_TIME_TWO_WEEK, VN_TIME_CUST].map(
                            val => {
                                return <TouchableHighlight key={val} onPress={() => this.setState({ option: val })} underlayColor={cWhiteMain}>
                                    <ListItem
                                        leftElement={val}
                                        leftElementStyle={{ padding: '5%', fontSize: 20 }}
                                        leftCol={8} rightCol={2}
                                        rightIcon={this.state.option === val && 'check'}
                                        rightIconStyle={{ color: cBlueMain }}
                                    ></ListItem>
                                </TouchableHighlight>
                            }
                        )
                    }

                    {
                        this.state.option === 'Chọn khoảng thời gian' &&
                        <View>
                            <View style={{ display: 'flex', flexDirection: 'row', }}>
                                <View style={{ display: 'flex', justifyContent: 'center', width: '40%', }} ><Text style={{ textAlign: 'center', color: cRedMain }}> Từ ngày (*)</Text></View>
                                <DatePicker
                                    style={{ width: '50%' }}
                                    date={this.state.startDate}
                                    mode="date"
                                    placeholder="ngày bắt đầu"
                                    format="L"
                                    minDate="01/1/2017"
                                    maxDate="01/1/2020"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            right: 4,
                                            top: 4,
                                            marginRight: 0
                                        },
                                        dateInput: {
                                            borderWidth: 0,
                                            display: 'flex',
                                            alignItems: 'flex-start'
                                        }
                                    }}

                                    onDateChange={(date) => { this.setState({ startDate: date }) }}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', }}>
                                <View style={{ display: 'flex', justifyContent: 'center', width: '40%' }} ><Text style={{ textAlign: 'center', color: cRedMain }}> Đến ngày (*)</Text></View>
                                <DatePicker
                                    style={{ width: '50%' }}
                                    date={this.state.endDate}
                                    mode="date"
                                    placeholder="ngày kết thúc"
                                    format="L"
                                    minDate="01/1/2017"
                                    maxDate="01/1/2020"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            right: 4,
                                            top: 4,
                                            marginRight: 0
                                        },
                                        dateInput: {
                                            borderWidth: 0,
                                            display: 'flex',
                                            alignItems: 'flex-start'
                                        }
                                    }}
                                    onDateChange={(date) => { this.setState({ endDate: date }) }}
                                />
                            </View>
                        </View>
                    }
                    <Grid>
                        <Row>
                            <Col style={{ padding: 5, height: 100 }}>
                                <Button
                                    title="Trở lại"
                                    buttonStyle={{ backgroundColor: cRedMain, height: 50 }}
                                    titleStyle={{ fontSize: 15 }}
                                    onPress={() => { if (onClose) onClose() }}
                                />
                            </Col>
                            <Col style={{ padding: 5, height: 100 }}>
                                <Button
                                    disabled={!this.state.option}
                                    title="Xác nhận"
                                    buttonStyle={{ height: 50 }}
                                    titleStyle={{ fontSize: 15 }}
                                    onPress={() => { 
                                        if (onApply) onApply(...this.getDayRange(this.state.option));
                                        if (onClose) onClose() 
                                    }}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </View>
            </Modal>

        )
    }
}