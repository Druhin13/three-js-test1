import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set camera to a reasonable default position
    camera.position.set(0, 0, 50);

    scene.add(new THREE.AmbientLight(0xffffff));  // Add soft white light to the scene

    let textMesh, loadedFont;
    const fontLoader = new FontLoader();

    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
        loadedFont = font;
        createTextMesh('Hello', loadedFont);  // Create initial text mesh
        animate();
    });

    function createTextMesh(text, font) {
        const geometry = new TextGeometry(text, {
            font: font,
            size: 10,
            height: 2
        });
        geometry.computeBoundingBox(); // Compute the bounding box to get the dimensions of the text
        const centerOffset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x); // Compute the offset to center the text
        geometry.translate(centerOffset, 0, 0); // Translate the geometry to center it
        const material = new THREE.MeshBasicMaterial({ color: 0xcacaca });
        textMesh = new THREE.Mesh(geometry, material);
        scene.add(textMesh);
    }
    

    function animate() {
        requestAnimationFrame(animate);
    
        // Rotate the text mesh slowly on the X-axis
        if (textMesh) {
            textMesh.rotation.y += 0.005; // Adjust the rotation speed as needed
        }
    
        // Render the scene
        renderer.render(scene, camera);
    }
    
    

    document.getElementById('send-button').addEventListener('click', () => {
        const userText = document.getElementById('text-input').value;
        updateText(userText);
    });

    function updateText(newText) {
        if (textMesh && newText && loadedFont) {
            scene.remove(textMesh);
            textMesh.geometry.dispose();
            createTextMesh(newText, loadedFont);
        }
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;  // Enable smooth damping (inertia) effect
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();
});






// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// document.addEventListener('DOMContentLoaded', () => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const fontLoader = new FontLoader();
//     fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
//         const textGeometry = new TextGeometry('0000 0000 0000 0000', {
//             font: font,
//             size: 2,
//             height: 0.1
//         });
//         const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
//         const textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         scene.add(textMesh);

//         const controls = new OrbitControls(camera, renderer.domElement);
//         camera.position.set(0, 0, 100);

//         function animate() {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         }
//         animate();
//     });
// });

