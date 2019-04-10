import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Button,
  Camera,
  Image,
  CoverView,
  CoverImage
} from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };
  constructor(props) {
    super(props);
    this.state = { src: "", btnSrc: require("../../assets/icon.jpg") };
  }

  takePhoto = () => {
    this.ctx.takePhoto({
      quality: "high",
      success: res => {
        this.setState({
          src: res.tempImagePath
        });
      }
    });
  }
  error = (e) => {
    console.log(e.detail);
  }
  componentWillMount() {}

  componentDidMount() {
    this.ctx = wx.createCameraContext();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index at-row at-row__direction--column">
        <View className="camera-wrapp">
          <Camera
            device-position="back"
            flash="off"
            onError={this.error}
            style="width: 100%; height: 100%;"
          >
            <CoverView className="camera-mask at-row">
              <CoverView className="camera-mask-lr at-col-5" />
              <CoverView className="camera-mask-m at-col-2 at-row at-row__direction--column">
                <CoverView className="camera-mask-tb" />
                <CoverView className="camera-view-box">
                  <CoverView className="camera-btn">
                    <CoverImage
                      className="camera-btn-img"
                      src={btnSrc}
                      onClick={this.takePhoto}
                    />
                  </CoverView>
                </CoverView>
                <CoverView className="camera-mask-tb" />
              </CoverView>
              <CoverView className="camera-mask-lr at-col-5" />
            </CoverView>
          </Camera>
        </View>
        <View className="side-bar">
          {/* <Image style="width:100%;" src={src} /> */}
          <Button className="btnbtn">nihao</Button>
          <Button className="btnbtn">nihao</Button>
        </View>
      </View>
    );
  }
}
