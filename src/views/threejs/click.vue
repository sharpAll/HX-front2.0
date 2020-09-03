<template>
  <div>
    <h2 class="u-ttb2">元素点击</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="three-box" id="three-container"></div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    onCanvasClick(e) {
      //发出射线 this.container.getBoundingClientRect().left=>canvas相对屏幕的偏移
      //this.container.offsetWidth=>canvas的宽度、包含border
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
        this.camera_label.children,
        true
      );
      if (cameraIntersects.length > 0) {
        const res = cameraIntersects.filter(res => {
          return res && res.object;
        })[0];
        if (res && res.object) {
          alert(`id:${res.object.data.id} name:${res.object.data.name}`);
        }
      }
    }
          </code>
        </pre>
      </dd>
      <dt>注意事项</dt>
      <dd>
        <p>
          官方示例中this.mouse的配置基本是基于全屏的，当非全屏时需要使用另外的公式计算。
        </p>
        <p>
          this.mouse.x =((e.clientX -
          this.container.getBoundingClientRect().left) /
          this.container.offsetWidth) *2 -1;
        </p>
        <p>
          this.mouse.y =-((e.clientY -
          this.container.getBoundingClientRect().top) /
          this.container.offsetHeight) *2 +1;
        </p>
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
      camera_label: new THREE.Object3D()
    };
  },
  mounted() {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
    this.init();
    this.container.addEventListener("click", this.onCanvasClick, false);
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
    onCanvasClick(e) {
      //发出射线 this.container.getBoundingClientRect().left=>canvas相对屏幕的偏移
      //this.container.offsetWidth=>canvas的宽度、包含border
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
        this.camera_label.children,
        true
      );
      if (cameraIntersects.length > 0) {
        const res = cameraIntersects.filter(res => {
          return res && res.object;
        })[0];
        if (res && res.object) {
          alert(`id:${res.object.data.id} name:${res.object.data.name}`);
        }
      }
    },
    loadCamera() {
      var data, x, y, z, type;
      data = {
        name: "test1",
        id: 1
      };
      x = parseInt(4);
      y = parseInt(1);
      z = parseInt(-4);
      type = "camera_2";
      this.createCamera(data, x, y, z, this.camTexture[type]);
      this.scene.add(this.camera_label);
    },
    createCamera(data, posX, posY, posZ, texture) {
      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(posX, posY + 20, posZ);
      sprite.scale.set(20, 20, 20);
      sprite.data = data;
      this.camera_label.add(sprite);
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
        this.camera_label.children,
        true
      );
      if (cameraIntersects.length > 0) {
        const res = cameraIntersects.filter(res => {
          return res && res.object;
        })[0];
        if (res && res.object) {
          this.container.style.cursor = "pointer";
        }
      } else {
        this.container.style.cursor = "auto";
      }
    }
  }
};
</script>

<style scoped></style>
