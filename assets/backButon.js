
import React from 'react';
import { Icon } from 'react-native-elements';
import {cWhiteMain} from '../assets/colors';


const Index = (props) => (
    <Icon
        name='chevron-left'
        type='feather'
        color={cWhiteMain}
        containerStyle={{...props.style}}
        {...props}
    />
)
export default Index;