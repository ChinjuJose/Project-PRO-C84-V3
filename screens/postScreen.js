import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import * as Speech from 'expo-speech'


let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostScreen extends Component {
    constructor() {
        super();
        this.state = {
            fontsLoaded: false,
            speakerColor: "gray",
            speakerIcon: "volume-high-outline"
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

    async initiateTTS(author, caption) {
        const currentColor = this.state.speakerColor;
        this.setState({
            speakerColor: currentColor === "gray" ? "#ee8249" : "gray"
        });
        if (currentColor === "gray") {
            Speech.speak(`Post created by ${author}`);
            Speech.speak(caption);
        } else {
            Speech.stop();
        }
    }

    render() {
        if (!this.state.fontsLoaded) {
            return (<AppLoading />)
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                                source={require("../assets/logo.png")}
                                style={styles.iconImage}
                            ></Image>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}>Spectagram</Text>
                        </View>
                    </View>

                    <View style={styles.postContainer}>
                        <ScrollView style={styles.postCard}>
                            <Image
                                source={require("../assets/image_1.jpg")}
                                style={styles.postImage}
                            ></Image>
                            <View style={styles.dataContainer}>
                                <View style={styles.titleTextContainer}>
                                    <Text style={styles.postAuthorText}>
                                        {this.props.route.params.post.author}
                                    </Text>
                                </View>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.initiateTTS(
                                                this.props.route.params.post.author,
                                                this.props.route.params.post.caption
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name={this.state.speakerIcon}
                                            size={RFValue(30)}
                                            color={this.state.speakerColor}
                                            style={{ margin: RFValue(15) }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.postTextContainer}>
                                <Text style={styles.postText}>
                                    {this.props.route.params.post.caption}
                                </Text>
                            </View>
                            <View style={styles.actionContainer}>
                                <View style={styles.likeButton}>
                                    <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                                    <Text style={styles.likeText}>12k</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>

            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
    },
    postContainer: {
        flex: 1
    },
    postCard: {
        margin: RFValue(20),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    postImage: {
        width: "100%",
        alignSelf: "center",
        height: RFValue(200),
        borderTopLeftRadius: RFValue(20),
        borderTopRightRadius: RFValue(20),
        resizeMode: "contain"
    },
    dataContainer: {
        flexDirection: "row",
        padding: RFValue(20)
    },
    titleTextContainer: {
        flex: 0.8
    },
    postTitleText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        color: "white"
    },
    postAuthorText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(18),
        color: "white"
    },
    iconContainer: {
        flex: 0.2
    },
    postTextContainer: {
        padding: RFValue(20)
    },
    postText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(15),
        color: "white"
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        flexDirection: "row",
        backgroundColor: "#eb3948",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    }
});


