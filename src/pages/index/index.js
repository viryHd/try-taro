import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";
import "../../assets/iconfont/iconfont.css";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "主页"
  };
  state = {
    banner: [{ url: "", image: "" }],
    message: [{ url: "", title: "" }],
    serviceList: [
      {
        image: require("../../assets/camera.png"),
        value: "vin码查询",
        appId: "wx5ecceea420cf2edd"
      },
      {
        image: require("../../assets/album.png"),
        value: "vin码查询",
        appId: "wx1c6850423c0ff174"
      },
      {
        image: require("../../assets/album.png"),
        value: "vin码查询",
        appId: "wx4099604b04bf38d1"
      }
    ]
  };
  gridHandler = e => {
    const appId = e.currentTarget.dataset.appid;
    wx.navigateToMiniProgram({
      appId,
      path: "pages/index/index?id=123",
      envVersion: "develop",
      extraData: {
        foo: "bar"
      },
      success(res) {
        // 打开成功
      }
    });
  };
  init = () => {
    // 1.广告图
    Taro.request({
      url: "https://easy-mock.com/mock/5ccf95e95f39f71a53b2c705/example/banner",
      method: "GET"
    }).then(res => {
      this.setState({ banner: res.data.data });
    });
    // 2.资讯
    Taro.request({
      url:
        "https://easy-mock.com/mock/5ccf95e95f39f71a53b2c705/example/message",
      method: "GET"
    }).then(res => {
      this.setState({ message: res.data.data });
    });
    // 3.服务列表
  };
  goPage = e => {
    const url = e.currentTarget.dataset.url;
    Taro.navigateTo({ url: `../outPage/index?url=${url}` });
  };
  componentDidMount() {
    this.init();
  }
  render() {
    const { banner, message, serviceList } = this.state;
    return (
      <View style="height: 500px;">
        <View className="swiper_banner" style="width:100%; height: 200px;">
          <Swiper
            style="width:100%; height: 100%;"
            className="test-h"
            indicatorColor="#999"
            indicatorActiveColor="#333"
            circular
            indicatorDots
            autoplay
            interval={4000}
            duration={400}
          >
            {banner.map(item => (
              <SwiperItem key={item.id}>
                <View onClick={this.goPage} data-url={item.url}>
                  <Image src={item.image} style="width:100%;" />
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View
          className="swiper_message"
          style="width:100%; height: 50px;display: flex; justify-content: center;align-items:center;"
        >
          <View
            className="iconfont icon-laba"
            style="font-size:25px; color:yellowgreen;"
          />
          <Swiper
            style="width:100%; height: 100%; padding-left:15px;"
            className="test-h"
            vertical
            circular
            autoplay
            interval={3000}
            duration={300}
          >
            {message.map(item => (
              <SwiperItem
                key={item.id}
                style="display: flex; flex-direction: column; justify-content: center;"
              >
                <View onClick={this.goPage} data-url={item.url}>
                  <Text>{item.title}</Text>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className="service_list">
          {serviceList.map(item => (
            <View
              className="service_item"
              key={item.appId}
              data-appid={item.appId}
              onClick={this.gridHandler}
            >
              <View className="item_img_box">
                <Image className="item_img" src={item.image} />
              </View>
              <View className="text">{item.value}</View>
            </View>
          ))}
          <View className="service_item">
          <View className="item_last">
              <View
                className="iconfont icon-jingqingqidai"
              />
              </View>
              <View className="text" />
          </View>
        </View>
      </View>
    );
  }
}
