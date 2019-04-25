import Taro from "@tarojs/taro";
// 调vin识别接口
export const getVinCode = baseStr =>
  new Promise((resolve, reject) => {
    const str = `filedata=${encodeURIComponent(baseStr)}&pid=1`;
    wx.request({
      url: "http://120.76.52.103:8078/OcrWeb/servlet/OcrServlet",
      method: "POST",
      data: str,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        wx.hideLoading();
        switch (res.data.ErrorCode) {
          case "0":
            const vinCode = res.data.VIN;
            Taro.showModal({
              title: "vin码",
              content: vinCode,
              cancelText: "取消",
              cancelColor: "#888",
              confirmText: "复制",
              success: res => {
                if (res.confirm) {
                  Taro.setClipboardData({
                    data: vinCode
                  });
                }
              }
            });
            resolve(res.data.VIN);
            break;
          case "19":
            showToast({ title: "未捕获到车架号信息" });
            break;
          case "20":
            showToast({ title: "找不到该车型" });
            break;
          default:
            showToast({});
            break;
        }
        resolve(res);
      },
      fail: res => {
        showToast({});
      }
    });
  });
 function showToast({ title = "请稍后再试", icon = "none", duration = 1500 }){
    wx.showToast({
      title,
      icon,
      duration
    });
  };