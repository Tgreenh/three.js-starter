import * as THREE from "three";

import "./style.css";

const main = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#three-canvas")!;
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const lightColor = 0xffffff;
  const lightIntensity = 3;
  const light = new THREE.DirectionalLight(lightColor, lightIntensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  };

  const render = (time: number) => {
    // Time in seconds
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

main();
