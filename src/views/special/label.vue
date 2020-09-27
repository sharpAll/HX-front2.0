<template>
  <div>
    <h2 class="u-ttb2">标签打印</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div style="height: 50px">
        <button @click="printLabel()">开始打印</button>
      </div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    //初始化标签打印
    wsInit() {
      var wsUrl = "ws://localhost:2012";
      if ("WebSocket" in window) {
        this.ws = new WebSocket(wsUrl);
      } else {
        alert("当前浏览器不支持");
        return;
      }
      //注册各类回调
      this.ws.onopen = function() {
        console.log("连接打印后台成功");
      };
      this.ws.onclose = function() {
        console.log("与打印后台断开连接");
      };
      this.ws.onerror = function() {
        console.log("数据传输发生错误");
        this.socktError = "数据传输发生错误";
      };
      this.ws.onmessage = function(receiveMsg) {
        if (receiveMsg.data.split("|")[0] == "B_GetPrinterStatus") {
          var ret = receiveMsg.data.split("|")[1];
          if (ret == 2) {
            alert("2:USB端口开启失败");
            return;
          } else if (ret == 7) {
            alert("7:纸张/碳带用完！");
            return;
          } else if (ret == 4) {
            alert("4:内存溢出！");
            return;
          } else if (ret == 4) {
            alert("4 碳带用完或安装错误！");
            return;
          } else if (ret == 3) {
            alert("3:条码格式错误！");
            return;
          } else if (ret == 1) {
            alert("1:打印命令错误！");
            return;
          } else if (ret == 6) {
            alert("6:串口通信异常！");
            return;
          } else if (ret == 50) {
            alert("50:打印机忙碌！");
            return;
          } else if (ret == 12) {
            alert("12:打印机暂停！");
            return;
          } else if (ret == 9) {
            alert("9:未取得返回值");
            return;
          } else if (ret == 0) {
            alert("连接成功，等待列印");
            console.log("0:等待列印!"); //0:等待列印!
            return;
          }
        }
      };
    },
    printLabel() {
      if (this.socktError != "") {
        this.$message({
          message: this.socktError,
          type: "error"
        });
        return;
      }
      if (this.ws.readyState == 1) {
        this.ws.send("B_EnumUSB");
        this.ws.send("B_CreateUSBPort|1");
        this.ws.send("B_Set_Backfeed|F");
        for (var i = 1; i &lt;= 3; i++) {
          this.ws.send(
            `B_Bar2d_QR|664|105|2|6|M|A|0|0|0|http://${window.location.host}/#/media?num=${i}`
          );
          this.ws.send("B_Set_Direction|B");
          let offsetY = 10;
          this.ws.send(
            `B_Prn_Text_TrueType|624|${offsetY}|25|宋体|1|600|0|0|0|a|编号:${i}`
          );
          offsetY = offsetY + 30;
          this.ws.send(
            `B_Prn_Text_TrueType|624|${offsetY}|25|宋体|1|600|0|0|0|b|设备名称:名称${i}`
          );
          offsetY = offsetY + 30;
          this.ws.send(
            `B_Prn_Text_TrueType|624|${offsetY}|25|宋体|1|600|0|0|0|c|设备类型:类型${i}`
          );
          this.ws.send("B_Print_Out|1");
        }
        this.ws.send("B_ClosePrn");
      } else if (this.ws.readyState == 0) {
        this.$message({
          message: "正在连接...",
          type: "info"
        });
      } else if (this.ws.readyState == 2) {
        this.$message({
          message: "正在关闭...",
          type: "info"
        });
      } else if (this.ws.readyState == 1) {
        this.$message({
          message: "连接失败",
          type: "info"
        });
      }
    }
          </code>
        </pre>
      </dd>
      <dt>注意事项</dt>
      <dd>
        <p>1.打印机型号：ARGOX CP-2104、ARGOX CP-3140测试通过</p>
        <p>2.需要.net 4.5及以上执行环境</p>
        <p>3.安装打印机驱动Argox_2018.1_M-0.exe</p>
        <p>
          4.安装浏览器调用服务Setup.exe，Setup 安装后打开 ArgoxPrintService.exe
        </p>
        <p>5.浏览器必须支持HTML5</p>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      socktError: ""
    };
  },
  created() {
    this.wsInit();
  },
  methods: {
    //初始化标签打印
    wsInit() {
      var wsUrl = "ws://localhost:2012";
      if ("WebSocket" in window) {
        this.ws = new WebSocket(wsUrl);
      } else {
        alert("当前浏览器不支持");
        return;
      }
      //注册各类回调
      this.ws.onopen = function() {
        console.log("连接打印后台成功");
      };
      this.ws.onclose = function() {
        console.log("与打印后台断开连接");
      };
      this.ws.onerror = function() {
        console.log("数据传输发生错误");
        this.socktError = "数据传输发生错误";
      };
      this.ws.onmessage = function(receiveMsg) {
        if (receiveMsg.data.split("|")[0] == "B_GetPrinterStatus") {
          var ret = receiveMsg.data.split("|")[1];
          if (ret == 2) {
            alert("2:USB端口开启失败");
            return;
          } else if (ret == 7) {
            alert("7:纸张/碳带用完！");
            return;
          } else if (ret == 4) {
            alert("4:内存溢出！");
            return;
          } else if (ret == 4) {
            alert("4 碳带用完或安装错误！");
            return;
          } else if (ret == 3) {
            alert("3:条码格式错误！");
            return;
          } else if (ret == 1) {
            alert("1:打印命令错误！");
            return;
          } else if (ret == 6) {
            alert("6:串口通信异常！");
            return;
          } else if (ret == 50) {
            alert("50:打印机忙碌！");
            return;
          } else if (ret == 12) {
            alert("12:打印机暂停！");
            return;
          } else if (ret == 9) {
            alert("9:未取得返回值");
            return;
          } else if (ret == 0) {
            alert("连接成功，等待列印");
            console.log("0:等待列印!"); //0:等待列印!
            return;
          }
        }
      };
    },
    printLabel() {
      if (this.socktError != "") {
        this.$message({
          message: this.socktError,
          type: "error"
        });
        return;
      }
      if (this.ws.readyState == 1) {
        this.ws.send("B_EnumUSB");
        this.ws.send("B_CreateUSBPort|1");
        this.ws.send("B_Set_Backfeed|F");
        for (var i = 1; i <= 3; i++) {
          this.ws.send(
            `B_Bar2d_QR|664|105|2|6|M|A|0|0|0|http://${window.location.host}/#/media?num=${i}`
          );
          this.ws.send("B_Set_Direction|B");
          let offsetY = 10;
          this.ws.send(
            `B_Prn_Text_TrueType|624|${offsetY}|25|宋体|1|600|0|0|0|a|编号:${i}`
          );
          offsetY = offsetY + 30;
          this.ws.send(
            `B_Prn_Text_TrueType|624|${offsetY}|25|宋体|1|600|0|0|0|b|设备名称:名称${i}`
          );
          offsetY = offsetY + 30;
          this.ws.send(
            `B_Prn_Text_TrueType|624|${offsetY}|25|宋体|1|600|0|0|0|c|设备类型:类型${i}`
          );
          this.ws.send("B_Print_Out|1");
        }
        this.ws.send("B_ClosePrn");
      } else if (this.ws.readyState == 0) {
        this.$message({
          message: "正在连接...",
          type: "info"
        });
      } else if (this.ws.readyState == 2) {
        this.$message({
          message: "正在关闭...",
          type: "info"
        });
      } else if (this.ws.readyState == 1) {
        this.$message({
          message: "连接失败",
          type: "info"
        });
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
