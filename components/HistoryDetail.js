import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Image, Modal, Picker, ActivityIndicator } from 'react-native'
import { Header, Icon, Button } from 'react-native-elements';

import { cWhiteMain, cRedMain, cBlueMain, cRedSecondary } from '../assets/colors';
import { Link } from 'react-router-native';
import propTypes from 'prop-types';

import { GetListWarrantyReturnByUser, GetListReasonChange, siteCode, userCode, userName, UpdateWarrantyReturn, GetHistoryWarrantyReturn } from '../config/api'
import store from '../redux/store'

const MAIN_LOGS = {
    success: 'Hoàn tất',
    delay: 'Chuyển về chờ giao'
}

const sectionHeaders = {
    voucherInfo: 'Thông tin chứng từ',
    productInfo: 'Thông tin sản phẩm',
    warrantyInfo: 'Thông tin bảo hành',
}

const sectionSubHeaders = {
    voucherID: 'CT mua hàng',
    buyDate: 'Ngày mua hàng',
    name: 'Tên SP',
    seriNumber: 'Số seri',
    modelNumber: 'Số model',
    testInfo: 'TT kiểm tra',
    warrantyType: 'Loại bảo hành',
    handling: 'Loại xử lí'
}


const mapObjectByKeys = (obj, keys) => {
    var newObj = {}
    Object.keys(obj).forEach(key => {
        if (keys.includes(key))
            newObj[key] = obj[key]
    })
    return newObj
}

const ListItem = (props) => {
    const {
        leftCol = leftCol ? leftCol : 3,
        rightCol = rightCol ? rightCol : 7,

        leftElement,
        leftIcon,

        rightElement,
        rightIcon,

        leftElementStyle,
        rightElementStyle,
        rightIconOnPress,

        borderBottom = (borderBottom === false) ? false : true,
        style
    } = props


    return (
        <View style={{ paddingVertical: 5, borderBottomColor: '#eeeeee', borderBottomWidth: borderBottom ? 1 : 0, ...style }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                {
                    leftElement ?
                        <Text style={{ width: `${leftCol}0%`, padding: 3, ...leftElementStyle }}>{leftElement}</Text> :
                        <View style={{ width: `${leftCol}0%`, padding: 3, ...leftElementStyle }}>
                            {leftIcon && <Icon name={leftIcon} type='feather' />}
                        </View>
                }
                {
                    rightElement ?
                        <Text style={{ width: `${rightCol}0%`, padding: 5, ...rightElementStyle }}>{rightElement}</Text> :
                        <View style={{ width: `${rightCol}0%`, padding: 5, ...rightElementStyle }}>
                            {rightIcon && <Icon name={rightIcon} type='feather' onPress={rightIconOnPress} />}
                        </View>
                }
            </View>
        </View>
    )

}






export default class Index extends Component {

    state = {
        info: {},
        images: [],
        isModalVisible: false,
        imageLoading: false
    }

    componentDidMount() {
        const params = store.getState().params
        GetHistoryWarrantyReturn({
            voucherInfo: {
                voucherID: `mainCode=${this.props.match.params.voucherID}`,
                buyDate: 'mainDate',
            },
            productInfo: {
                name: 'art_Name',
                seriNumber: 'art_Seri',
                modelNumber: 'art_Code',
            },
            warrantyInfo: {
                testInfo: 'caseExln',
                warrantyType: 'rsltType',
                handling: 'rsltName'
            },
        },
            params
        )
            .then(data => {
                this.setState({ info: data[0] });
            }
        )
    }




    render(props) {

        const { info } = this.state
        return (
            <Fragment>

                <Header
                    leftComponent={
                        <Link exact to='/history'>
                            <Icon
                                name='chevron-left'
                                type='feather'
                                color={cWhiteMain} />
                        </Link>
                    }
                    centerComponent={{
                        text: this.props.match.params.voucherID,
                        style: {
                            color: cWhiteMain,
                            fontWeight: "900",
                            fontSize: 16
                        }
                    }}
                    containerStyle={{ backgroundColor: cRedMain, paddingBottom: 10, margin: 0, }} />

                <ScrollView>
                    {
                        Object.keys(info).map((header) => {
                            return <View>
                                <ListItem
                                    key={header}
                                    leftCol={5}
                                    rightCol={5}
                                    leftElement={sectionHeaders[header].toUpperCase()}
                                    style={{ backgroundColor: '#eeeeee' }}
                                    leftElementStyle={{ fontWeight: '700' }} />
                                {
                                    Object.keys(info[header]).map(item =>
                                        (
                                            <ListItem
                                                key={item}
                                                leftElement={sectionSubHeaders[item]}
                                                rightElement={info[header][item]}
                                                leftElementStyle={{ fontWeight: '600' }} />
                                        )
                                    )
                                }
                            </View>
                        })
                    }


                </ScrollView>
            </Fragment>
        )
    }
}


