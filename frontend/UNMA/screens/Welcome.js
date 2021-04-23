import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  };

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light height={25}>
            {/* Terms of Service */}
            개인정보 처리방침
          </Text>
          <Text></Text>
          <Text
            caption
            gray
            height={20}
            style={{ marginBottom: theme.sizes.base }}
          >
            아래의 개인정보 처리 방침은 "UNMA" {"\n"}개인이 서비스 하는 모든
            제품에 적용 됩니다.
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text gray>1. 개인정보의 처리 목적 {"\n"}</Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              UNMA는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의
              목적 이외의 용도로는 이용하지 않습니다.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              - 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본신 식별 및
              인증, 회원자격 유지 및 관리, 물품이나 서비스 공급에 따른 금액
              결제, 물품 또는 서비스의 공급 및 배송 등
            </Text>

            <Text gray>2. 개인정보의 처리 및 보유 기간 {"\n"}</Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ① UNMA는 정보 주체로 부터 개인정보를 수집할 때 동의 받은 개인정보
              보유 이용기간 또는 법령에 따른 개인정보 보유, 이용기간 내에서
              개인정보를 처리 및 보유 합니다. ② 구체적인 개인정보 보유 기간은
              다음과 같습니다.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              - 고객가입 및 관리 : 서비스 이용 계약 또는 회원가입 해지시 까지
            </Text>

            <Text gray>3. 개인정보의 제3자 제공에 관한 사항 {"\n"}</Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ① UNMA는 정보주체의 동의, 법률의 특별한 규정등 개인정보 보호법 제
              17조 및 18조에 해당하는 경우에만 개인정보를 제 3자에게 제공합니다.
              {"\n"}② UNMA는 다음과 같이 개인정보를 제 3자에게 제공하고
              있습니다.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              - 개인정보를 제공받는 자 : 구글 (Google)
              {"\n"}- 제공받는 자의 개인정보 이용목적 : 다운받은 앱 사용시
              수명주기와 발생 이벤트 등의 분석 및 통계용 (구글 애널리틱스),
              정보주체별 맞춤광고 제공용(구글 애드몹)
              {"\n"}- 제공받는 자의 보유, 이용기간 : 앱 설치시 부터 제품별
              구글이 정한 기간에 따름
              {"\n"}- 제공받는 자의 제품별 개인정보처리방침 : 구글 개인정보
              처리방침에 따름 {"\n"}(https://policies.google.com/privacy?hl=ko)
            </Text>

            <Text gray>4. 개인정보처리 위탁 {"\n"}</Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ① UNMA는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
              처리업무를 위탁하고 있습니다.
              {"\n"}② UNMA는 위탁계약 체결시 개인정보 보호법 제25조에 따라
              위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치,
              재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한
              사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
              처리하는지를 감독하고 있습니다.
              {"\n"}③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
              개인정보 처리방침을 통하여 공개하도록 하겠습니다.
            </Text>

            <Text gray>
              5. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는
              개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다. {"\n"}
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ① 정보주체는 UNMA에 대해 언제든지 다음 각 호의 개인정보 보호 관련
              권리를 행사할 수 있습니다.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              - 개인정보 열람요구
              {"\n"}- 오류 등이 있을 경우 정정 요구
              {"\n"}- 삭제요구
              {"\n"}- 처리정지 요구
            </Text>

            <Text gray>6. 처리하는 개인정보의 항목 작성{"\n"}</Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ▶ UNMA은(는) 다음의 개인정보 항목을 처리하고 있습니다.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ① 필수항목 : 없음
              {"\n"}② 선택항목 : 없음
            </Text>

            <Text gray>7. 개인정보의 파기{"\n"}</Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              UNMA는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이
              해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과
              같습니다.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ① 파기절차
              {"\n"}이용자가 입력한 정보는 목적 달성 후 별도의 DB에
              옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라
              일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진
              개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지
              않습니다.
              {"\n"}
              {"\n"}② 파기기한
              {"\n"}이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는
              보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성,
              해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을
              때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일
              이내에 그 개인정보를 파기합니다.
            </Text>

            <Text gray>
              8. 개인정보 자동 수집 장치의 설치 • 운영 및 거부에 관한 사항{"\n"}
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ① UNMA는 정보주체의 이용정보를 저장하고 수시로 불러오는 '쿠키'를
              사용하지 않습니다. 정보 주체가 제3자인 구글에게 제공하는 정보는
              UNMA와 상관없이 정보 주체 기기상의 구글 설정에 따릅니다.
            </Text>

            <Text gray>9. 개인정보 보호책임자 작성{"\n"}</Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ① UNMA는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ▶ 개인정보 보호책임자
              {"\n"} 업체 : UNMA
              {"\n"} 이메일 : unma@gmail.com
            </Text>

            <Text gray>10. 개인정보 처리방침 변경{"\n"}</Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              ①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
              변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일
              전부터 공지사항을 통하여 고지할 것입니다.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              color="rgba(255,204,051,0.90)"
              onPress={() => this.setState({ showTerms: false })}
            >
              <Text center white>
                동의합니다
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="stretch"
            style={{
              width: width / 6,
              height: height / 12,
              // width: width / 1,
              // height: height / 2,
              overflow: "visible",
            }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: this.scrollX } },
          },
        ])}
      />
    );
  }

  renderSteps() {
    const { illustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h2 center bold>
            <Text h1 dark>
              {" "}
              언마
            </Text>
            에 오신걸 환영합니다
            {"\n"}
          </Text>
          {/* <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            언마를 경험하세요{'\n'}
          </Text> */}
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button
            onPress={() => navigation.navigate("Login")}
            color="rgba(255,204,051,0.90)"
          >
            <Text center semibold white>
              입장
            </Text>
          </Button>

          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>
              이용 약관
            </Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/unma_1.png") },
    { id: 2, source: require("../assets/images/unma_2.png") },
    { id: 3, source: require("../assets/images/unma_3.png") },
    { id: 4, source: require("../assets/images/unma_4.png") },
  ],
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
