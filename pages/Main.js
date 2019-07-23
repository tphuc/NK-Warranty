import React, { Component } from 'react';
import { Linking, View } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import propTypes from 'prop-types';
import { cBlueMain, cBluePrimary } from '../assets/colors';

const TitlesVN = {
    voucherID: '',
    name: 'Người nhận',
    phone: 'SĐT',
    location: 'Địa điểm',
    product: 'Sản phẩm',
    warehouse: 'Nơi xuất',
    notes: 'Ghi chú',
    price: 'Giá'
}

export default class Index extends Component {

    static propTypes = {
        info: propTypes.shape({
            voucherID: propTypes.string,
            name: propTypes.string,
            phonge: propTypes.string,
            location: propTypes.string,
            product: propTypes.string,
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
            warehouse: 'Fremont, Califorina',
            notes: 'Có tính phí',
            price: '2.000.000'
        }
    }

    _openPhone = (phoneNumber) => { Linking.openURL(`tel:${phoneNumber}`) }
    _openMap = (location) => { Linking.openURL(`http://maps.google.co.in/maps?q=${location}`) }

    _Icon = (key, value) => {
        const iconKey = {
            'location': 'map-pin',
            'phone': 'phone'
        }
        const iconAction = {
            'location': this._openMap,
            'phone': this._openPhone
        }

        switch (key) {
            case "phone":
            case "location":
                return <Icon name={iconKey[key]} type='feather' color={cBlueMain} onPress={() => iconAction[key](value)} />

            default:
                return
        }
    }

    render() {
        return (
            <View>
                <Card containerStyle={{
                    borderRadius: 2,
                    borderWidth: 0,
                    padding: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                }}>
                    <Button
                        raised={true}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: cBlueMain }}
                        icon={<Icon name='chevron-right' type='feather' color='#ffffff' />}
                        iconRight={true}
                        title={this.props.info.voucherID}
                    />

                    {
                        Object.keys(this.props.info).map(key => {
                            switch (key) {
                                case 'voucherID':
                                    break

                                default:
                                    return <ListItem
                                        key={key}
                                        subtitle={this.props.info[key]}
                                        titleStyle={{ fontWeight: '600' }}
                                        title={TitlesVN[key]}
                                        rightIcon={this._Icon(key, this.props.info[key])}
                                    />
                            }
                        }
                        )
                    }
                </Card>
            </View>
        )
    }
}