// netlify/functions/chat.js
const fetch = require('node-fetch');

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

## INFORMACIÓN TÉCNICA DE ELECTRÓNICA (para contexto)
- **Amplificadores Operacionales**: Ganancia, CMRR, slew rate, GBW, estabilidad
- **Filtros activos**: Pasa-bajos, pasa-altos, pasa-banda, Butterworth
- **Reguladores de voltaje**: Lineales (78xx), dropout, disipación térmica
- **Síntesis analógica**: VCO, VCF, VCA, envolventes ADSR, modulación LFO
`;

// ============================================
// SYSTEM PROMPT PARA EL CHATBOT
// ============================================
const SYSTEM_PROMPT = `Eres el asistente técnico del portafolio de Dilan, un estudiante de Ingeniería Electrónica de la Universidad Surcolombiana en Neiva, Colombia.

${PORTFOLIO_CONTEXT}

## TU ROL:
1. Responder preguntas sobre los proyectos de Dilan de forma precisa y técnica
2. Explicar conceptos de electrónica analógica cuando sea relevante
3. Ser amigable pero profesional
4. Responder en español (a menos que te pregunten en inglés)
5. Si no conoces algo específico del portafolio, indica que no tienes esa información

## ESTILO DE RESPUESTA:
- Respuestas concisas pero completas (máximo 150 palabras para preguntas simples)
- Usa terminología técnica apropiada
- Si mencionas ecuaciones, explícalas brevemente
- Puedes usar emojis ocasionalmente para ser más amigable
- No inventes información que no esté en el contexto

## EJEMPLOS DE PREGUNTAS QUE PUEDES RESPONDER:
- "¿Qué proyectos tiene Dilan?"
- "Explícame el amplificador de transimpedancia"
- "¿Qué es el CMRR?"
- "¿Cómo funciona el ADSR del sintetizador?"
- "¿Qué herramientas usa Dilan?"
- "¿Cuál fue el problema del proyecto de la fuente?"`;

// ============================================
// HANDLER DE LA FUNCIÓN
// ============================================
exports.handler = async (event, context) => {
    // Manejar preflight CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Solo permitir POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Método no permitido' })
        };
    }

    try {
        const { message, history = [] } = JSON.parse(event.body);

        if (!message || typeof message !== 'string') {
            return {
                statusCode: 400,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Mensaje requerido' })
            };
        }

        // Construir mensajes para la API
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history.slice(-6), // Últimos 6 mensajes para contexto
            { role: 'user', content: message }
        ];

        // Llamar a DeepSeek API
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
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
            return {
                statusCode: 500,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ 
                    error: 'Error al comunicarse con la IA',
                    reply: 'Lo siento, hay un problema con el servicio. Intenta de nuevo más tarde. 🔧'
                })
            };
        }

        const data = await response.json();
        const reply = data.choices[0]?.message?.content || 'No pude generar una respuesta.';

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reply })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ 
                error: 'Error interno del servidor',
                reply: 'Ocurrió un error inesperado. Por favor, intenta de nuevo. 🔄'
            })
        };
    }
};