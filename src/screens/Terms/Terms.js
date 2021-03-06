import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { terms } from './Data';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';

const Terms = (props) => {

    const [visible, setVisible] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setVisible(false);
        }, [])
    )

    return (<View style={styles.body}>

        <View style={styles.container}>
            <Spinner visible={visible} />
            <Text style={styles.header}>Terms & Conditions</Text>
            <Text style={styles.text}>{terms}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    body: { backgroundColor: "#fff", flex: 1 },
    header: {
        fontFamily: 'Adam-Bold',
        fontSize: 24,
        marginVertical: 20
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
        marginHorizontal: 20,
    },
    text: {
        fontFamily: 'Inter-Black-Light',
        fontSize: 14
    }
})

export default Terms