<template>
  <div>
    <h2 class="u-ttb2">加载dae模型</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="three-box" id="container">
        <button @click="controlsReset">还原视角</button>
      </div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
      this.scene = new THREE.Scene();
        this.scene.background = this.getEnvMap();
        let house = new THREE.Object3D();
        var loadingManager = new THREE.LoadingManager(() => {
          this.scene.add(house);
        });
        var loader = new ColladaLoader(loadingManager);
        loader.load(`${process.env.BASE_URL}3d/model/army.dae`, collada => {
          var dae = collada.scene;
          console.log(collada);
          dae.position.set(...this.housePos);
          dae.name = "model";
          house.add(dae);
          setTimeout(() => {
            this.render();
        }, 200);
      });
      /**
       * 光源设置（没有会变黑）
       */
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1); //正面光照
      directionalLight.position.set(500, 500, -500);
      this.scene.add(directionalLight);
          </code>
        </pre>
      </dd>
    </dl>
  </div>
</template>

<script>
import hljs from "highlight.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      housePos: [-230, 0, 80], //模型位置
      envURL: `${process.env.BASE_URL}3d/skybox/` //环境盒子
    };
  },
  mounted() {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
    this.init();
  },
  components: {},

  methods: {
    //初始化
    init() {
      //  创建场景对象Scene
      this.scene = new THREE.Scene();
      this.scene.background = this.getEnvMap();
      let house = new THREE.Object3D();
      var loadingManager = new THREE.LoadingManager(() => {
        this.scene.add(house);
      });
      var loader = new ColladaLoader(loadingManager);
      loader.load(`${process.env.BASE_URL}3d/model/army.dae`, collada => {
        var dae = collada.scene;
        console.log(collada);
        dae.position.set(...this.housePos);
        dae.name = "model";
        house.add(dae);
        setTimeout(() => {
          this.render();
        }, 200);
      });
      /**
       * 相机设置
       */
      let container = document.getElementById("container");
      this.camera = new THREE.PerspectiveCamera(
        20,
        container.clientWidth / container.clientHeight,
        0.1,
        10000
      );
      this.camera.position.set(0, 1000, -1200);
      // 辅助坐标系
      this.scene.add(new THREE.AxesHelper(2000));
      /**
       * 光源设置（没有会变黑）
       */
      var ambientLight = new THREE.AmbientLight(0xaaaaaa, 1); //环境光
      // directionalLight.position.set(500, 500, -500);
      this.scene.add(ambientLight);

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor("#ffffff", 1.0);
      container.appendChild(this.renderer.domElement);

      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener("change", this.render);
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    getEnvMap() {
      var envMap = new THREE.CubeTextureLoader().load([
        this.envURL + "px.jpg",
        this.envURL + "nx.jpg",
        this.envURL + "py.jpg",
        this.envURL + "ny.jpg",
        this.envURL + "pz.jpg",
        this.envURL + "nz.jpg"
      ]);
      envMap.format = THREE.RGBFormat;
      return envMap;
    },
    controlsReset() {
      this.controls.reset();
      this.render();
    }
  }
};
</script>

<style scoped>
button {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
