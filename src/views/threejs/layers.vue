<template>
  <div>
    <h2 class="u-ttb2">分组管理</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <input
        type="checkbox"
        id="1"
        :value="1"
        v-model="typeGamera"
        @change="switchGamera"
      />
      <label for="1">type1</label>
      <input
        type="checkbox"
        id="2"
        :value="2"
        v-model="typeGamera"
        @change="switchGamera"
      />
      <label for="2">type2</label>
      <div class="three-box" id="three-container"></div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
      //开启图层管理(0为默认图层，通常含有底图)
      this.camera.layers.enable(1);
      this.camera.layers.enable(2);
      
      createCamera(data, posX, posY, posZ, texture, layerIndex) {
          var spriteMaterial = new THREE.SpriteMaterial({
            map: texture
          });
          var sprite = new THREE.Sprite(spriteMaterial);
          sprite.position.set(posX, posY + 20, posZ);
          sprite.scale.set(20, 20, 20);
          sprite.data = data;
          sprite.layers.set(layerIndex);
          this.camera_label_group.add(sprite);
      },

      //切换分组
      switchGamera(e) {
        this.camera.layers.toggle(parseInt(e.target.value))
        this.render();
      }
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
      container: null,
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      housePos: [0, 0, 0], //模型位置
      envURL: `${process.env.BASE_URL}3d/skybox/`, //环境盒子
      mouse: new THREE.Vector2(),
      camTexture: {
        //图标种类
        camera_1: new THREE.TextureLoader().load(
          require("../../assets/img/3d/camera1.png")
        ),
        camera_2: new THREE.TextureLoader().load(
          require("../../assets/img/3d/camera2.png")
        )
      },
      camera_label_group: new THREE.Object3D(),
      typeGamera: [1, 2]
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
      this.container = document.getElementById("three-container");
      this.camera = new THREE.PerspectiveCamera(
        10,
        this.container.clientWidth / this.container.clientHeight,
        0.1,
        10000
      );
      this.camera.position.set(500, 600, -1000);
      //开启图层管理(0为默认图层，通常含有底图)
      this.camera.layers.enable(1);
      this.camera.layers.enable(2);
      /**
       * 光源设置（没有会变黑）
       */
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1); //正面光照
      directionalLight.position.set(500, 500, -500);
      this.scene.add(directionalLight);

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.renderer.setClearColor("#ffffff", 1.0);
      this.container.appendChild(this.renderer.domElement);

      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener("change", this.render);
      this.render();

      //渲染元素
      this.loadCamera();
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
    loadCamera() {
      this.createCamera(
        { name: "test1", type: "camera_1" },
        4,
        1,
        -4,
        this.camTexture["camera_1"],
        1
      );
      this.createCamera(
        { name: "test2", type: "camera_1" },
        40,
        1,
        -4,
        this.camTexture["camera_1"],
        1
      );
      this.createCamera(
        { name: "test3", type: "camera_1" },
        80,
        1,
        -4,
        this.camTexture["camera_1"],
        1
      );
      this.createCamera(
        { name: "test4", type: "camera_2" },
        4,
        1,
        40,
        this.camTexture["camera_2"],
        2
      );
      this.createCamera(
        { name: "test5", type: "camera_2" },
        40,
        1,
        40,
        this.camTexture["camera_2"],
        2
      );
      this.createCamera(
        { name: "test6", type: "camera_2" },
        80,
        1,
        40,
        this.camTexture["camera_2"],
        2
      );
      this.scene.add(this.camera_label_group);
    },
    createCamera(data, posX, posY, posZ, texture, layerIndex) {
      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(posX, posY + 20, posZ);
      sprite.scale.set(20, 20, 20);
      sprite.data = data;
      sprite.layers.set(layerIndex);
      this.camera_label_group.add(sprite);
    },
    //切换分组
    switchGamera(e) {
      this.camera.layers.toggle(parseInt(e.target.value));
      this.render();
    }
  }
};
</script>

<style scoped></style>
