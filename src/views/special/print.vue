<template>
  <div>
    <h2 class="u-ttb2">分页打印</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div style="height: 50px">
        <button @click="printBtn()">开始打印</button>
      </div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    printContent(contentId, style) {
      style = style || "";
      let printStr =
        "&lt;html&gt;&lt;head&gt;&lt;meta http-equiv='Content-Type' content='text/html; charset=utf-8'&gt;" +
        style +
        "&lt;/head&gt;&lt;body &gt;";
      let content = document.getElementById(contentId).innerHTML;
      printStr = printStr + content + "&lt;/body&gt;&lt;/html&gt;";
      let pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需要
      pwin.document.write(printStr);
      pwin.document.close();
      pwin.print();
    }
          </code>
        </pre>
      </dd>
    </dl>
    <div id="contentPrint" style="display: none">
      <div style="page-break-after:always">
        <div style="width: 600px; margin: auto;page-break-after:always;">
          <div
            style="font-size: 17px;color: red;text-align: center;margin-bottom: 20px;margin-top: 10px;line-height: 24px;font-weight: bold"
          >
            军运会台站申报许可系统预指单
          </div>
          <div
            style="margin-top: 30px;margin-bottom: 40px;font-size: 16px;padding: 0 20px;font-family: 'FangSong','STFangsong';"
          >
            <p style="text-indent: 34px;line-height: 24px">
              使用单位：
              <span id="printDW"></span>。
            </p>
            <p style="text-indent: 34px;line-height: 24px">
              设备类型：
              <span id="printLX"></span>。
            </p>
            <p style="text-indent: 34px;line-height: 24px">
              设备用途：
              <span id="printYT"></span>。
            </p>
            <p style="text-indent: 34px;line-height: 24px">预指配频率：</p>
            <div id="printYZP"></div>
            <p style="text-indent: 34px;line-height: 24px">专家意见</p>
            <p style="text-indent: 34px;line-height: 24px">
              <span style="margin-right: 50px">
                <input type="checkbox" />同意指配
              </span>
              <span> <input type="checkbox" />不同意指配 </span>
            </p>
            <p style="text-indent: 34px;line-height: 24px">专家意见说明：</p>
            <div style="width: 400px;height: 200px"></div>
          </div>
          <div
            style="text-align: right;color: #000;font-size: 16px;margin-bottom: 8px;margin-right: 8px;font-family: 'FangSong','STFangsong';"
          >
            专家签字：
          </div>
          <div
            style="text-align: right;color: #000;font-size: 16px;margin-bottom: 8px;margin-right: 8px;font-family: 'FangSong','STFangsong';"
          >
            审核日期：
          </div>
        </div>
      </div>
      <div>
        <div style="width: 600px; margin: auto;page-break-after:always;">
          <div
            style="font-size: 17px;color: red;text-align: center;margin-bottom: 20px;margin-top: 10px;line-height: 24px;font-weight: bold"
          >
            武汉军运会电磁兼容分析任务单
          </div>
          <div
            style="text-align: right;color: #000;font-size: 12px;margin-bottom: 8px;margin-right: 8px;font-family: 'FangSong','STFangsong';"
          >
            任务单编号:
            <span id="numberingPrint3">20190902001</span>
          </div>
          <div style="border-bottom: 2px solid red"></div>
          <div
            style="margin-top: 30px;margin-bottom: 40px;font-size: 16px;padding: 0 20px;font-family: 'FangSong','STFangsong';"
          >
            <table style="width: 100%">
              <tbody>
                <tr>
                  <td>发起部门</td>
                  <td>频率台站审批组</td>
                  <td>接收部门</td>
                  <td>电磁兼容分析室</td>
                </tr>
                <tr>
                  <td>发起联系人</td>
                  <td id="zhNamePrint3"></td>
                  <td>联系电话</td>
                  <td id="commentsPrint3"></td>
                </tr>
                <tr>
                  <td>发起时间</td>
                  <td id="createDatePrint3"></td>
                  <td>使用单位</td>
                  <td id="orgnamePrint3"></td>
                </tr>
                <tr>
                  <td>分析区域</td>
                  <td colspan="3" id="areaPrint3"></td>
                </tr>
                <tr>
                  <td>电磁兼容分析</td>
                  <td colspan="3" style="text-align: left;padding-left: 8px">
                    计时主机：
                    <span id="equPrint3"></span>
                    <br />频率范围：
                    <span id="rangePrint3">433</span>
                    <br />工作频率：
                    <span id="freqPrint3">433</span>
                    <br />占用带宽：
                    <span id="bandPrint3">500</span>
                  </td>
                </tr>
                <tr style="height: 300px">
                  <td>接收部门意见</td>
                  <td colspan="3">
                    <div style="position: absolute;bottom: 5px">
                      签名：
                      <span style="display: inline-block;width: 80px;"></span>
                      单位：
                      <span style="display: inline-block;width: 80px;"></span>
                      2019年
                      <span style="display: inline-block;width: 30px;"></span>月
                      <span style="display: inline-block;width: 30px;"></span>日
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    printContent(contentId, style) {
      style = style || "";
      let printStr =
        "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
        style +
        "</head><body >";
      let content = document.getElementById(contentId).innerHTML;
      printStr = printStr + content + "</body></html>";
      let pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需要
      pwin.document.write(printStr);
      pwin.document.close();
      pwin.print();
    },
    printBtn() {
      let contentId = "contentPrint";
      let style =
        "    <style>" +
        "        table{" +
        "            border-collapse: collapse;" +
        "            table-layout: fixed;" +
        "        }" +
        "        table td{" +
        "            position: relative;" +
        "            border: 1px solid #000;" +
        "            font-size: 14px;" +
        "            text-align: center;" +
        "            line-height: 40px;" +
        "        }" +
        "    </style>";
      this.printContent(contentId, style);
    }
  }
};
</script>

<style scoped lang="scss"></style>
