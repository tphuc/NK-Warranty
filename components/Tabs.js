import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements';
import { cRedSecondary, cGreyMain, cBlueMain, cWhiteMain, cGreySecondary, cWhiteSecondary, cRedMain } from '../assets/colors';
import { Actions } from 'react-native-router-flux'
import { Col, Row } from "react-native-easy-grid";
import propTypes from 'prop-types';
import { Link } from "react-router-native";








export default class Index extends Component {

    constructor(props) {
        super(props)
        this.selectedItem = props.selectedItem ? props.selectedItem : (props.items.length ? props.items[0] : {})
    }
    static propTypes = {
        items: propTypes.arrayOf(propTypes.shape({
            tabName: propTypes.string,
            route: propTypes.string,
            component: propTypes.node
        })),
        selectedItem: propTypes.string,
        onChange: propTypes.func,
        badge: propTypes.bool

    }


    static defaultProps = {
        items: [
            {
                tabName: 'Chờ xử lí',
                route: '/pending'
            }
            ,
            {
                tabName: 'Đã xử lí',
                route: '/history'

            }
        ],
        selectedItemStyle: {
            borderBottomColor: cWhiteSecondary
        },
        unselectedItemStyle: {
            borderBottomColor: cRedSecondary
        },
    }

    getSelectedItem = () => {
        return this.selectedItem
    }

    render() {
        return (
            <View style={{ height: 50, width: '100%', }}>
                <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }} >
                    {
                        this.props.items.map(item =>
                            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', backgroundColor: cRedSecondary }} key={item.tabName}>
                                <Link
                                    to={item.route}
                                    underlayColor={cRedMain}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
                                        borderRadius: 0,
                                        height: '105%',
                                        backgroundColor: cRedSecondary,
                                        borderColor: cRedSecondary,
                                    }}
                                    onPress={(e) => { this.selectedItem = item; if (this.props.onChange) this.props.onChange(item) }}
                                >
                                    <View
                                        style={{
                                            width: '95%',
                                            height: '80%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            borderBottomColor: cRedSecondary,
                                            borderBottomWidth: 4,
                                            ...(item.tabName === this.selectedItem.tabName) ? this.props.selectedItemStyle : this.props.unselectedItemStyle,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: '700',
                                                fontSize: 17,
                                                textAlign: 'center',
                                                borderRadius: 0,
                                                color: cWhiteMain,
                                            }}
                                        >
                                            {item.tabName}
                                        </Text>
                                    </View>
                                </Link>
                            </Col>)
                    }
                </Row>
            </View>
        )
    }
}