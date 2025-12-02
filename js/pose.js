

// pose.js
import * as THREE from 'three';

// ===== UTILIDADES =====
function bone(S, names){ 
    return S.bones.find(b => names.some(n => b.name.toLowerCase().includes(n))); 
}
const d = THREE.MathUtils.degToRad;

/**
 * Sonrisa mejorada con más blendshapes (si existen en el GLB)
 */
export function applySmile(root, intensity = 0.6){
    root.traverse(o => {
        if (o.isMesh && o.morphTargetDictionary){
            const dict = o.morphTargetDictionary;
            const infl = o.morphTargetInfluences;
            const keys = Object.keys(dict);

            // Helper para aplicar valores a blendshapes
            const set = (needle, v) => keys.forEach(k => {
                if (k.toLowerCase().includes(needle)) infl[dict[k]] = v;
            });

            // Aplicar blendshapes de sonrisa
            set('smile', intensity);
            set('mouthsmile', intensity);
            set('cheek', intensity * 0.3);
            set('eyesquint', intensity * 0.2);
            set('jawopen', 0.10);

            // Blendshapes adicionales para sonrisa más natural
            set('browinner', intensity * 0.15);
            set('browouter', intensity * 0.10);
            set('mouthdimple', intensity * 0.4);
            set('nosesneer', intensity * 0.05);
        }
    });
}

/**
 * Sistema general de expresiones faciales
 * @param {Object} root - El modelo 3D
 * @param {string} expression - Tipo de expresión: 'smile', 'surprised', 'thinking', 'confident', 'neutral'
 * @param {number} intensity - Intensidad de la expresión (0-1)
 */
export function applyExpression(root, expression = 'smile', intensity = 0.6) {
    // Configuraciones predefinidas para cada expresión
    const expressions = {
        smile: {
            smile: 1.0,
            mouthsmile: 1.0,
            cheek: 0.3,
            eyesquint: 0.2,
            browinner: 0.15,
            mouthdimple: 0.4
        },
        surprised: {
            eyewide: 1.0,
            browinner: 0.8,
            browouter: 0.8,
            mouthopen: 0.5,
            jawopen: 0.6
        },
        thinking: {
            eyesquint: 0.3,
            browinner: 0.4,
            mouthleft: 0.2,
            mouthright: 0.1,
            eyenarrow: 0.2
        },
        confident: {
            smile: 0.3,
            eyesquint: 0.1,
            browinner: 0.1,
            cheek: 0.15
        },
        neutral: {
            // Resetear todo a 0
        }
    };

    const config = expressions[expression] || expressions.smile;

    root.traverse(o => {
        if (o.isMesh && o.morphTargetDictionary) {
            const dict = o.morphTargetDictionary;
            const infl = o.morphTargetInfluences;
            const keys = Object.keys(dict);

            // Si es neutral, resetear todos los blendshapes
            if (expression === 'neutral') {
                keys.forEach(k => {
                    if (dict[k] !== undefined) infl[dict[k]] = 0;
                });
                return;
            }

            // Aplicar configuración de la expresión
            Object.entries(config).forEach(([shapeName, value]) => {
                keys.forEach(k => {
                    if (k.toLowerCase().includes(shapeName.toLowerCase())) {
                        infl[dict[k]] = value * intensity;
                    }
                });
            });
        }
    });
}

/**
 * Función consolidada para brazos cruzados
 * @param {Object} root - El modelo 3D
 * @param {Object} opts - Opciones { style, tightness, debug }
 *   - style: 'fixed' (default), 'casual', 'chest', 'front'
 *   - tightness: 0-1 (qué tan apretados están los brazos)
 *   - debug: boolean (mostrar información de debug)
 */
export function applyArmsCrossed(root, opts = {}) {
    const style = opts.style || 'fixed';

    switch(style) {
        case 'casual':
            return applyArmsCrossedCasual(root, opts);
        case 'chest':
            return applyArmsCrossedChest(root, opts);
        case 'front':
            return applyArmsCrossedFront(root, opts);
        case 'fixed':
        default:
            return applyArmsCrossedFixed(root, opts);
    }
}

/**
 * Brazos cruzados al frente - Versión original
 */
export function applyArmsCrossedFront(root, opts = {}){
    const profile = opts.profile || 'default';
    const tight = THREE.MathUtils.clamp(opts.tightness ?? 0.8, 0, 1);
    const debug = opts.debug || false;

    let skinned = null;
    root.traverse(o => { 
        if (!skinned && o.isSkinnedMesh) skinned = o; 
    });
    if (!skinned) {
        console.warn("No se encontró SkinnedMesh");
        return;
    }

    const S = skinned.skeleton;
    
    const LClav = bone(S, ['leftshoulder','leftclav','clavicle_l','collar_l','l_shoulder']);
    const RClav = bone(S, ['rightshoulder','rightclav','clavicle_r','collar_r','r_shoulder']);
    const LArm  = bone(S, ['leftarm','upperarm_l','leftupperarm','arm_l','l_upperarm','mixamorigleftarm']);
    const RArm  = bone(S, ['rightarm','upperarm_r','rightupperarm','arm_r','r_upperarm','mixamorigrightarm']);
    const LFore = bone(S, ['leftforearm','lowerarm_l','leftlowerarm','forearm_l','l_forearm','mixamorigleftforearm']);
    const RFore = bone(S, ['rightforearm','lowerarm_r','rightlowerarm','forearm_r','r_forearm','mixamorigrightforearm']);
    const LHand = bone(S, ['lefthand','hand_l','l_hand','mixamoriglefthand']);
    const RHand = bone(S, ['righthand','hand_r','r_hand','mixamorigrighthand']);
    const Spine = bone(S, ['spine2','spine1','spine','chest']);
    const Neck  = bone(S, ['neck']);
    const Head  = bone(S, ['head']);

    if (debug) {
        console.log("Huesos encontrados:", {
            LArm: LArm?.name,
            RArm: RArm?.name,
            LFore: LFore?.name,
            RFore: RFore?.name,
            LHand: LHand?.name,
            RHand: RHand?.name
        });
    }

    // Resetear rotaciones
    [LClav, RClav, LArm, RArm, LFore, RFore, LHand, RHand].forEach(bone => {
        if (bone) {
            bone.rotation.x = 0;
            bone.rotation.y = 0;
            bone.rotation.z = 0;
        }
    });

    // Postura general
    if (Spine) Spine.rotation.x = d(3);
    if (Neck) Neck.rotation.x = d(-3);
    if (Head) Head.rotation.y = d(0);

    // Clavículas
    if (LClav) {
        LClav.rotation.x = d(10);
        LClav.rotation.y = d(5);
        LClav.rotation.z = d(-5);
    }
    if (RClav) {
        RClav.rotation.x = d(10);
        RClav.rotation.y = d(-5);
        RClav.rotation.z = d(5);
    }

    // Upper arms - BAJAR los brazos y traer al frente
    if (LArm) {
        LArm.rotation.x = d(-20);   // Bajar el brazo
        LArm.rotation.y = d(0);     
        LArm.rotation.z = d(45);    // Hacia el centro
    }
    if (RArm) {
        RArm.rotation.x = d(-20);   
        RArm.rotation.y = d(0);     
        RArm.rotation.z = d(-45);   
    }

    // Forearms - doblar codos para cruzar
    if (LFore) {
        LFore.rotation.x = d(0);    
        LFore.rotation.y = d(-90);  
        LFore.rotation.z = d(20);   
    }
    if (RFore) {
        RFore.rotation.x = d(0);    
        RFore.rotation.y = d(90);   
        RFore.rotation.z = d(-20);  
    }

    // Manos
    if (LHand) {
        LHand.rotation.x = d(10);
        LHand.rotation.y = d(0);
        LHand.rotation.z = d(-10);
    }
    if (RHand) {
        RHand.rotation.x = d(10);
        RHand.rotation.y = d(0);
        RHand.rotation.z = d(10);
    }

    if (tight > 0.5) {
        if (LFore) LFore.rotation.y = d(-90 - (tight - 0.5) * 20);
        if (RFore) RFore.rotation.y = d(90 + (tight - 0.5) * 20);
    }
}

/**
 * Versión alternativa: Brazos cruzados estilo casual
 */
export function applyArmsCrossedCasual(root, opts = {}) {
    const tight = THREE.MathUtils.clamp(opts.tightness ?? 0.7, 0, 1);
    
    let skinned = null;
    root.traverse(o => { 
        if (!skinned && o.isSkinnedMesh) skinned = o; 
    });
    if (!skinned) return;

    const S = skinned.skeleton;
    
    const LArm  = bone(S, ['leftarm','upperarm_l','leftupperarm','mixamorigleftarm']);
    const RArm  = bone(S, ['rightarm','upperarm_r','rightupperarm','mixamorigrightarm']);
    const LFore = bone(S, ['leftforearm','lowerarm_l','leftlowerarm','mixamorigleftforearm']);
    const RFore = bone(S, ['rightforearm','lowerarm_r','rightlowerarm','mixamorigrightforearm']);
    const LHand = bone(S, ['lefthand','hand_l','mixamoriglefthand']);
    const RHand = bone(S, ['righthand','hand_r','mixamorigrighthand']);

    // Resetear
    [LArm, RArm, LFore, RFore, LHand, RHand].forEach(bone => {
        if (bone) {
            bone.rotation.x = 0;
            bone.rotation.y = 0;
            bone.rotation.z = 0;
        }
    });

    // Brazos más bajos
    if (LArm) {
        LArm.rotation.x = d(45);
        LArm.rotation.y = d(20);
        LArm.rotation.z = d(-30);
    }
    if (RArm) {
        RArm.rotation.x = d(45);
        RArm.rotation.y = d(-20);
        RArm.rotation.z = d(30);
    }

    // Forearms con flexión
    if (LFore) {
        LFore.rotation.x = d(-40);
        LFore.rotation.y = d(70);
        LFore.rotation.z = d(0);
    }
    if (RFore) {
        RFore.rotation.x = d(-40);
        RFore.rotation.y = d(-70);
        RFore.rotation.z = d(0);
    }

    // Manos
    if (LHand) {
        LHand.rotation.x = d(5);
        LHand.rotation.y = d(10);
        LHand.rotation.z = d(0);
    }
    if (RHand) {
        RHand.rotation.x = d(5);
        RHand.rotation.y = d(-10);
        RHand.rotation.z = d(0);
    }
}

/**
 * VERSIÓN CORREGIDA: Brazos cruzados al nivel del pecho
 */
export function applyArmsCrossedFixed(root, opts = {}) {
    const tight = THREE.MathUtils.clamp(opts.tightness ?? 0.8, 0, 1);
    const debug = opts.debug || false;
    
    let skinned = null;
    root.traverse(o => { 
        if (!skinned && o.isSkinnedMesh) skinned = o; 
    });
    if (!skinned) {
        console.warn("No se encontró SkinnedMesh");
        return;
    }

    const S = skinned.skeleton;
    
    const LArm  = bone(S, ['leftarm','upperarm_l','leftupperarm','arm_l','l_upperarm','mixamorigleftarm']);
    const RArm  = bone(S, ['rightarm','upperarm_r','rightupperarm','arm_r','r_upperarm','mixamorigrightarm']);
    const LFore = bone(S, ['leftforearm','lowerarm_l','leftlowerarm','forearm_l','l_forearm','mixamorigleftforearm']);
    const RFore = bone(S, ['rightforearm','lowerarm_r','rightlowerarm','forearm_r','r_forearm','mixamorigrightforearm']);
    const LHand = bone(S, ['lefthand','hand_l','l_hand','mixamoriglefthand']);
    const RHand = bone(S, ['righthand','hand_r','r_hand','mixamorigrighthand']);

    if (debug) {
        console.log("Aplicando pose FIXED - Huesos:", {
            LArm: LArm?.name,
            RArm: RArm?.name,
            LFore: LFore?.name,
            RFore: RFore?.name
        });
    }

    // Resetear todo primero
    [LArm, RArm, LFore, RFore, LHand, RHand].forEach(bone => {
        if (bone) {
            bone.rotation.x = 0;
            bone.rotation.y = 0;
            bone.rotation.z = 0;
        }
    });

    // CONFIGURACIÓN FINAL: Bajar brazos al pecho y cruzarlos
    
    // Upper arms - BAJAR COMPLETAMENTE al nivel del pecho
    if (LArm) {
        LArm.rotation.x = d(-55);  // Bajar brazos al nivel del pecho
        LArm.rotation.y = d(15);    // Hacia adentro para preparar el cruce
        LArm.rotation.z = d(135);    // Ligeramente hacia adelante
    }
    if (RArm) {
        RArm.rotation.x = d(-55);  // Bajar brazos al nivel del pecho
        RArm.rotation.y = d(-15);   // Hacia adentro para preparar el cruce
        RArm.rotation.z = d(-135);   // Ligeramente hacia adelante
    }

    // Forearms - mantener el cruce horizontal
    if (LFore) {
        LFore.rotation.x = d(15);   // Ligero ajuste
        LFore.rotation.y = d(55);   // Cruzar hacia la derecha
        LFore.rotation.z = d(-85);  // Ajustar para posición horizontal
    }
    if (RFore) {
        RFore.rotation.x = d(30);   // Ligero ajuste
        RFore.rotation.y = d(-55);  // Cruzar hacia la izquierda
        RFore.rotation.z = d(85);   // Ajustar para posición horizontal
    }

    // Manos - posición relajada
    if (LHand) {
        LHand.rotation.x = d(-10);
        LHand.rotation.y = d(150);
        LHand.rotation.z = d(0);
    }
    if (RHand) {
        RHand.rotation.x = d(-10);
        RHand.rotation.y = d(-130);
        RHand.rotation.z = d(0);
    }

    // Ajuste por intensidad
    if (tight > 0.5) {
        if (LFore) LFore.rotation.y = d(85 + (tight - 0.5) * 15);
        if (RFore) RFore.rotation.y = d(-85 - (tight - 0.5) * 15);
    }
}

/**
 * Nueva versión: Brazos horizontales al pecho (más simple)
 */
export function applyArmsCrossedChest(root, opts = {}) {
    const tight = THREE.MathUtils.clamp(opts.tightness ?? 0.8, 0, 1);
    const debug = opts.debug || false;
    
    let skinned = null;
    root.traverse(o => { 
        if (!skinned && o.isSkinnedMesh) skinned = o; 
    });
    if (!skinned) return;

    const S = skinned.skeleton;
    
    const LArm  = bone(S, ['leftarm','upperarm_l','leftupperarm','arm_l','l_upperarm','mixamorigleftarm']);
    const RArm  = bone(S, ['rightarm','upperarm_r','rightupperarm','arm_r','r_upperarm','mixamorigrightarm']);
    const LFore = bone(S, ['leftforearm','lowerarm_l','leftlowerarm','forearm_l','l_forearm','mixamorigleftforearm']);
    const RFore = bone(S, ['rightforearm','lowerarm_r','rightlowerarm','forearm_r','r_forearm','mixamorigrightforearm']);
    const LHand = bone(S, ['lefthand','hand_l','l_hand','mixamoriglefthand']);
    const RHand = bone(S, ['righthand','hand_r','r_hand','mixamorigrighthand']);

    // Resetear
    [LArm, RArm, LFore, RFore, LHand, RHand].forEach(bone => {
        if (bone) {
            bone.rotation.set(0, 0, 0);
        }
    });

    // Configuración simple: brazos horizontales al frente
    if (LArm) {
        LArm.rotation.x = d(-90);   // Brazos horizontales al frente
        LArm.rotation.y = d(30);    // Hacia adentro
        LArm.rotation.z = d(0);     // Sin rotación lateral
    }
    if (RArm) {
        RArm.rotation.x = d(-90);   // Brazos horizontales al frente
        RArm.rotation.y = d(-30);   // Hacia adentro
        RArm.rotation.z = d(0);     // Sin rotación lateral
    }

    // Forearms - cruce simple
    if (LFore) {
        LFore.rotation.x = d(0);    
        LFore.rotation.y = d(75);   // Cruzar
        LFore.rotation.z = d(0);    
    }
    if (RFore) {
        RFore.rotation.x = d(0);    
        RFore.rotation.y = d(-75);  // Cruzar
        RFore.rotation.z = d(0);    
    }

    // Manos
    if (LHand) {
        LHand.rotation.x = d(0);
        LHand.rotation.y = d(20);
        LHand.rotation.z = d(0);
    }
    if (RHand) {
        RHand.rotation.x = d(0);
        RHand.rotation.y = d(-20);
        RHand.rotation.z = d(0);
    }
}

/**
 * Función de depuración: lista todos los huesos
 */
export function debugListBones(root) {
    console.log("=== DEPURACIÓN DE HUESOS ===");
    let found = false;
    root.traverse(o => {
        if (o.isSkinnedMesh && o.skeleton) {
            found = true;
            console.log("SkinnedMesh encontrado:", o.name);
            console.log("Huesos disponibles:");
            o.skeleton.bones.forEach((bone, i) => {
                console.log(`  ${i}: ${bone.name}`);
            });
        }
    });
    if (!found) {
        console.log("No se encontró ningún SkinnedMesh en el modelo");
    }
}

/**
 * Resetear pose a posición neutral
 */
export function resetPose(root) {
    root.traverse(o => {
        if (o.isBone) {
            o.rotation.set(0, 0, 0);
            o.position.set(0, 0, 0);
            o.scale.set(1, 1, 1);
        }
    });
    console.log('Pose reseteada a neutral');
}

/**
 * Versión animada con tween
 */
export function tweenArmsCrossed(viewer, opts = {}){
    const { model, addUpdate, removeUpdate } = viewer;
    if (!model) return;
    
    const bones = [];
    model.traverse(o => { 
        if (o.isBone) bones.push(o); 
    });
    const initial = bones.map(b => b.quaternion.clone());

    applyArmsCrossedFixed(model, opts);

    const target = bones.map(b => b.quaternion.clone());
    bones.forEach((b, i) => b.quaternion.copy(initial[i]));

    const dur = Math.max(opts.duration ?? 0.25, 0.1);
    const t0 = performance.now();
    const upd = () => {
        const t = Math.min((performance.now() - t0) / (dur * 1000), 1);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        bones.forEach((b, i) => {
            THREE.Quaternion.slerp(initial[i], target[i], b.quaternion, eased);
        });
        if (t >= 1) removeUpdate(upd);
    };
    addUpdate(upd);
}