import React, { Component } from 'react';
import { Header, Icon, Input } from 'react-native-elements';
import { View, Text, Modal } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { cRedMain, cBlueMain, cWhiteMain } from '../assets/colors';


export default class Index extends Component {

    onSubmit = (e) => {
        if (this.props.onSuccess) this.props.onSuccess();
        if (!e.defaultPrevented) {
            console.log(this.dropdown.value())
        }
    }

    state = {
        selectOption: '',
        otherReason: ''
    }

    render() {
        const {
            visible,
            onClose,
            optionDropdownData,
            voucherID,
        } = this.props

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
            >
                <Header
                    leftComponent={<Icon name='chevron-left' type='feather' color={cWhiteMain} onPress={() => { this.setState({ selectOption: '' }); onClose() }} />}
                    centerComponent={{ text: "CHUYỂN VỀ CHỜ GIAO", style: { color: cWhiteMain, fontWeight: "900", fontSize: 16, } }}
                    containerStyle={{ backgroundColor: cRedMain, paddingBottom: 10, margin: 0 }}
                />

                <Grid>
                    <Row style={{ maxHeight: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{}}>
                            <Text style={{ textAlign: 'center', padding: 10, fontSize: 17 }}>Bạn có chắc muốn chuyển về chờ giao?</Text>
                            <Text style={{ textAlign: 'center', fontWeight: '800', fontSize: 17 }}>{voucherID}</Text>
                        </View>
                    </Row>
                    <Row style={{ maxHeight: 50, display: 'flex', alignItems: 'center', }}>
                        <Col style={{ width: '35%' }}>
                            <View>
                                <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '800' }}>Lý do chuyển: </Text>
                            </View>
                        </Col>
                        <Col>
                            <Dropdown
                                style={{ fontSize: 17 }}
                                ref={ref => this.dropdown = ref}
                                dropdownOffset={{ top: 0 }}
                                data={optionDropdownData}
                                onChangeText={(val) => this.setState({ selectOption: val })}
                            />
                        </Col>
                    </Row>
                    {
                        this.state.selectOption === 'Lý do khác' &&
                        <Row style={{ maxHeight: 100 }}>
                            <Input
                                label="Nhập lí do chuyển"
                                placeholder='Lí do chuyển khác'
                                labelStyle={{ color: 'black' }}
                                onChangeText={(val) => this.setState({ otherReason: val })}
                            />
                        </Row>

                    }
                    <Row >
                        <Col>
                        </Col>
                        <Col style={{ maxHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Col>
                                <Icon name='check-circle' type='feather' size={50} color={cBlueMain} onPress={(e) => this.onSubmit(e)} />
                            </Col>
                            <Col>
                                <Icon name='x' type='feather' size={60} color={cRedMain} onPress={() => { this.setState({ selectOption: '' }); onClose() }} />
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </Modal>
        )
    }

}