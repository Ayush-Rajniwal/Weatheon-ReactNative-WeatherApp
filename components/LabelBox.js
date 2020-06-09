import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons, Fontisto, Entypo, Feather } from '@expo/vector-icons';
class LabelBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const Item = (props) => {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
                    {props.title === "Humidity" ? <Entypo name="drop" size={20} color="#fff" /> : <Fontisto name="wind" size={20} color="#fff" />}
                    <Text style={{ color: "white", fontSize: 10, }}>{props.title}</Text>
                </View>

            )
        }
        return (

            <View style={styles.blurBox}>
                <Item title="Humidity" />
                <Text style={{ color: "white", alignSelf: "center" }}>{this.props.humidity}%</Text>
                <Item title="Wind" />
                <Text style={{ color: "white", alignSelf: "center" }}>{this.props.windSpeed}Km/h</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    blurBoxText: {
        fontSize: 20,
        color: "white"
    },
    blurBox: {

        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 20,
        // backgroundColor: "rgba(0,0,0,0.2)"
    },
})

export default LabelBox;