<template>
  <div>
    <h2 class="u-ttb2">字段校验</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div>
        <label for="numberNotNega">非负数：</label>
        <input id="numberNotNega" v-model="numberNotNega" type="text" />
        <span>{{ isNumberNotNega(numberNotNega) }}</span>
      </div>
      <div>
        <label for="chineseName">中文名称：</label>
        <input id="chineseName" v-model="chineseName" type="text" />
        <span>{{ isChineseName(chineseName) }}</span>
      </div>
      <div>
        <label for="IdNumber">身份证号：</label>
        <input id="IdNumber" v-model="IdNumber" type="text" />
        <span>{{ isIdNumber(IdNumber) }}</span>
      </div>
      <div>
        <label for="adult">根据身份证号码验证是否成年：</label>
        <input id="adult" v-model="adult" type="text" />
        <span>{{ isAdult(adult) }}</span>
      </div>
      <div>
        <label for="Email">Email：</label>
        <input id="Email" v-model="Email" type="text" />
        <span>{{ isEmail(Email) }}</span>
      </div>
      <div>
        <label for="Mobile">手机号：</label>
        <input id="Mobile" v-model="Mobile" type="text" />
        <span>{{ isMobile(Mobile) }}</span>
      </div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    //非负数
    isNumberNotNega(value) {
      const reg = /^[0-9]*$/;
      const reg1 = /^\d+(\.\d+)?$/;
      if (!(reg.test(value) || reg1.test(value)) || value == "") {
        return false;
      } else {
        return true;
      }
    },
    //中文名称
    isChineseName(value) {
      const reg1 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}$/;
      const reg2 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}[·][\u4E00-\uFA29\uE7C7-\uE7F3]{2,9}$/; // 新疆人姓名,以·连接
      const reg3 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}[●][\u4E00-\uFA29\uE7C7-\uE7F3]{2,9}$/; // 新疆人姓名,以●连接
      const reg4 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}[\\s][\u4E00-\uFA29\uE7C7-\uE7F3]{2,9}$/; // 新疆人姓名,以空格连接
      const reg5 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}[\\-][\u4E00-\uFA29\uE7C7-\uE7F3]{2,9}$/; // 新疆人姓名,以-连接
      if (
        !reg1.test(value) &&
        !reg2.test(value) &&
        !reg3.test(value) &&
        !reg4.test(value) &&
        !reg5.test(value)
      ) {
        return false;
      } else {
        return true;
      }
    },
    //身份证号
    isIdNumber(IdNumber) {
      if (IdNumber.length != 15 && IdNumber.length != 18) {
        return false;
      } else if (!this.certNoDetail(IdNumber)) {
        return false;
      } else {
        return true;
      }
    },
    certNoDetail(input) {
      var IS_IDCARD = false;
      if (input.length == 15) {
        var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        if (!reg.test(input)) {
          return IS_IDCARD;
        }
      }
      if (input.length == 18) {
        var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([\d|x|X]{1})$/;
        if (!reg.test(input)) {
          return IS_IDCARD;
        }
      }
      var monthPerDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var certid = input.toLowerCase();
      var birthDate =
        certid.length == 15
          ? "19" + certid.substring(6, 12)
          : certid.substring(6, 14);
      var year = birthDate.substring(0, 4);
      var month = null;
      var day = null;
      if (birthDate.substring(4, 5) == "0") {
        month = birthDate.substring(5, 6);
      } else {
        month = birthDate.substring(4, 6);
      }
      if (birthDate.substring(6, 7) == "0") {
        day = birthDate.substring(7, 8);
      } else {
        day = birthDate.substring(6, 8);
      }
      var dd = parseInt(day, 10);
      var mm = parseInt(month, 10);
      var yy = parseInt(year, 10);
      if (mm > 12 || mm &lt; 1 || dd > 31 || dd &lt; 1) {
        return IS_IDCARD;
      }
      if (yy % 100 != 0) {
        if (yy % 4 == 0) {
          monthPerDays[1] = 29;
        }
      } else {
        if (yy % 400 == 0) {
          monthPerDays[1] = 29;
        }
      }
      if (monthPerDays[mm - 1] &lt; dd) {
        return IS_IDCARD;
      }
      if (certid.length == 15) {
        return true;
      }
      var arTemp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var num = 0;
      var proof = "";
      for (var i = 0; i &lt; 17; i++) {
        num = num + parseInt(certid.substring(i, i + 1), 10) * arTemp[i];
      }
      num = num % 11;
      switch (num) {
        case 0:
          proof = "1";
          break;
        case 1:
          proof = "0";
          break;
        case 2:
          proof = "x";
          break;
        case 3:
          proof = "9";
          break;
        case 4:
          proof = "8";
          break;
        case 5:
          proof = "7";
          break;
        case 6:
          proof = "6";
          break;
        case 7:
          proof = "5";
          break;
        case 8:
          proof = "4";
          break;
        case 9:
          proof = "3";
          break;
        case 10:
          proof = "2";
          break;
      }
      if (proof == "" || !(certid.substring(17, 18) == proof)) {
        return IS_IDCARD;
      } else {
        return true;
      }
    },
    //根据身份证号码验证是否成年
    isAdult(idCard) {
      var birthDate = "",
        year = "",
        month = "",
        day = "";
      if (idCard.length != 15 && idCard.length != 18) {
        return false;
      } else if (idCard.length == 18) {
        year = idCard.substring(6, 10);
        month = idCard.substring(10, 12);
        day = idCard.substring(12, 14);
      } else {
        year = "19" + idCard.substring(6, 8);
        month = idCard.substring(8, 10);
        day = idCard.substring(10, 12);
      }
      birthDate = "" + year + month + day;
      var nowStr = format.asString("yyyyMMdd", new Date());
      var left = parseInt(nowStr, 10) - parseInt(birthDate, 10);
      if (left &lt; 18 * 10000) {
        return false;
      } else {
        return true;
      }
    },
    //邮箱地址
    isEmail(email) {
      const reg = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!reg.test(email)) {
        return false;
      } else {
        return true;
      }
    },
    //手机号码
    isMobile: function(mobile) {
      const reg = /^(?:13\d|14\d|15\d|18\d|17\d)-?\d{5}(\d{3}|\*{3})$/;
      if (!reg.test(mobile)) {
        return false;
      } else {
        return true;
      }
    }
          </code>
        </pre>
      </dd>
      <dt>注意事项</dt>
      <dd>
        <p>部分校验使用了日期格式插件，如出现format未定义请执行以下代码：</p>
        <p>
          npm i date-format
        </p>
      </dd>
    </dl>
  </div>
</template>

<script>
import format from "date-format";
export default {
  data() {
    return {
      numberNotNega: "",
      chineseName: "",
      IdNumber: "",
      adult: "",
      Email: "",
      Mobile: ""
    };
  },
  created() {},
  methods: {
    //非负数
    isNumberNotNega(value) {
      const reg = /^[0-9]*$/;
      const reg1 = /^\d+(\.\d+)?$/;
      if (!(reg.test(value) || reg1.test(value)) || value == "") {
        return false;
      } else {
        return true;
      }
    },
    //中文名称
    isChineseName(value) {
      const reg1 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}$/;
      const reg2 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}[·][\u4E00-\uFA29\uE7C7-\uE7F3]{2,9}$/; // 新疆人姓名,以·连接
      const reg3 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}[●][\u4E00-\uFA29\uE7C7-\uE7F3]{2,9}$/; // 新疆人姓名,以●连接
      const reg4 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}[\\s][\u4E00-\uFA29\uE7C7-\uE7F3]{2,9}$/; // 新疆人姓名,以空格连接
      const reg5 = /^[\u4E00-\uFA29\uE7C7-\uE7F3]{2,10}[\\-][\u4E00-\uFA29\uE7C7-\uE7F3]{2,9}$/; // 新疆人姓名,以-连接
      if (
        !reg1.test(value) &&
        !reg2.test(value) &&
        !reg3.test(value) &&
        !reg4.test(value) &&
        !reg5.test(value)
      ) {
        return false;
      } else {
        return true;
      }
    },
    //身份证号
    isIdNumber(IdNumber) {
      if (IdNumber.length != 15 && IdNumber.length != 18) {
        return false;
      } else if (!this.certNoDetail(IdNumber)) {
        return false;
      } else {
        return true;
      }
    },
    certNoDetail(input) {
      var IS_IDCARD = false;
      if (input.length == 15) {
        var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        if (!reg.test(input)) {
          return IS_IDCARD;
        }
      }
      if (input.length == 18) {
        var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([\d|x|X]{1})$/;
        if (!reg.test(input)) {
          return IS_IDCARD;
        }
      }
      var monthPerDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var certid = input.toLowerCase();
      var birthDate =
        certid.length == 15
          ? "19" + certid.substring(6, 12)
          : certid.substring(6, 14);
      var year = birthDate.substring(0, 4);
      var month = null;
      var day = null;
      if (birthDate.substring(4, 5) == "0") {
        month = birthDate.substring(5, 6);
      } else {
        month = birthDate.substring(4, 6);
      }
      if (birthDate.substring(6, 7) == "0") {
        day = birthDate.substring(7, 8);
      } else {
        day = birthDate.substring(6, 8);
      }
      var dd = parseInt(day, 10);
      var mm = parseInt(month, 10);
      var yy = parseInt(year, 10);
      if (mm > 12 || mm < 1 || dd > 31 || dd < 1) {
        return IS_IDCARD;
      }
      if (yy % 100 != 0) {
        if (yy % 4 == 0) {
          monthPerDays[1] = 29;
        }
      } else {
        if (yy % 400 == 0) {
          monthPerDays[1] = 29;
        }
      }
      if (monthPerDays[mm - 1] < dd) {
        return IS_IDCARD;
      }
      if (certid.length == 15) {
        return true;
      }
      var arTemp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var num = 0;
      var proof = "";
      for (var i = 0; i < 17; i++) {
        num = num + parseInt(certid.substring(i, i + 1), 10) * arTemp[i];
      }
      num = num % 11;
      switch (num) {
        case 0:
          proof = "1";
          break;
        case 1:
          proof = "0";
          break;
        case 2:
          proof = "x";
          break;
        case 3:
          proof = "9";
          break;
        case 4:
          proof = "8";
          break;
        case 5:
          proof = "7";
          break;
        case 6:
          proof = "6";
          break;
        case 7:
          proof = "5";
          break;
        case 8:
          proof = "4";
          break;
        case 9:
          proof = "3";
          break;
        case 10:
          proof = "2";
          break;
      }
      if (proof == "" || !(certid.substring(17, 18) == proof)) {
        return IS_IDCARD;
      } else {
        return true;
      }
    },
    //根据身份证号码验证是否成年
    isAdult(idCard) {
      var birthDate = "",
        year = "",
        month = "",
        day = "";
      if (idCard.length != 15 && idCard.length != 18) {
        return false;
      } else if (idCard.length == 18) {
        year = idCard.substring(6, 10);
        month = idCard.substring(10, 12);
        day = idCard.substring(12, 14);
      } else {
        year = "19" + idCard.substring(6, 8);
        month = idCard.substring(8, 10);
        day = idCard.substring(10, 12);
      }
      birthDate = "" + year + month + day;
      var nowStr = format.asString("yyyyMMdd", new Date());
      var left = parseInt(nowStr, 10) - parseInt(birthDate, 10);
      if (left < 18 * 10000) {
        return false;
      } else {
        return true;
      }
    },
    //邮箱地址
    isEmail(email) {
      const reg = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!reg.test(email)) {
        return false;
      } else {
        return true;
      }
    },
    //手机号码
    isMobile: function(mobile) {
      const reg = /^(?:13\d|14\d|15\d|18\d|17\d)-?\d{5}(\d{3}|\*{3})$/;
      if (!reg.test(mobile)) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
