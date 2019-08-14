import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Image, Modal, Picker, ActivityIndicator } from 'react-native'
import { Header, Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { Row, Col, Grid } from 'react-native-easy-grid'
import { cWhiteMain, cRedMain, cBlueMain, cRedSecondary } from '../assets/colors';
import { Link } from 'react-router-native';
import propTypes from 'prop-types';

import ImagePicker from 'react-native-image-picker';
import VoucherConfirmModal from './VoucherConfirmModal';
import {GetListWarrantyReturnByUser} from '../config/api'


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

const dropdownOption = [
    {
        value: 'Không liên lạc được khách',
    }, 
    {
        value: 'Lý do khác',
    }, 
    {
        value: 'Không đủ tiền',
    }
]

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

    static propTypes = {
        info: propTypes.shape({
            voucherInfo: propTypes.shape({
                voucherID: propTypes.string,
                buyDate: propTypes.string,
            }),
            productInfo: propTypes.shape({
                product: propTypes.string,
                seriNumber: propTypes.string,
                modelNumber: propTypes.string,
            }),
            warrantyInfo: propTypes.shape({
                testInfo: propTypes.string,
                warrantyType: propTypes.string,
                handling: propTypes.string,
            })
        })
    }


    static defaultProps = {
        info : {
            voucherInfo: {
                voucherID: '',
                buyDate: '11/9/2000',
            },
            productInfo: {
                name: 'Máy lạnh ABCD EXYZ Lorem ispumdolorsitamet',
                seriNumber: '23124214124122',
                modelNumber: 'THM21323A',
            },
            warrantyInfo: {
                testInfo: 'Máy không hoạt động',
                warrantyType: 'Bảo hành',
                handling: 'Sửa chửa có VT-LK'
            }
        }
    }


    state = {
        info: {},
        images: [],
        isModalVisible: false,
        imageLoading: false
    }

    componentDidMount(){
        console.log(this.props.match.params.voucherID)
        GetListWarrantyReturnByUser({
            voucherInfo: {
                voucherID: `mainCode`,
                buyDate: 'mainDate',
            },
            productInfo: {
                name: 'art_Name',
                seriNumber: 'art_Code',
                modelNumber: 'artModel',
            },
            warrantyInfo: {
                testInfo: 'caseExln',
                warrantyType: 'rsltType',
                handling: 'rsltName'
            }
        })
        .then(data => {console.log(data); this.setState({info: data})})
    }
    
    openPhotos = () => {

        // maximum upload 3 picture
        if (this.state.images.length === 3)
            return

        const options = {
            title: 'Select your picture',
        };

        this.setState({ imageLoading: true })
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
                this.setState({ imageLoading: false })
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                const base64Prefix = 'data:image/jpeg;base64,'

                this.setState({
                    images: [
                        ...this.state.images,
                        base64Prefix + response.data
                    ]
                });
            }
        });
    }

    render(props) {
        var { info } = this.props;
        var { imageLoading, images } = this.state


        // info.voucherInfo.voucherID = this.props.match.params.voucherID
        return (
            <Fragment>

                <Header
                    leftComponent={
                        <Link exact to='/pending'>
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

                    <ListItem
                        leftElement={`HÌNH ẢNH SP (${this.state.images.length}/3)`}
                        leftCol={5} rightCol={5}
                        style={{ backgroundColor: '#eeeeee' }}
                        leftElementStyle={{ fontWeight: '700' }}
                        rightIcon='camera'
                        rightIconOnPress={this.openPhotos} />

                    <Grid>
                        <Row>
                            {
                                [0, 1, 2].map(id =>
                                    <Col style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                                        <Image
                                            onLoadEnd={() => this.setState({ imageLoading: false })}
                                            source={{ uri: images[id] }}
                                            style={{ width: 120, height: 110 }} />
                                    </Col>
                                )
                            }
                        </Row>
                        <Row style={{ justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={cRedSecondary} animating={this.state.imageLoading} />
                        </Row>
                    </Grid>
                    <Grid>
                        <Row>
                            <Col style={{ padding: 5, height: 100 }}>
                                <Button
                                    title="Đã giao xong"
                                    buttonStyle={{ backgroundColor: cRedMain, height: 50 }}
                                    titleStyle={{ fontSize: 15 }}
                                />
                            </Col>
                            <Col style={{ padding: 5, height: 100 }}>
                                <Button
                                    title="Chuyển về chờ giao"
                                    buttonStyle={{ height: 50 }}
                                    titleStyle={{ fontSize: 15 }}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>

                <VoucherConfirmModal
                    visible={this.state.isModalVisible}
                    onClose={() => this.setState({isModalVisible: false})}
                    voucherID={this.props.match.params.voucherID}
                    optionDropdownData={dropdownOption}
                ></VoucherConfirmModal>

            </Fragment>
        )
    }
}


