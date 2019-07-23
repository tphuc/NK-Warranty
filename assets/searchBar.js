import React from 'react';
import { SearchBar } from 'react-native-elements';
import propTypes from 'prop-types';

export default class App extends React.Component {

    static propTypes = {
        placeholder: propTypes.string,
        value: propTypes.string
    }

    static defaultProps = {
        placeholder: 'tìm kiếm',
        value: ''
    }

    state = {
        value: this.props.value,
    };

    updateSearch = value => {
        this.setState({ value });
    };

    render() {
        const { search } = this.state;

        return (
            <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={this.state.value}
                lightTheme={true}
            />
        );
    }
}