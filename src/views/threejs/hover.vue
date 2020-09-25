<template>
  <div>
    <h2 class="u-ttb2">元素悬浮</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="three-box" id="three-container">
        <div class="template-box" id="info-box">
          <template v-if="curSprite != null">
            <p>名称：{{ curSprite.data.name }}</p>
            <p>类型：{{ curSprite.data.type }}</p>
          </template>
        </div>
      </div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    onMouseMove(e) {
      this.mouse.x =
        ((e.clientX - this.container.getBoundingClientRect().left) /
          this.container.offsetWidth) *
          2 -
        1;
      this.mouse.y =
        -(
          (e.clientY - this.container.getBoundingClientRect().top) /
          this.container.offsetHeight
        ) *
          2 +
        1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(this.mouse, this.camera);
      var cameraIntersects = raycaster.intersectObjects(
        this.camera_label_group.children,
        true
      );
      if (cameraIntersects.length > 0) {
        const res = cameraIntersects.filter(res => {
          return res && res.object;
        })[0];
        if (res && res.object) {
          this.container.style.cursor = "pointer";
          this.camera_label_group.children.forEach(item => {
            item.scale.set(20, 20, 20);
          });
          cameraIntersects[0].object.scale.set(30, 30, 30);
          this.curSprite = cameraIntersects[0].object;
          this.showLabelInfo(e);
          console.log(this.curSprite);
        }
      } else {
        if (this.curSprite !== null) {
          this.curSprite.scale.set(20, 20, 20);
          this.curSprite = null;
          this.container.style.cursor = "auto";
          this.hideLabelInfo();
        }
      }
      this.render();
    },
    showLabelInfo(e) {
      document.getElementById("info-box").style.left =
        e.clientX - this.container.getBoundingClientRect().left + "px";
      document.getElementById("info-box").style.top =
        e.clientY - this.container.getBoundingClientRect().top + "px";
      console.log(
        document.getElementById("info-box").style.top,
        document.getElementById("info-box").style.left
      );
      document.getElementById("info-box").style.display = "block";
    },
    hideLabelInfo() {
      document.getElementById("info-box").style.display = "none";
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
import { log } from "three";
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
      curSprite: null
    };
  },
  mounted() {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
    this.init();
    this.container.addEventListener("mousemove", this.onMouseMove, false);
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
      /**
       * 光源设置（没有会变黑）
       */
      var ambientLight = new THREE.AmbientLight(0xffffff, 1); //环境光
      // directionalLight.position.set(500, 500, -500);
      this.scene.add(ambientLight);

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
        this.camTexture["camera_1"]
      );
      this.createCamera(
        { name: "test2", type: "camera_2" },
        50,
        1,
        -4,
        this.camTexture["camera_2"]
      );
      this.scene.add(this.camera_label_group);
    },
    createCamera(data, posX, posY, posZ, texture) {
      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(posX, posY + 20, posZ);
      sprite.scale.set(20, 20, 20);
      sprite.data = data; //以序号给camera命名
      this.camera_label_group.add(sprite);
    },
    onMouseMove(e) {
      this.mouse.x =
        ((e.clientX - this.container.getBoundingClientRect().left) /
          this.container.offsetWidth) *
          2 -
        1;
      this.mouse.y =
        -(
          (e.clientY - this.container.getBoundingClientRect().top) /
          this.container.offsetHeight
        ) *
          2 +
        1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(this.mouse, this.camera);
      var cameraIntersects = raycaster.intersectObjects(
        this.camera_label_group.children,
        true
      );
      if (cameraIntersects.length > 0) {
        const res = cameraIntersects.filter(res => {
          return res && res.object;
        })[0];
        if (res && res.object) {
          this.container.style.cursor = "pointer";
          this.camera_label_group.children.forEach(item => {
            item.scale.set(20, 20, 20);
          });
          cameraIntersects[0].object.scale.set(30, 30, 30);
          this.curSprite = cameraIntersects[0].object;
          this.showLabelInfo(e);
          console.log(this.curSprite);
        }
      } else {
        if (this.curSprite !== null) {
          this.curSprite.scale.set(20, 20, 20);
          this.curSprite = null;
          this.container.style.cursor = "auto";
          this.hideLabelInfo();
        }
      }
      this.render();
    },
    showLabelInfo(e) {
      document.getElementById("info-box").style.left =
        e.clientX - this.container.getBoundingClientRect().left + "px";
      document.getElementById("info-box").style.top =
        e.clientY - this.container.getBoundingClientRect().top + "px";
      console.log(
        document.getElementById("info-box").style.top,
        document.getElementById("info-box").style.left
      );
      document.getElementById("info-box").style.display = "block";
    },
    hideLabelInfo() {
      document.getElementById("info-box").style.display = "none";
    }
  }
};
</script>

<style scoped>
.template-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #24a3f8;
  border-radius: 4px;
  display: none;
  transition: 0.2s;
}
.template-box p {
  line-height: 20px;
  margin: 0;
}
</style>
