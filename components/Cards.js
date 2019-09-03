import React, { Component } from 'react';
import { Linking, View, Text } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import propTypes from 'prop-types';
import { Link } from 'react-router-native'
import { cBlueMain, cBluePrimary, cRedMain, cBlueSecondary, cWhiteMain } from '../assets/colors';
import { borderTopRadius, borderBottomRadius } from '../utils/styling'




const TitlesVN = {
    voucherID: '',
    name: 'Người nhận',
    phone: 'SĐT',
    location: 'Địa chỉ',
    product: 'Sản phẩm',
    departure: 'Ngày điều',
    warehouse: 'Nơi xuất',
    notes: 'Ghi chú',
    price: 'Giá'
}

const SkeletonLoader = () => (
    <Placeholder
        Animation={Fade}
        style={{ padding: 20 }}
    >
        <PlaceholderLine height={40} style={{ marginBottom: 20, borderRadius: 2, backgroundColor: '#bbdefb' }} />
        {
            new Array(5).fill(0).map((val, index) =>
                <View key={index}>
                    <PlaceholderLine width={Math.random() * 20 + 30} height={25} style={{ marginBottom: 15, borderRadius: 8 }} />
                    <PlaceholderLine width={Math.random() * 20 + 60} height={20} style={{ marginBottom: 15, borderRadius: 8 }} />
                </View>
            )
        }
    </Placeholder>
)

export default class Index extends Component {

    static propTypes = {
        info: propTypes.shape({
            voucherID: propTypes.string,
            name: propTypes.string,
            phonge: propTypes.string,
            location: propTypes.string,
            product: propTypes.string,
            departure: propTypes.string,
            warehouse: propTypes.string,
            notes: propTypes.string,
            price: propTypes.string,
        })
    }

    static defaultProps = {
        info: {
            voucherID: 'A502996',
            name: 'Nguyen Van A',
            phone: '0889775268',
            location: '99 Nguyen Thi Minh Khai, Q1, Tp HCM',
            product: "Laptop Macbook Pro 2015 model 15'inch MJLT2",
            departure: '16/06/2019 15:00',
            warehouse: 'Fremont, Califorina',
            notes: 'Có tính phí',
            price: '2.000.000'
        }
    }

    state = {
        info: this.props.info
    }
    _openPhone = (phoneNumber) => { Linking.openURL(`tel:${phoneNumber}`) }
    _openMap = (location) => { Linking.openURL(`http://maps.google.co.in/maps?q=${location}`) }

    _Icon = (key, value) => {
        const iconKey = {
            'location': 'map-marker',
            'phone': 'phone'
        }
        const iconAction = {
            'location': this._openMap,
            'phone': this._openPhone
        }

        switch (key) {
            case "phone":
            case "location":
                return <Icon name={iconKey[key]} type='material-community' color={cBlueMain} onPress={() => iconAction[key](value)} />

            default:
                return
        }
    }

    render() {
        const { match } = this.props
        return (
            Object.keys(this.props.info).length ?
                (
                    this.props.info.voucherID.includes(this.props.searchKey) ?
                        <Card containerStyle={{
                            borderRadius: 5,
                            borderWidth: 0,
                            padding: 0,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 3,
                        }}>
                            <Link
                                to={`${match.path}/${this.props.info.voucherID}`}
                                underlayColor={cBlueSecondary}
                                style={{
                                    height: 50,
                                    backgroundColor: cBlueMain,
                                    ...borderTopRadius(5),
                                }}
                            >
                                <View style={{
                                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%'
                                }}>
                                    <Text style={{ color: cWhiteMain, fontWeight: '600', padding:15, fontSize: 17 }} >{this.props.info.voucherID}</Text>
                                    <View style={{padding: 10}}>
                                    <Icon
                                        size={30}
                                        name='chevron-right'
                                        type='feather'
                                        color={cWhiteMain}
                                    />
                                    </View>
                                    
                                </View>

                            </Link>

                            {
                                Object.keys(this.props.info).map((key, index) => {
                                    switch (key) {
                                        case 'voucherID':
                                            break

                                        default:
                                            return <ListItem
                                                key={index}
                                                title={ <Text style={{fontSize: 16}}><Text style={{fontWeight:'800'}}>{TitlesVN[key]}:</Text> {this.props.info[key]} </Text>}
                                                rightIcon={this._Icon(key, this.props.info[key])}
                                                containerStyle={{ ...borderBottomRadius(5) }}
                                                bottomDivider
                                            />
                                    }
                                })
                            }
                        </Card>
                        :
                        null
                )
                :
                <SkeletonLoader></SkeletonLoader>
        )
    }
}