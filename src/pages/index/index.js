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
import { throttle } from "../../common";
import { AtToast } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  state = {
    btnSrc: require("../../assets/camera.png"),
    baseSrc: "",
    width: 0,
    height: 0,
    vin: 0
  };

  takePhoto = throttle(() => {
    wx.showLoading({
      title: "识别中"
    });
    this.ctx.takePhoto({
      quality: "high",
      success: res => {
        const originImg = res.tempImagePath;
        this.canvas = wx.createCanvasContext("image-canvas", this);
        this.canvas.drawImage(
          originImg,
          0,
          0,
          this.state.width,
          this.state.height
        );
        this.canvas.draw();
        setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: "image-canvas",
            x: this.state.width * 0.4,
            y: this.state.height * 0.1,
            width: this.state.width * 0.2,
            height: this.state.height * 0.8,
            destWidth: this.state.width * 0.2,
            destHeight: this.state.height * 0.8,
            success: res => {
              this.setState({
                baseSrc: res.tempFilePath
              });
              const FileSystemManager = wx.getFileSystemManager();
              FileSystemManager.readFile({
                filePath: res.tempFilePath,
                encoding: "base64",
                success: res => {
                  this.getVin(res.data);
                }
              });
            }
          });
        }, 500);
      }
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 3000);
  }, 3000);
  getVin = imgBaseStr => {
    const dataStr = `filedata=${encodeURIComponent(imgBaseStr)}&pid=1`;
    Taro.request({
      url: "http://120.76.52.103:8078/OcrWeb/servlet/OcrServlet",
      method: "POST",
      data: dataStr,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.setState({
          baseSrc: imgBaseStr
        });
        wx.hideLoading();
        if (res.data.ErrorCode === "0") {
          this.showToast({
            title: "成功",
            icon: "success"
          });
          Taro.showModal({
            title: "vin码",
            content: res.data.VIN,
            cancelText: "重拍",
            
          });
          this.setState({
            vin: res.data.VIN
          });
        } else if (res.data.ErrorCode === "19") {
          this.showToast({ title: "图片解析失败" });
        } else {
          this.showToast();
        }
      }
    });
  };
  showToast = ({ title = "请稍后再试", icon = "none", duration = 1000 }) => {
    Taro.showToast({
      title,
      icon,
      duration
    });
  };
  error = e => {
    console.log(e.detail);
  };
  componentWillMount() {}

  componentDidMount() {
    this.ctx = wx.createCameraContext();
    wx.getSystemInfo({
      success: res => {
        this.setState({
          width: res.windowWidth,
          height: res.windowHeight * 0.8
        });
      }
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  config = {
    navigationBarTitleText: "首页"
  };

  render() {
    const { btnSrc, baseSrc, width, height, vin } = this.state;
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
          </Camera>
        </View>
        <Button>{vin}</Button>
        <View style="position:fixed;top:999999999999999999999rpx;">
          <Canvas
            canvas-id="image-canvas"
            style={`width:${width}px; height:${height}px;`}
          />
        </View>
      </View>
    );
  }
}
