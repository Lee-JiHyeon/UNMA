import React, { Component } from "react";
import {
    Alert,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import axios from "axios";

export default class SignUp extends Component {
    state = {
        username: null,
        email: null,
        password: null,
        passwordConfirm: null,
        errors: [],
        loading: false,
    };

    handleSignUp() {
        const { navigation } = this.props;
        const { email, username, password, passwordConfirm } = this.state;
        const errors = [];

        Keyboard.dismiss();
        this.setState({ loading: true });

        // 이메일 유효성,공백 확인
        if (email) {
            const regExp = /^([0-9a-zA-Z_\.-]+)@([0-gkg9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            if (!regExp.test(email)) {
                errors.push("email");
            }
        } else {
            errors.push("email");
        }

        // 비밀번호 유효성(영문,숫자,특수문자 중 2가지 이상 혼합 8~20),공백확인
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
        }

        // 아이디 공백확인, 중복은 백에서 확인가능
        if (username) {
            if (username.search(/\s/) != -1) {
                errors.push("username");
            }
        }

        if (password !== passwordConfirm) {
            errors.push("password");
            Alert.alert("비밀번호 불일치", "비밀번호를 확인해보세요");
        }

        this.setState({ errors, loading: false });

        // 에러가 없다면 axios요청 보내기
        if (!errors.length) {
            const userInfo = {
                username: username,
                email: email,
                password: password,
                passwordvalidation: passwordConfirm,
            };
            console.log("요청보내기전");
            axios
                .post("http://j4c105.p.ssafy.io:8000/accounts/signup/", userInfo)
                .then((res) => {
                    console.log(res);
                    if (!res.data.username) {
                        Alert.alert("아이디 중복", "이미 해당 아이디가 존재합니다");
                        this.setState({ loading: false });

                    } else {
                        Alert.alert(
                            "회원가입성공",
                            "UNMA 회원가입을 축하합니다",
                            [
                                {
                                    text: "Continue",
                                    onPress: () => {
                                        navigation.navigate("Login");
                                    },
                                },
                            ],
                            { cancelable: false }
                        );
                        this.setState({ loading: false });

                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

        return (
            <KeyboardAvoidingView
                style={styles.signup}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold marginBottom={300}>
                        부모님 등록
          </Text>
                    {/* <Block> */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Block bottom paddingTop={100}>
                            <Input
                                label="아이디"
                                style={[styles.input, hasErrors("username")]}
                                defaultValue={this.state.username}
                                onChangeText={(text) => this.setState({ username: text })}
                            />
                            <Input
                                email
                                label="이메일"
                                error={hasErrors("email")}
                                style={[styles.input, hasErrors("email")]}
                                defaultValue={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                            <Input
                                secure
                                label="비밀번호"
                                error={hasErrors("password")}
                                style={[styles.input, hasErrors("password")]}
                                defaultValue={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                            <Input
                                secure
                                label="비밀번호확인"
                                error={hasErrors("password")}
                                style={[styles.input, hasErrors("password")]}
                                defaultValue={this.state.passwordConfirm}
                                onChangeText={(text) =>
                                    this.setState({ passwordConfirm: text })
                                }
                            />
                            <Button
                                onPress={() => this.handleSignUp()}
                                color="rgba(255,204,051,0.90)"
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Text white center>
                                        등록
                                    </Text>
                                )}
                            </Button>
                            <Button onPress={() => navigation.navigate("Login")}>
                                <Text
                                    gray
                                    caption
                                    center
                                    style={{ textDecorationLine: "underline" }}
                                >
                                    입장하기
                </Text>
                            </Button>
                        </Block>
                    </ScrollView>
                </Block>
                {/* </Block> */}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    signup: {
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
