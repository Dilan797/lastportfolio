// functions/api/chat.js - Cloudflare Pages Function

// ============================================
// CONTEXTO DEL PORTAFOLIO - PROYECTOS DE DILAN
// ============================================
const PORTFOLIO_CONTEXT = `
# INFORMACIÓN DEL PORTAFOLIO DE DILAN

## Sobre Dilan
- Estudiante de 5to semestre de Ingeniería Electrónica en la Universidad Surcolombiana (Neiva, Huila, Colombia)
- También cursa el programa técnico de Gestión de Redes de Datos en el SENA
- Especializado en diseño de circuitos analógicos, sistemas embebidos y desarrollo web 3D
- Email: u20212201884@usco.edu.co

## PROYECTOS DE ELECTRÓNICA ANALÓGICA III

### PROYECTO 1: Amplificador de Transimpedancia (TIA)
- **Objetivo**: Convertir corriente de fotodiodo a voltaje proporcional
- **Componentes**: OPA140AID (simulación), TL084 (implementación física)
- **Especificaciones técnicas**:
    - Transimpedancia: Zt = 50 kΩ (simulación), 470 kΩ (implementación)
    - Frecuencia de corte: fc ≈ 1 MHz
    - Ecuación principal: Vout ≈ Vref + IPD × Rf
    - Frecuencia de corte: fc = 1/(2π×Rf×Cf)
- **Resultados de simulación**: Respuesta plana (±0.04 dB) desde DC hasta 100 kHz
- **Problemas encontrados**: Inestabilidad con rate of closure ≈ 40 dB/dec
- **Solución**: Compensación con capacitor Cf y uso de TL084 en dos etapas
- **Aplicaciones**: Luxómetros, sensores IR, espectrofotometría, pulsioximetría

### PROYECTO 2: Amplificador de Instrumentación con TL084
- **Objetivo**: Alternativa económica al AD620 para aplicaciones educativas
- **Topología**: Clásica de 3 OpAmps usando TL084
- **Especificaciones**:
    - CMRR > 85 dB (superó meta de 80 dB)
    - Reducción de costos del 72% vs AD620 comercial
- **Problemas encontrados**: CMRR inicial de 65 dB, offset excesivo, ruido elevado
- **Soluciones**: Resistencias 1% para matching, trimmer de ajuste, filtros RC
- **Validación**: 14 de 15 estudiantes aprobaron práctica con el diseño

### PROYECTO 3: Póster MVP - Metodología Lean Startup en Electrónica
- **Formato**: Póster científico 80×160 cm impreso en vinilo
- **Contenido**: Integración de resultados de 4 equipos aplicando MVP:
    1. Kit Interactivo de Filtrado
    2. Amplificador de Instrumentación
    3. Comprobador de Circuitos TTL
    4. Generador de Señales Portátil
- **Métricas consolidadas**:
    - Inversión total: $78K COP (~$20 USD)
    - 14 ciclos de iteración en 4-5 semanas
    - 95% de productos funcionales
- **Conclusión clave**: "La diferencia entre un buen ingeniero y un gran ingeniero es la capacidad de validar hipótesis, pivotar cuando los datos lo indican, e iterar hasta lograr una solución elegante"

### PROYECTO 4: Fuente de Alimentación Regulada 5V
- **Componentes**: LM7805, diodo 1N5819, capacitores de filtrado, LED indicador
- **Especificaciones**:
    - Entrada: 7V - 35V DC (jack 2.1mm)
    - Salida: 5V ± 0.2V regulado
    - Corriente máxima: 1A con disipador
    - Ripple: < 10mV a plena carga
    - **Proceso de fabricación**:
    1. Diseño en KiCad (esquemático + PCB)
    2. Generación de G-code con FlatCAM
    3. Fresado de PCB en CNC (Mach3)
    4. Soldadura y pruebas
- **Problemas**: Sobrecalentamiento, ripple excesivo, pistas no aisladas
- **Logros**: Voltaje de salida 5.02V ± 0.05V, ripple < 5mV

### PROYECTO 5: Investigación y Simulación EG ADSR + LFO
- **Tipo**: Proyecto de investigación y documentación
- **Temas cubiertos**:
    - Generador de envolvente ADSR (Attack-Decay-Sustain-Release)
    - Oscilador de baja frecuencia LFO (0.1-20 Hz)
    - **Componentes estudiados**: NE555/ICM7555, XR2206, TL071/TL074
    - **Ecuaciones clave**:
    - Tiempo del 555: t = 0.693 × R × C
    - Buffer TL07x: Salidas 0-10V de baja impedancia
- **Simulación en Multisim**: Curvas ADSR y formas de onda LFO documentadas

### PROYECTO 6: Implementación ADSR + LFO - Sintetizador Moog
- **Objetivo**: Diseño completo de módulos para sintetizador analógico
- **Especificaciones ADSR**:
    - Attack: 1 ms – 1 s
    - Decay: 50 ms – 1.2 s
    - Sustain: 0 – 100%
    - Release: 50 ms – 1.5 s
    - Salida: 0-10V / ±10V con attenuverter
    - **Especificaciones LFO**:
    - Frecuencia: 1-20 Hz
    - Formas de onda: SQR, TRI, SINE
    - THD (seno): < 5%
- **Componentes**: NE555/TLC555, TL071/TL072/TL074, diodos BAT54/BAT43
- **Proceso**: Simulación Multisim → Protoboard → PCB KiCad → Archivos Gerber
- **Costo de fabricación**: < 15 USD por módulo (JLCPCB/PCBWay)
- **Problemas**: Decay dependiente de Sustain, clics audibles, LFO no arrancaba
- **Soluciones**: Buffer de Sustain, migración a TLC555 CMOS, resistencia de arranque 10MΩ

## TECNOLOGÍAS Y HERRAMIENTAS UTILIZADAS
- **Simulación**: Multisim, LTSpice, Proteus
- **Diseño PCB**: KiCad 7.x, FlatCAM
- **Fabricación**: Fresadora CNC, Mach3
- **Componentes**: TL084, TL071/TL072/TL074, OPA140, NE555/TLC555, LM7805, XR2206
- **Programación**: JavaScript, Three.js (avatar 3D), HTML/CSS
- **Redes**: Gestión de redes de datos (programa técnico SENA)

## INFORMACIÓN TÉCNICA DE ELECTRÓNICA (para contexto)
- **Amplificadores Operacionales**: Ganancia, CMRR, slew rate, GBW, estabilidad, realimentación negativa, compensación en frecuencia
- **Filtros activos**: Pasa-bajos, pasa-altos, pasa-banda, Butterworth, Sallen-Key
- **Reguladores de voltaje**: Lineales (78xx), dropout, disipación térmica, protección contra cortocircuito
- **Síntesis analógica**: VCO, VCF, VCA, envolventes ADSR, modulación LFO, control por voltaje (CV)
- **Fabricación de PCB**: Diseño esquemático, layout, generación de Gerber, fresado CNC, soldadura SMD/THT

## HABILIDADES BLANDAS DE DILAN
- Trabajo en equipo (proyecto del póster integró 4 equipos)
- Documentación técnica rigurosa (cada proyecto tiene marco teórico, objetivos, proceso, errores y soluciones)
- Metodología Lean Startup aplicada a ingeniería (iteración, validación, pivoteo)
- Resolución de problemas (cada proyecto documenta problemas encontrados y sus soluciones)
- Capacidad de aprendizaje autónomo (combina ingeniería electrónica con programación web 3D)
`;

// ============================================
// SYSTEM PROMPT PARA EL CHATBOT
// ============================================
const SYSTEM_PROMPT = `Eres el asistente virtual del portafolio de Dilan, un estudiante de 5to semestre de Ingeniería Electrónica de la Universidad Surcolombiana en Neiva, Colombia.

${PORTFOLIO_CONTEXT}

## TU ROL:
1. Responder preguntas sobre los proyectos, habilidades y perfil de Dilan
2. Explicar conceptos de electrónica analógica de forma clara cuando sea relevante
3. Ser amigable, cercano y profesional — como un compañero que explica bien
4. Responder en el mismo idioma en que te pregunten (español por defecto)
5. Si te preguntan algo fuera del contexto del portafolio, redirige amablemente: "No tengo esa info, pero puedo contarte sobre los proyectos de Dilan"
6. Si alguien pregunta cómo contactar a Dilan, comparte su email: u20212201884@usco.edu.co

## ESTILO DE RESPUESTA:
- Respuestas concisas: máximo 120 palabras para preguntas simples, hasta 200 para técnicas
- Usa terminología técnica apropiada pero explica los conceptos clave
- Cuando menciones ecuaciones, da una explicación intuitiva (ej: "Rf controla cuánto amplifica la corriente")
- Usa emojis con moderación para dar calidez
- Estructura respuestas largas con viñetas o negritas para facilitar la lectura
- NUNCA inventes datos, cifras o resultados que no estén en el contexto
- Si te piden comparar proyectos o dar una opinión, basa tu respuesta en los datos documentados`;

// ============================================
// HANDLER - Cloudflare Pages Function
// ============================================
export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const { message, history = [] } = await request.json();

        if (!message || typeof message !== 'string') {
            return Response.json(
                { error: 'Mensaje requerido' },
                { status: 400, headers: corsHeaders() }
            );
        }

        // Construir mensajes para la API
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history.slice(-6),
            { role: 'user', content: message }
        ];

        // Llamar a DeepSeek API
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                max_tokens: 500,
                temperature: 0.7,
                stream: false
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('DeepSeek API Error:', errorData);
            return Response.json(
                {
                    error: 'Error al comunicarse con la IA',
                    reply: 'Lo siento, hay un problema con el servicio. Intenta de nuevo más tarde.'
                },
                { status: 500, headers: corsHeaders() }
            );
        }

        const data = await response.json();
        const reply = data.choices[0]?.message?.content || 'No pude generar una respuesta.';

        return Response.json(
            { reply },
            { status: 200, headers: corsHeaders() }
        );

    } catch (error) {
        console.error('Function error:', error);
        return Response.json(
            {
                error: 'Error interno del servidor',
                reply: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.'
            },
            { status: 500, headers: corsHeaders() }
        );
    }
}

// Manejar preflight CORS
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders()
    });
}

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
}
