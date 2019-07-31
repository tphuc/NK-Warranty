import React, { Component } from 'react';

import { View, Text, Animated } from 'react-native';
import CloseBtn from '../assets/closeButton';
import propTypes from 'prop-types';
import Anime from 'animejs';
import { cRedMain, cWhiteMain } from '../assets/colors'


// import console = require('console');


class Index extends Component {

    static propTypes = {
        show: propTypes.bool,
        onPressClose: propTypes.func
    }

    static defaultProps = {
        show: false,
        onPressClose: null
    }

    state = {
        show: false,
        _width: new Animated.Value(0)
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        return { show: nextProps.show }

    }


    componentDidUpdate(props) {
        if (this.state.show) {
            Animated.timing(
                this.state._width,
                {
                    toValue: 250,
                    duration: 500
                }
            ).start()
        }
        else {
            Animated.timing(
                this.state._width,
                {
                    toValue: 0,
                    duration: 500
                }
            ).start()
        }

    }







    render() {
        return <Animated.View ref={ref => this._view = ref} style={{
            position: 'absolute',
            width: this.state._width ,
            height: '100%',
            backgroundColor: cRedMain,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            border:0
        }}>
            <View style={{ position: "absolute", top: 50, right: 5 }}>
                <CloseBtn onPress={this.props.onPressClose} />
            </View>
        </Animated.View>
    }
}

export default Index;
