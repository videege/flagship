import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}> flagship</Text>
                </View>
                <View style={styles.container}>
                    <Text>an Armada fleet builder</Text>
                    <Text>by Joshua Barron</Text>
                    <TextInput
                        style={{ height: 40 }}
                        placeholder="Type here to translate!"
                        onChangeText={(text) => this.setState({ text })}
                    />
                </View >
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    title: {
        color: 'red',
        fontSize: 30
    }
});
