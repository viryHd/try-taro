import Taro, { Component } from "@tarojs/taro";
import { View, Button,Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtGrid } from "taro-ui";
import "./index.scss";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "主页"
  };
  state = {
    isHidden: false,
    cameraBtn: require("../../assets/camera.png"),
    albumBtn: require("../../assets/album.png"),
    banner: [{ url: "", image: "" }],
    message: [{url: "", title: ""}]
  };
  takePhoto = () => {
    Taro.navigateTo({
      url: "../takePhoto/index"
    });
  };
  clipPhoto = () => {
    wx.chooseImage({
      count: 1,
      sizeType: ["original"],
      sourceType: ["album"],
      success: res => {
        wx.setStorageSync("tempPath", res.tempFilePaths[0]);
        Taro.navigateTo({
          url: "../clipPhoto/index"
        });
      }
    });
  };
  cridHandler = (item, index) => {
    switch (index) {
      case 0:
        this.takePhoto();
        break;
      case 1:
        this.clipPhoto();
        break;
      default:
        Taro.showToast({
          title: "敬请期待！",
          icon: "none",
          duration: 1500
        });
        break;
    }
  };
  init = () => {
    Taro.request({
      url: "https://easy-mock.com/mock/5ccf95e95f39f71a53b2c705/example/banner",
      method: "GET"
    }).then(res => {
      this.setState({ banner: res.data.data });
    });
    Taro.request({
      url: "https://easy-mock.com/mock/5ccf95e95f39f71a53b2c705/example/message",
      method: "GET"
    }).then(res => {
      this.setState({ message: res.data.data });
    });
  };
  goPage = url => {
    Taro.navigateTo({ url: `../outPage/index?url=${url}` });
  };
  componentDidMount() {
    this.init();
  }
  render() {
    const { cameraBtn, albumBtn, banner, message } = this.state;
    return (
      <View style="height: 500px;">
        <View className="swiperBanner" style="width:100%; height: 200px;">
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
                <View onClick={() => this.goPage(item.url)}>
                  <Image src={item.image} />
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className="swiperMessage" style="width:100%; height: 50px;">
          <Swiper
            style="width:100%; height: 100%;"
            className="test-h"
            vertical
            circular
            autoplay
            interval={3000}
            duration={300}
          >
            {message.map(item => (
              <SwiperItem key={item.id} style="display: flex; flex-direction: column; justify-content: center;">
                <View onClick={() => this.goPage(item.url)}>
                  <Text>{item.title}</Text>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className="serviceList">
          <AtGrid
            onClick={this.cridHandler}
            data={[
              {
                image: cameraBtn,
                value: "vin码查询"
              },
              {
                image: albumBtn,
                value: "vin码查询"
              },
              {
                value: "敬请期待"
              }
            ]}
          />
        </View>
      </View>
    );
  }
}
