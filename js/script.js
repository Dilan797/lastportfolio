// script.js — Avatar 3D optimizado
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import {
    applyArmsCrossedFixed,
    applyArmsCrossed,
    applySmile,
    applyExpression,
    debugListBones,
    resetPose
} from './pose.js';

const MODEL_URL = './assets/avatar.glb';
const container = document.getElementById('stage');
const HUD = document.getElementById('hud');
const log = (m) => { console.log(m); if (HUD) HUD.textContent = m; };

// Detección de dispositivo — una sola vez
const isMobile = window.matchMedia('(max-width: 1023px)').matches
    || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

function getCameraSettings() {
    if (window.innerWidth >= 1024) {
        return { fov: 30, position: [0, 1.4, 2.2] };
    }
    return { fov: 35, position: [0, 1.35, 1.8] };
}

// ========== ESCENA ==========
const scene = new THREE.Scene();
scene.background = null;

const settings = getCameraSettings();
const camera = new THREE.PerspectiveCamera(
    settings.fov,
    container.clientWidth / container.clientHeight,
    0.1, 50 // far plane reducido: el modelo nunca está a más de 5 unidades
);
camera.position.set(...settings.position);

const renderer = new THREE.WebGLRenderer({
    antialias: !isMobile, // desactivar antialiasing en mobile
    alpha: true,
    powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

// Sombras solo en desktop — ahorro significativo de GPU en mobile
if (!isMobile) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

container.appendChild(renderer.domElement);

// ========== LUCES (simplificadas en mobile) ==========
scene.add(new THREE.AmbientLight(0xffffff, isMobile ? 0.6 : 0.4));
scene.add(new THREE.HemisphereLight(0xffffff, 0x334466, 0.5));

const key = new THREE.DirectionalLight(0xffffff, 1.0);
key.position.set(3, 4, 5);

if (!isMobile) {
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far = 20;
    key.shadow.bias = -0.001;
}
scene.add(key);

const rim = new THREE.DirectionalLight(0x88aaff, 0.35);
rim.position.set(-4, 2.5, -2);
scene.add(rim);

if (!isMobile) {
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.ShadowMaterial({ opacity: 0.35 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.2;
    ground.receiveShadow = true;
    scene.add(ground);
}

// ========== LOADERS ==========
const draco = new DRACOLoader();
draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/libs/draco/');

const ktx2 = new KTX2Loader();
ktx2.setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/libs/basis/');
ktx2.detectSupport(renderer);

const loader = new GLTFLoader();
loader.setDRACOLoader(draco);
loader.setKTX2Loader(ktx2);
loader.setMeshoptDecoder(MeshoptDecoder);

// ========== CARGA DEL MODELO (sin HEAD preflight) ==========
log('Cargando modelo…');

let model = new THREE.Group();
loader.load(
    MODEL_URL,
    (gltf) => {
        model = gltf.scene;

        // Configurar meshes — skip sombras en mobile
        model.traverse(o => {
            if (o.isMesh) {
                if (!isMobile) {
                    o.castShadow = true;
                    o.receiveShadow = true;
                }
                // Frustum culling siempre activo
                o.frustumCulled = true;
            }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const scaleMultiplier = 1.89;
        model.scale.setScalar(scaleMultiplier / Math.max(size.y, 0.001));
        model.position.y = -0.20;
        scene.add(model);
        log('Listo');

        // Auto-hide HUD
        setTimeout(() => {
            if (HUD) {
                HUD.style.transition = 'opacity 0.5s ease';
                HUD.style.opacity = '0';
                setTimeout(() => {
                    if (HUD && HUD.style.opacity === '0') HUD.style.display = 'none';
                }, 500);
            }
        }, 1500);

        // Aplicar pose y expresión
        applyArmsCrossedFixed(model, { tightness: 0.8 });
        applySmile(model, 0.4);
    },
    (e) => {
        if (e.total) log(`Cargando: ${Math.round(e.loaded / e.total * 100)}%`);
    },
    (err) => {
        log(`Error: ${err?.message || err}`);
        if (HUD) {
            HUD.style.background = 'rgba(255, 50, 50, 0.85)';
            HUD.style.fontWeight = '600';
        }
    }
);

// ========== INTERACCIÓN CON MOUSE ==========
let targetRotationY = 0;
const smoothing = 0.08; // más rápido que 0.05

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    targetRotationY = mouseX * 0.3;
}, { passive: true });

container.addEventListener('mouseleave', () => {
    targetRotationY = 0;
}, { passive: true });

// ========== RENDER LOOP ==========
let isPlaying = true;

function animate() {
    if (!isPlaying) return;
    requestAnimationFrame(animate);

    if (model && model.children.length > 0) {
        model.rotation.y += (targetRotationY - model.rotation.y) * smoothing;
    }

    renderer.render(scene, camera);
}
animate();

// Pause/resume en visibilidad
document.addEventListener('visibilitychange', () => {
    isPlaying = !document.hidden;
    if (isPlaying) animate();
});

// ========== RESIZE (debounced) ==========
let resizeTimer;
addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const s = getCameraSettings();
        camera.fov = s.fov;
        camera.position.set(...s.position);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }, 150);
});

// ========== CLEANUP ==========
window.addEventListener('beforeunload', () => {
    renderer.dispose();
    scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach(mat => {
                Object.values(mat).forEach(val => {
                    if (val && typeof val.dispose === 'function') val.dispose();
                });
                mat.dispose();
            });
        }
    });
    draco.dispose();
    ktx2.dispose();
});

// ========== CONTROLES DE TECLADO ==========
document.addEventListener('keydown', (e) => {
    if (!model) return;

    switch (e.key) {
        case '1': resetPose(model); applyArmsCrossed(model, { style: 'fixed', tightness: 0.8 }); break;
        case '2': resetPose(model); applyArmsCrossed(model, { style: 'chest', tightness: 0.8 }); break;
        case '3': resetPose(model); applyArmsCrossed(model, { style: 'casual', tightness: 0.7 }); break;
        case 's': applyExpression(model, 'smile', 0.7); break;
        case 'h': applyExpression(model, 'surprised', 0.8); break;
        case 't': applyExpression(model, 'thinking', 0.6); break;
        case 'c': applyExpression(model, 'confident', 0.7); break;
        case 'r': case 'R': resetPose(model); applyExpression(model, 'neutral'); break;
        case 'd': case 'D': debugListBones(model); break;
    }
});
