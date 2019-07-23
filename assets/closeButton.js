import React, {Fragment} from 'react';
import { Icon } from 'react-native-elements';
import {cWhiteMain} from '../assets/colors';


const Index = (props) => (
    <Icon
        name='x'
        type='feather'
        color={cWhiteMain}
        containerStyle={{...props.style}}
        {...props}
    />
)
export default Index;