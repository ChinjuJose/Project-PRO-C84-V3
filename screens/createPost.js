import React, { Component } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, Dimensions } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from "react-native-gesture-handler";

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            previewImage: "image1",
            dropdownHeight: 40
        };
    }

    async loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this.loadFontsAsync();
    }

    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />
        } else {
            let previewImages = {
                image1: require("../assets/image_1.jpg"),
                image2: require("../assets/image_2.jpg"),
                image3: require("../assets/image_3.jpg"),
                image4: require("../assets/image_4.jpg"),
                image5: require("../assets/image_5.jpg"),
                image6: require("../assets/image_6.jpg"),
                image7: require("../assets/image_7.jpg"),
            };
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
                            <Text style={styles.appTitleText}>New Post</Text>
                        </View>
                    </View>
                    <View style={styles.fieldsContainer}>
                        <ScrollView>
                            <Image source={previewImages[this.state.previewImage]} style={styles.previewImage}>
                            </Image>
                            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                                <DropDownPicker
                                    items={[
                                        { label: "Image 1", value: "image1" },
                                        { label: "Image 2", value: "image2" },
                                        { label: "Image 3", value: "image3" },
                                        { label: "Image 4", value: "image4" },
                                        { label: "Image 5", value: "image5" },
                                        { label: "Image 6", value: "image6" },
                                        { label: "Image 7", value: "image7" }
                                    ]}
                                    defaultValue={this.state.previewImage}
                                    containerStyle={{
                                        height: 40,
                                        borderRadius: 20,
                                        marginBottom: 10
                                    }}
                                    onOpen={() => {
                                        this.setState({ dropdownHeight: 170 });
                                    }}
                                    onClose={() => {
                                        this.setState({ dropdownHeight: 40 });
                                    }}
                                    style={{ 
                                        backgroundColor: "transparent" 
                                    }}
                                    itemStyle={{
                                        justifyContent: "flex-start"
                                    }}
                                    dropDownStyle={{ 
                                        backgroundColor: "#2f345d" 
                                    }}
                                    labelStyle={{
                                        color: "white",
                                        fontFamily: "Bubblegum-Sans"
                                    }}
                                    arrowStyle={{
                                        color: "white",
                                        fontFamily: "Bubblegum-Sans"
                                    }}
                                    onChangeItem={item =>
                                        this.setState({
                                            previewImage: item.value
                                        })
                                    }
                                />
                            </View>
                            <TextInput
                                style={styles.inputFont}
                                onChangeText={caption => this.setState({ caption })}
                                placeholder={"Caption"}
                                placeholderTextColor="white"
                            />
                        </ScrollView>
                    </View>
                    <View style={{ flex: 0.08 }} />
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
    fieldsContainer: {
        flex: 0.85
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
    },
    inputFont: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white",
        fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
        marginTop: RFValue(15)
    },
    inputTextBig: {
        textAlignVertical: "top",
        padding: RFValue(5)
    }
});
