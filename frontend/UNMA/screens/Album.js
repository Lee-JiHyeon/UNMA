import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Image,
    View,
    ScrollView,
    Platform,
    TouchableOpacity,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { Audio } from 'expo-av'
import { Text, Badge, Card, Block, Button, Input } from "../components";

const { width } = Dimensions.get("window");

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [templist, setTemplist] = useState(null);
    const [language, setLanguage] = useState(null);
    const [loading, setLoading] = useState(null);

    // const [open_pic_dir, setOpen_pic_dir] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "접근을 허용해주셔야 합니다."
                    );
                }
            }
        })();
    }, []);
    const pickImage = async () => {
        const r = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        setResult(r);

        if (!r.cancelled) {
            setImage(r.uri);
            setTemplist([]);
        }
    };

    const sendImage = async () => {
        setLoading(true);
        console.log(result.uri);
        AsyncStorage.getItem("language", (err, res) => {
            setLanguage({ language: res });
            console.log("###############################");
            console.log(language);
        });
        AsyncStorage.getItem("childPk", (err, res) => {
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            };
            console.log(res);
            const img = {
                kid: res,
                photo: result.base64,
            };
            console.log("받기전 :" + templist);
            console.log("아이 :" + img.kid);

            axios
                .post("http://j4c105.p.ssafy.io:8000/images/yolo/", img, headers)
                .then((response) => {
                    // console.log("여왔니" + response.data.class);
                    setTemplist(response.data.templist);
                    setImage("data:image/png;base64," + response.data.img);
                    setLoading(false);
                    console.log(response.data.templist);
                    // setLanguage(language);
                    console.log(language);
                    // console.log(language.language);
                    // console.log(templist[0][0]);

                    // console.log("open_pic_dir : " + templist[0][0].open_pic_dir);
                })
                .catch((error) => {
                    console.log("ERROR: " + error);
                });
        });
    };

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            {/* <View style={styles.rowbuttons} marginBottom={20}>
        <Button title="앨범" onPress={pickImage} color="rgba(255,204,051,1)" />
        <Button title="분석" onPress={sendImage} color="rgba(255,204,051,1)" />
      </View> */}
            <Block>
                <View style={styles.rowbuttons} marginBottom={20}>
                    <Button
                        onPress={pickImage}
                        color="rgba(255,204,051,0.90)"
                        style={styles.header}
                    >
                        <Text dark center h4>
                            사진 선택
            </Text>
                    </Button>
                    <Button
                        onPress={sendImage}
                        color="rgba(255,204,051,0.90)"
                        style={styles.header}
                    >(loading ? (<ActivityIndicator size="small" color="dark" />
                    ):
                    (
                        <Text dark center h4>
                            사진 분석
                        </Text>)
                    )
                    </Button>
                </View>
            </Block>
            <Block>
                {image == null ? (
                    <Badge margin={[0, 0, 15]} size={60} color="rgba(255,204,051,0.50)">
                        <Image
                            source={require("../assets/icons/glasses.png")}
                            style={{ width: 55, height: 55 }}
                        />
                    </Badge>
                ) : (
                    <Card center middle shadow>
                        <Image
                            source={{ uri: image }}
                            style={{ width: 420, height: 400, marginBottom: 75 }}
                        />
                    </Card>
                )}

            </Block>
            <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{ width: 400, marginBottom: -140 }}>
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

                                    <Text medium dark height={20}>
                                        {/* {object[0][language]} */}
                                        {object[0][language.language]}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                        ))
                        : null}
                </Block>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    rowbuttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    albumImg: {
        width: 415,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 0.82,
        resizeMode: "stretch",
        position: "absolute"
    },
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: 20,
        marginLeft: 5,
        width: 150
    },
    textDatas: {
        // flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base * 2,
        marginTop: theme.sizes.base * 3.5,
        // position: "absolute",

    },
    objects: {
        // this should be dynamic based on screen width
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.4,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.4,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2.4,
        marginRight: theme.sizes.base * 1,
        // position: "absolute",
    },
    icons: {
        width: 50,
        height: 50,
        resizeMode: "stretch",
    },
});
