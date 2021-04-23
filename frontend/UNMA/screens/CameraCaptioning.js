import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    View,
    ActivityIndicator,
} from "react-native";

import { Badge, Button, Block, Text, Card } from "../components";
import { theme } from "../constants";

import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
// import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

class CameraCaptioning extends React.Component {
    state = {
        Picture: [],
        result: [],
        setImage: [],
        textData: [],
        templist: [],
        language: "",
        selectedPic: "",
        loading: false
        // setClasslist: [],
    };
    // const [result, setImage] = useState(null);

    componentDidMount() {
        // const [image, setImage] = useState(null);
        // const [result, setResult] = useState(null);
        // const [classlist, setClasslist] = useState(null);


        const { navigation } = this.props;
        // const [setImage] = useState(null);
        const givenPic = navigation.getParam("uri");
        // console.log("이게 떠야해" + uri.uri);
        this.setState({ Picture: givenPic.uri });
        console.log(givenPic.uri)
        this.setState({ selectedPic: givenPic.uri })
    }
    sendImage() {
        this.setState({ loading: true });
        const { textData, templist } = this.state;
        const { navigation } = this.props;
        const Picture = navigation.getParam("uri");
        AsyncStorage.getItem("language", (err, res) => {
            this.setState({ language: res });
        });

        AsyncStorage.getItem("childPk", (err, res) => {
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            };
            console.log(res);
            const img = {
                kid: res,
                photo: Picture.base64,
            };
            console.log("베이스값 : " + img.photo);
            axios
                .post("http://j4c105.p.ssafy.io:8000/images/yolo/", img, headers)
                .then((res) => {
                    // console.log("res.data.class 가 머니" + res.data.classlist);
                    // setImage("data:image/png;base64," + res.data.img);
                    this.setState({ Picture: "data:image/png;base64," + res.data.img });
                    // this.setState({ textData: res.data.classlist });
                    // console.log(res.data.templist, "asdf");
                    this.setState({ templist: res.data.templist });
                    this.setState({ loading: false });
                    // console.log(templist);
                })
                .catch((error) => {
                    console.log("ERROR : " + error);
                    this.setState({ loading: false });
                });
        });
        // const selected = result.uri;
        // const captioned = null;
    }
    render() {
        const { navigation } = this.props;
        const { Picture, textData, templist, language, selectedPic, loading } = this.state;

        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Block>
                    <View style={styles.rowbuttons} marginBottom={20}>
                        <Button
                            onPress={() => navigation.navigate("CameraPage")}
                            color="rgba(255,204,051,0.90)"
                            style={styles.header}
                        >
                            <Text dark center h4>
                                사진 촬영
              </Text>
                        </Button>
                        <Button
                            onPress={() => this.sendImage()}
                            color="rgba(255,204,051,0.90)"
                            style={styles.header}
                        >
                            (loading ? (<ActivityIndicator size="small" color="dark" />
                            ):
                            (
                                <Text dark center h4>
                                사진 분석
                                </Text>)
                            )
                        </Button>
                    </View>
                </Block>
                <Block style={{ flex: 1, alignItems: "center" }}>
                    <Card center middle shadow>
                        <Image
                            source={{ uri: selectedPic }}
                            // style={{ width: 420, height: 830, marginTop: 45 }}
                            style={{ width: 420, height: 400, marginBottom: 160 }}

                        />
                    </Card>
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ width: 400 }}>
                        <Block flex={false} row space="between" style={styles.textDatas}>
                            {templist
                                ? templist.map((object, i) => (
                                    <TouchableOpacity key={i}>
                                        <Card center middle shadow style={styles.objects}>
                                            <Badge
                                                margin={[0, 0, 15]}
                                                size={60}
                                                color="rgba(255,204,051,0.20)"
                                            >
                                                <Image
                                                    source={{ uri: object[0].open_pic_dir }}
                                                    style={styles.icons}
                                                />
                                            </Badge>

                                            <Text medium height={20}>
                                                {object[0][language]}
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                ))
                                : null}
                        </Block>
                    </ScrollView>
                </Block>
            </View>
        );
    }
}

export default CameraCaptioning;

const styles = StyleSheet.create({
    rowbuttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    albumImg: {
        // width: 415,
        // maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 0.82,
        // resizeMod: "stretch"
    },
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: 55,
        marginLeft: 15,
    },
    textDatas: {
        alignItems: "center",
        flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base * 2,
        marginTop: theme.sizes.base * 3.5,
    },
    objects: {
        // this should be dynamic based on screen width
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.4,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.4,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.4,
        marginRight: theme.sizes.base * 1,
    },
    icons: {
        width: 50,
        height: 50,
        resizeMode: "stretch",
    },
});
