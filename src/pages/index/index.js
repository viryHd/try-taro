import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Button,
  Image,
  Camera,
  CoverView,
  CoverImage,
  Canvas
} from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  state = {
    btnSrc: require("../../assets/icon.jpg"),
    baseSrc: "",
    width: 0,
    height: 0
  };

  takePhoto = () => {
    this.ctx.takePhoto({
      success: res => {
        const originImg = res.tempImagePath;
        Taro.getSystemInfo({
          success: res => {
            this.setState({
              width: res.windowWidth,
              height: res.windowHeight * 0.8
            });
          }
        }).then(res => {
          this.canvas = wx.createCanvasContext("image-canvas", this);
          this.canvas.drawImage(originImg, 0, 0, this.width, this.height);
          this.canvas.draw();
          setTimeout(() => {
            wx.canvasToTempFilePath({
              canvasId: "image-canvas",
              x: this.width * 0.4,
              y: this.height * 0.15,
              width: this.width * 0.2,
              height: this.height * 0.7,
              destWidth: this.width * 0.2,
              destHeight: this.height * 0.7,
              success: res => {
                console.log(res.tempFilePath);
                this.getImgToBase64(res.tempFilePath);
              }
            });
          }, 1000);
        });
      }
    });
  };

  getImgToBase64 = filePath => {
    let fs = wx.getFileSystemManager();
    fs.readFile({
      filePath,
      encoding: "base64",
      success: res => {
        const baseImg = "data:image/jpeg;base64," + res.data;
        this.setState({
          baseSrc: baseImg
        });
      }
    });
  };

  error = e => {
    console.log(e.detail);
  };
  componentWillMount() {}

  componentDidMount() {
    this.ctx = wx.createCameraContext();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  config = {
    navigationBarTitleText: "首页"
  };

  render() {
    return (
      <View className="index">
        <View className="camera-wrapp">
          <Camera
            device-position="back"
            flash="off"
            onError={this.error}
            style="width: 100%; height: 100%;"
          >
            <CoverView className="camera-mask at-row">
              <CoverView className="camera-mask-lr fl-col-40" />
              <CoverView className="camera-mask-m fl-col-20 at-row at-row__direction--column">
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
              <CoverView className="camera-mask-lr fl-col-40" />
            </CoverView>
            <Canvas
              canvas-id="image-canvas"
              style={`width:${width}px; height:${height}px; display:none;`}
            />
          </Camera>
        </View>
        <View className="side-bar">
          {/* <Image src={baseSrc} /> */}
        </View>
      </View>
    );
  }
}
