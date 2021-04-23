import React, { Component } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    View,
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export default class Login extends Component {
    state = {
        username: null,
        password: null,
        errors: [],
        loading: false,
    };

    handleLogin() {
        const { navigation } = this.props;
        const { username, password } = this.state;
        const errors = [];

        Keyboard.dismiss();
        this.setState({ loading: true });

        if (!username) {
            errors.push("username");
        }

        if (password) {
            const num = password.search(/[0-9]/g);
            const eng = password.search(/[a-z]/gi);
            const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
            if (password.length < 8 || password.length > 20) {
                errors.push("password");
            } else if (password.search(/\s/) != -1) {
                errors.push("password");
            } else if (
                (num < 0 && eng < 0) ||
                (eng < 0 && spe < 0) ||
                (spe < 0 && num < 0)
            ) {
                errors.push("password");
            } else {
                console.log("비번통과");
            }
            this.setState({ loading: false });
        }

        if (!errors.length) {
            const loginInfo = {
                username: username,
                password: password,
            };
            AsyncStorage.setItem("username", username);
            axios
                .post("http://j4c105.p.ssafy.io:8000/token/", loginInfo)
                .then((res) => {
                    // console.log(res.data.access, '엑세스')
                    const access_token = res.data.access;
                    AsyncStorage.setItem("access_token", access_token);
                    navigation.navigate("Golden");
                })
                .catch((err) => {
                    console.error(err);
                    this.setState({ loading: false });
                    Alert.alert(
                        "틀렸습니다!",
                        "아이디 또는 비밀번호를 확인해주세요!",
                        {
                            text: "다시시도",
                        },
                        { cancelable: false }
                    )
                });
        }
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

        return (
            <KeyboardAvoidingView
                style={styles.login}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>
                        부모님 입장
          </Text>
                    <Block middle>
                        <Input
                            label="아이디"
                            error={hasErrors("username")}
                            style={[styles.input, hasErrors("username")]}
                            defaultValue={this.state.username}
                            onChangeText={(text) => this.setState({ username: text })}
                        />
                        <Input
                            secure
                            label="비밀번호"
                            error={hasErrors("password")}
                            style={[styles.input, hasErrors("password")]}
                            defaultValue={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        {/* <Block> */}
                        <Button
                            onPress={() => this.handleLogin()}
                            color="rgba(255,204,051,0.90)"
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text bold white center>
                                    입장
                                </Text>
                            )}
                        </Button>
                        <Button
                            shadow
                            onPress={() => navigation.navigate("SignUp")}
                            color="rgba(255,204,051,0.20)"
                        >
                            <Text center semibold>
                                등록
              </Text>
                        </Button>
                        {/* <Button shadow onPress={() => navigation.navigate("Main")}>
              <Text center semibold>
                개발
              </Text>
            </Button> */}
                        {/* <Button onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                비밀번호 찾기
              </Text>
            </Button> */}
                        {/* </Block> */}
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
    },
});
