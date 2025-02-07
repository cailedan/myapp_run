import React, { Component } from 'react';
import * as THREE from 'three';

class RunningCharacter extends Component {
  constructor(props) {
    super(props);
    this.refContainer = React.createRef(); // 创建 ref 引用
  }

  componentDidMount() {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();

    // 设置相机，保持平视
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 10; // 相机离人物有一定距离
    camera.position.y = 3;  // 相机保持平视，所以设置 y 轴位置

    // 设置渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器的大小
    renderer.setClearColor(0x87CEFA, 1); // 浅蓝色（RGB: 135, 206, 250）
    this.refContainer.current.appendChild(renderer.domElement);

    // 更新窗口大小时，重新设置渲染器和相机的宽高比
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight; // 更新相机宽高比
      camera.updateProjectionMatrix(); // 更新相机投影矩阵
      renderer.setSize(window.innerWidth, window.innerHeight); // 更新渲染器大小
    });

    // 创建一个简单的人物模型（用一个立方体代替）
    const geometry = new THREE.BoxGeometry(1, 2, 1); // 创建一个立方体，表示人物
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const character = new THREE.Mesh(geometry, material);
    scene.add(character);

    // 创建一个简单的地面
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = - Math.PI / 2; // 让地面水平
    ground.position.y = -3; // 将地面位置降低
    scene.add(ground);

    // 动画参数
    let speed = 0.05; // 跑步速度
    let stepCount = 0; // 跑步步数计数

    character.position.x = 10; // 起始位置稍微靠右
    character.position.y = 0;  // 起始位置的垂直位置

    // 角色动画
    const animate = () => {
      requestAnimationFrame(animate);

      // 控制人物的水平移动
      character.position.x -= speed;

      if (character.position.x < -10) {
        character.position.x = 10;
      }

      // 渲染场景
      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return (
      <div ref={this.refContainer} className='character_scene'></div>
    );
  }
}

export default RunningCharacter;
