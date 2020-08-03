<template>
  <div>
    <h2 class="u-ttb2">大数据表格</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="header-box">
        <div class="index">序号</div>
        <div class="score">数值</div>
      </div>
      <RecycleScroller
        class="scroller"
        :items="list"
        :item-size="32"
        key-field="index"
        v-slot="{ item }"
      >
        <div class="item-box">
          <div class="index">{{ item.index }}</div>
          <div class="score">{{ item.score }}</div>
        </div>
      </RecycleScroller>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
            import { RecycleScroller } from "vue-virtual-scroller";
            import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
          </code>
        </pre>
      </dd>
      <dt>注意事项</dt>
      <dd>
        <p>安装：npm install --save vue-virtual-scroller</p>
        <p>
          浏览器对DOM元素有大小限制，这意味着当前虚拟滚动器最多只能显示约50万个项目，具体取决于浏览器。
        </p>
      </dd>
    </dl>
  </div>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
export default {
  data() {
    return {
      list: []
    };
  },

  components: { RecycleScroller },
  created() {
    for (let i = 1; i <= 100000; i++) {
      let item = {
        index: i,
        score: parseInt(Math.random() * 100)
      };
      this.list.push(item);
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.scroller {
  height: 210px;
}
.header-box {
  padding-right: 17px;
  background: #eee;
}
.item-box,
.header-box {
  display: flex;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  .index {
    flex: 1;
  }
  .score {
    flex: 2;
  }
}
</style>
