import React from 'react';
import {Text, View} from 'react-native';

export default ListItem = (props) => {
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