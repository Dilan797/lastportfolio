// app.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {
    applyArmsCrossed,       // Función consolidada para brazos cruzados
    applyArmsCrossedFixed,  // Función específica (mantener para compatibilidad)
    applyArmsCrossedChest,  // Función específica
    applySmile,             // Función de sonrisa mejorada
    applyExpression,        // Sistema general de expresiones
    debugListBones,         // Para depuración
    resetPose              // Para resetear la pose
} from './pose.js';

const MODEL_URL = './assets/avatar.glb';
const container = document.getElementById('stage');
const HUD = document.getElementById('hud');
const log = (m)=>{ console.log(m); if (HUD) HUD.textContent = m; };

// Función para calcular parámetros de cámara según tamaño de pantalla
// Ajustado para el nuevo layout de dos columnas
function getCameraSettings() {
    const width = window.innerWidth;

    if (width >= 1024) {
        // Desktop: layout de dos columnas, aspect ratio 4:5
        return { fov: 30, position: [0, 1.4, 2.2] };
    } else {
        // Móviles/tablets: layout vertical, aspect ratio 1:1
        return { fov: 35, position: [0, 1.35, 1.8] };
    }
}

// Escena básica
const scene = new THREE.Scene();
scene.background = null;
const settings = getCameraSettings();
const camera = new THREE.PerspectiveCamera(settings.fov, container.clientWidth/container.clientHeight, 0.1, 100);
camera.position.set(...settings.position);

const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
// Optimizar pixelRatio: limitar a 1.5 en móviles para mejor performance
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Luces
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
scene.add(new THREE.HemisphereLight(0xffffff,0x334466,0.5));

const key = new THREE.DirectionalLight(0xffffff, 1.0);
key.position.set(3,4,5);
key.castShadow = true;
// Mejorar calidad de sombras (2048 en desktop, 1024 en móvil)
key.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048);
key.shadow.camera.near = 0.1;
key.shadow.camera.far = 20;
key.shadow.bias = -0.001; // Prevenir shadow acne
scene.add(key);
const rim = new THREE.DirectionalLight(0x88aaff,.35); 
rim.position.set(-4,2.5,-2); 
scene.add(rim);
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10), 
    new THREE.ShadowMaterial({opacity:.35})
);
ground.rotation.x = -Math.PI/2; 
ground.position.y = -1.2; 
ground.receiveShadow = true; 
scene.add(ground);

// Loaders (compat con Draco/KTX2/Meshopt)
const draco = new DRACOLoader(); 
draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/libs/draco/');
const ktx2  = new KTX2Loader();  
ktx2.setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/libs/basis/'); 
ktx2.detectSupport(renderer);
const loader = new GLTFLoader(); 
loader.setDRACOLoader(draco); 
loader.setKTX2Loader(ktx2); 
loader.setMeshoptDecoder(MeshoptDecoder);

// Verifica ruta y manejo de errores mejorado
try {
    const head = await fetch(MODEL_URL, { method: 'HEAD' });
    if (!head.ok) {
        const errorMessages = {
            404: 'Modelo no encontrado. Verifica la ruta.',
            403: 'Acceso denegado al modelo.',
            500: 'Error del servidor al cargar el modelo.'
        };
        const message = errorMessages[head.status] || `Error HTTP ${head.status}`;
        throw new Error(message);
    }
    log('Modelo encontrado. Cargando…');
} catch (e) {
    const errorMsg = `❌ ${e.message}`;
    log(errorMsg);
    console.error('Error completo:', e);
    // Cambiar estilo del HUD para errores
    if (HUD) {
        HUD.style.background = 'rgba(255, 50, 50, 0.85)';
        HUD.style.color = 'white';
        HUD.style.fontWeight = '600';
    }
    throw e;
}

// Carga del GLB
let model = new THREE.Group();
loader.load(
    MODEL_URL,
    (gltf) => {
        model = gltf.scene;
        model.traverse(o => { 
            if (o.isMesh) { 
                o.castShadow = true; 
                o.receiveShadow = true; 
            }
        });
        
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        // Escala reducida para la tarjeta de presentación
        // ESCALA AUMENTADA para que el avatar ocupe mejor el espacio
        const width = window.innerWidth;
        let scaleMultiplier = 1.89; // Más grande en móvil (aumentado 5%)

        if (width >= 1024) {
            scaleMultiplier = 1.89; // Más grande en desktop (aumentado 5%)
        }

        model.scale.setScalar(scaleMultiplier / Math.max(size.y, 0.001));
        model.position.y = -0.20; // Ligeramente más arriba
        scene.add(model);
        log('✔️ Listo');

        // Auto-hide HUD después de 2 segundos
        setTimeout(() => {
            if (HUD) {
                HUD.style.transition = 'opacity 0.5s ease';
                HUD.style.opacity = '0';
                // Remover del DOM después de la animación
                setTimeout(() => {
                    if (HUD.style.opacity === '0') {
                        HUD.style.display = 'none';
                    }
                }, 500);
            }
        }, 2000);

        // ========== APLICAR POSES ==========
        // Usar la función corregida
        applyArmsCrossedFixed(model, {
            tightness: 0.8,
            debug: false  // Cambiar a true para ver información de debug
        });
        applySmile(model, 0.4);
        
        // Opcional: Mostrar información de huesos
        // debugListBones(model);
    },
    (e) => { 
        if (e.total) log(`Cargando: ${Math.round(e.loaded/e.total*100)}%`); 
    },
    (err) => { 
        log(`Error GLB: ${err?.message || err}`); 
    }
);

// ========== INTERACCIÓN CON MOUSE ==========
let mouseX = 0;
let targetRotationY = 0;
const rotationSpeed = 0.3;
const smoothing = 0.05;

// Seguimiento del mouse para rotación suave
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    targetRotationY = mouseX * rotationSpeed;
});

// Resetear rotación cuando el mouse sale del contenedor
container.addEventListener('mouseleave', () => {
    targetRotationY = 0;
});

// ========== RENDER CON PAUSE/RESUME ==========
let isPlaying = true;

function animate(){
    if (!isPlaying) return;
    requestAnimationFrame(animate);

    // Rotación suave del modelo con el mouse
    if (model && model.children.length > 0) {
        model.rotation.y += (targetRotationY - model.rotation.y) * smoothing;
    }

    renderer.render(scene, camera);
}
animate();

// Pausar/reanudar cuando el tab no está visible (ahorra batería y recursos)
document.addEventListener('visibilitychange', () => {
    isPlaying = !document.hidden;
    if (isPlaying) {
        console.log('🎬 Reanudando animación...');
        animate();
    } else {
        console.log('⏸️ Pausando animación (tab no visible)');
    }
});

addEventListener('resize', () => {
    const w = container.clientWidth, h = container.clientHeight;
    const settings = getCameraSettings();

    // Actualizar FOV y posición según el tamaño de pantalla
    camera.fov = settings.fov;
    camera.position.set(...settings.position);

    camera.aspect = w/h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});

// ========== CLEANUP DE MEMORIA ==========
// Liberar recursos cuando se cierra la página
window.addEventListener('beforeunload', () => {
    console.log('🧹 Limpiando recursos...');

    // Limpiar renderer
    renderer.dispose();

    // Limpiar geometrías, materiales y texturas
    scene.traverse(object => {
        if (object.geometry) {
            object.geometry.dispose();
        }
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => disposeMaterial(material));
            } else {
                disposeMaterial(object.material);
            }
        }
    });

    // Limpiar loaders
    draco.dispose();
    ktx2.dispose();
});

// Función auxiliar para limpiar materiales
function disposeMaterial(material) {
    if (!material) return;

    // Limpiar todas las texturas del material
    Object.keys(material).forEach(prop => {
        if (material[prop] && typeof material[prop].dispose === 'function') {
            material[prop].dispose();
        }
    });

    material.dispose();
}

// ========== CONTROLES DE TECLADO MEJORADOS ==========
document.addEventListener('keydown', (e) => {
    if (!model) return;

    switch(e.key) {
        // Poses de brazos
        case '1':
            console.log('⚡ Tecla 1: Pose Fixed');
            resetPose(model);
            applyArmsCrossed(model, { style: 'fixed', tightness: 0.8 });
            break;
        case '2':
            console.log('⚡ Tecla 2: Pose Chest');
            resetPose(model);
            applyArmsCrossed(model, { style: 'chest', tightness: 0.8 });
            break;
        case '3':
            console.log('⚡ Tecla 3: Pose Casual');
            resetPose(model);
            applyArmsCrossed(model, { style: 'casual', tightness: 0.7 });
            break;

        // Expresiones faciales
        case 's':
            console.log('😊 Tecla S: Sonrisa');
            applyExpression(model, 'smile', 0.7);
            break;
        case 'h':
            console.log('😮 Tecla H: Sorpresa');
            applyExpression(model, 'surprised', 0.8);
            break;
        case 't':
            console.log('🤔 Tecla T: Pensando');
            applyExpression(model, 'thinking', 0.6);
            break;
        case 'c':
            console.log('😎 Tecla C: Confiado');
            applyExpression(model, 'confident', 0.7);
            break;

        // Utilidades
        case 'r':
        case 'R':
            console.log('🔄 Tecla R: Reset completo');
            resetPose(model);
            applyExpression(model, 'neutral');
            break;
        case 'd':
        case 'D':
            console.log('🔍 Tecla D: Debug huesos');
            debugListBones(model);
            break;
    }
});

// Mostrar instrucciones mejoradas en consola
console.log('%c🎮 CONTROLES DEL AVATAR', 'color: #00ff00; font-weight: bold; font-size: 14px');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00ff00');
console.log('%cPOSES DE BRAZOS:', 'color: #88aaff; font-weight: bold');
console.log('  1 → Brazos cruzados (Fixed)');
console.log('  2 → Brazos cruzados (Chest)');
console.log('  3 → Brazos cruzados (Casual)');
console.log('');
console.log('%cEXPRESIONES FACIALES:', 'color: #88aaff; font-weight: bold');
console.log('  S → Sonrisa 😊');
console.log('  H → Sorpresa 😮');
console.log('  T → Pensando 🤔');
console.log('  C → Confiado 😎');
console.log('');
console.log('%cUTILIDADES:', 'color: #88aaff; font-weight: bold');
console.log('  R → Reset completo');
console.log('  D → Debug (ver huesos)');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00ff00');
console.log('%c💡 Mueve el mouse sobre el avatar para rotarlo', 'color: #ffa500; font-style: italic');