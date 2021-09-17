import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { createRequire } from "module";

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostCard extends Component {
    constructor() {
        super();
        this.state = {
            fontsLoaded: false
        }
    }

    async loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({
            fontsLoaded: true
        })
    }

    componentDidMount() {
        this.loadFontsAsync()
    }

    render() {
        if (!this.state.fontsLoaded) {
            return (<AppLoading />)
        } else {
            return (
                <TouchableOpacity style={styles.container} onPress={()=>this.props.navigation.navigate("PostScreen",{post:this.props.post})}>
                    <View style={styles.postContainer}>
                        <Image
                            source={require("../assets/post.jpeg")}
                            style={styles.postImage}>
                        </Image>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.postAuthorText}>
                            {this.props.post.author}
                        </Text>
                        <Text style={styles.captionText}>
                            {this.props.post.caption}
                        </Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                            <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                            <Text style={styles.likeText}>12k</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    postContainer: {
        margin: RFValue(13),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    postImage: {
        resizeMode: "contain",
        width: "95%",
        alignSelf: "center",
        height: RFValue(250),
        margin:10,
        borderRadius:RFValue(20)
    },
    titleContainer: {
        paddingLeft: RFValue(20),
        justifyContent: "center"
    },
    postTitleText: {
        fontSize: RFValue(25),
        fontFamily: "Bubblegum-Sans",
        color: "white"
    },
    postAuthorText: {
        fontSize: RFValue(18),
        fontFamily: "Bubblegum-Sans",
        color: "white"
    },
    captionText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    }
});