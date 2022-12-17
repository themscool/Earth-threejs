import * as THREE from 'three';
import '/style.css';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//scene

const scene = new THREE.Scene();


//create an object sphere

const geometry = new THREE.SphereGeometry(3, 64, 64)

const material = new THREE.MeshStandardMaterial({
    color: '#ffff83',
})

//mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)


//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//light 

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
light.intensity = 1.25
scene.add(light)

//camera 

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 20
scene.add(camera)


// render

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true


// responsive resize

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();


//Timeline magiccc
//Timeline magiccc
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
tl.fromTo(".header", { y: "-100%" }, { y: "0%" })
tl.fromTo(".banner-title", { opacity: 0 }, { opacity: 1 })



let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width)*255),
            Math.round((e.pageY / sizes.height)*255),
            150,
        ]

      let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color,{
            r:newColor.r,
            g:newColor.g,
            b:newColor.b,
        })
    }
})


