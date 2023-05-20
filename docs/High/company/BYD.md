---
title: BYD
order: 1
---

## three.js
Three.js的底层是基于WebGL，WebGL是可以与HTML5一起使用的JavaScript API，写在HTML5 的`<canvas>`标签中。

为了能在 canvas 中绘制图形，我们使用 Javascript 的上下文环境（context）对象，此对象可以动态创建图形。

```
// 从这里开始
function main() {
  const canvas = document.querySelector("#glcanvas");
  // 初始化 WebGL 上下文
  const gl = canvas.getContext("webgl");

  // 确认 WebGL 支持性
  if (!gl) {
    alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
    return;
  }

  // 使用完全不透明的黑色清除所有图像
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);
}
```

**对于一个 Three.js 应用，最核心的就是场景（scene object）**

### three.js中的三大要素：场景（scene）、相机（camera）、渲染器（renderer）
#### 场景（scene）
场景是所有物体的容器，场景只有一种。

创建场景：要构件一个场景很简单，只需要new一个场景对象出来即可：var scene = new THREE.Scene()

#### 相机（camera）
相机是成像的工具，相机有很多种类，不同种类的相机即使从一个角度拍摄，所成像出来的结果也不相同。相机决定了场景中哪个角度的景色会显示出来。

说到相机，就涉及到坐标系的概念。webGL和three.js使用的是右手坐标系

#### 渲染器（renderer）
渲染器的作用就是将相机拍摄出的画面在浏览器中呈现出来。渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制。

three.js中有很多种类的渲染器，例如`webGLRenderer、canvasRenderer、SVGRenderer，`通常使用的是webGL渲染器。

创建webGL渲染器：`var renderer = new THERR.WebGLRenderer();`

创建完渲染器后，需要调用render方法将之前创建好的场景和相机相结合从而渲染出来，即调用渲染器的render方法：`renderer.render(scene,camera)`

### Three.js官方文档，创建了一个旋转的 3D 立方体

1. 创建场景和相机
1. 创建渲染器，设置尺寸为窗口尺寸，并将渲染后的元素添加到body
1. 创建一个Mesh（网格对象）（绿色的3D立方体），并添加到场景中
1. 设置照相机的位置

```
<html>
  <head>
    <title>My first three.js app</title>
    <style>
      body {
        margin: 0;
      }
      canvas {
        display: block;
      }
    </style>
  </head>
  <body>
    <script src="https://unpkg.com/three@0.119.0/build/three.js"></script>
    <script>
      //创建场景和相机
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      //创建渲染器，设置尺寸为窗口尺寸，并将渲染后的元素添加到body
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      //创建一个Mesh（绿色的3D立方体），并添加到场景中
      var geometry = new THREE.BoxGeometry();
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      //设置照相机的位置
      camera.position.z = 5;

      //浏览器每次渲染的时候更新立方体的旋转角度
      var animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    </script>
  </body>
</html>
```

### 

## qiankun详解

### qiankun原理

### 样式隔离

### 主应用子应用通信
