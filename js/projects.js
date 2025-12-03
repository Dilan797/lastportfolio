// ============================================
// PROYECTOS DE INGENIERÍA ELECTRÓNICA
// Portfolio - Electrónica Analógica III
// Universidad Surcolombiana | 5to Semestre
// ============================================

const proyectos = {
    // ============================================
    // PROYECTO 1: AMPLIFICADOR TRANSIMPEDANCIA (TIA)
    // ============================================
    1: {
        icon: '💡',
        title: 'Fotodiodo + Amplificador Transimpedancia (TIA)',
        tech: 'OPA140 • TL084 • Análisis de Estabilidad',
        gradient: 'from-amber-400 to-orange-600',
        
        // DESCRIPCIÓN EXHAUSTIVA
        descripcion: `Diseño, simulación e implementación de un amplificador de transimpedancia (TIA) para 
        conversión de corriente de fotodiodo a voltaje proporcional. El proyecto aborda la problemática de 
        medir corrientes extremadamente pequeñas (pA-µA) generadas por fotodiodos, implementando una solución 
        que conserva linealidad y permite fijar el ancho de banda. Las aplicaciones incluyen luxómetros, 
        sensores IR de proximidad, espectrofotometría, monitores de potencia óptica y pulsioximetría médica.`,
        
        // MARCO TEÓRICO
        marcoTeorico: {
            titulo: 'Fundamentos del Amplificador Transimpedancia',
            conceptos: [
                {
                    nombre: 'Modelo del Fotodiodo',
                    descripcion: 'El fotodiodo se modela como fuente de corriente IPD en paralelo con su capacitancia de unión Cj. La corriente generada es proporcional a la potencia óptica incidente.',
                    ecuacion: 'IPD ≈ R(λ) × Popt'
                },
                {
                    nombre: 'Transimpedancia',
                    descripcion: 'La "ganancia" del TIA se define como la relación entre voltaje de salida y corriente de entrada.',
                    ecuacion: 'Zt = Vout/Iin [V/A]'
                },
                {
                    nombre: 'Relación de Salida',
                    descripcion: 'El voltaje de salida depende de la referencia y la corriente amplificada.',
                    ecuacion: 'Vout ≈ Vref + IPD × Rf'
                },
                {
                    nombre: 'Frecuencia de Corte',
                    descripcion: 'Determinada por la resistencia de realimentación y capacitor de compensación.',
                    ecuacion: 'fc = 1/(2π×Rf×Cf)'
                }
            ],
            modosPolarizacion: [
                {
                    modo: 'Fotoconductivo (sesgo inverso)',
                    caracteristica: 'Cj disminuye → mayor ancho de banda',
                    aplicacion: 'Alta velocidad, comunicaciones ópticas'
                },
                {
                    modo: 'Fotovoltaico (sin sesgo)',
                    caracteristica: 'Menor ruido, menor banda',
                    aplicacion: 'Mediciones de precisión, bajo ruido'
                }
            ]
        },

        // OBJETIVOS TÉCNICOS DETALLADOS
        objetivos: [
            'Diseñar un TIA con transimpedancia Zt = 50 kΩ para conversión corriente-voltaje',
            'Alcanzar frecuencia de corte fc ≈ 1 MHz con respuesta plana en banda pasante',
            'Garantizar estabilidad con margen de fase > 45° y rate of closure < 20 dB/dec',
            'Implementar prototipo funcional validando teoría con mediciones experimentales',
            'Analizar límites prácticos: no saturación de salida y requisito de slew rate'
        ],

        // METODOLOGÍA Y PROCESO DETALLADO
        proceso: [
            {
                etapa: 'Análisis Teórico',
                actividades: [
                    'Estudio del modelo del fotodiodo como fuente de corriente con capacitancia parásita',
                    'Derivación de ecuaciones de transimpedancia y frecuencia de corte',
                    'Análisis de límites: |IPD| ≤ Vmargen/Rf para evitar saturación',
                    'Cálculo de slew rate requerido: SRreq = 2π×f×Vp'
                ]
            },
            {
                etapa: 'Diseño del Circuito',
                actividades: [
                    'Selección de OPA140AID (GBW = 11 MHz) para simulación',
                    'Dimensionamiento: Rf = 50 kΩ, Cf = 3.2 pF',
                    'Cálculo de fc teórica: fc = 1/(2π×50kΩ×3.2pF) = 995 kHz',
                    'Configuración de alimentación dual ±15V con desacoplo (C2, C3 = 100nF)'
                ]
            },
            {
                etapa: 'Simulación en LTSpice',
                actividades: [
                    'Configuración de AC sweep con fuente de corriente AC = 1A',
                    'Medición de |Zt| y conversión a dB: dBΩ = 20×log10(|AC[A]|)',
                    'Análisis transitorio con pulso de 5 µA de pico',
                    'Verificación de respuesta en frecuencia de 60 Hz a 5 MHz'
                ]
            },
            {
                etapa: 'Implementación Física',
                actividades: [
                    'Construcción con TL084 como alternativa accesible al OPA140',
                    'Etapa 1: TIA con Rf = 470 kΩ para mayor sensibilidad',
                    'Etapa 2: Amplificador no inversor con ganancia adicional',
                    'Validación con fuente de luz variable (alejada/cercana al fotodiodo)'
                ]
            }
        ],

        // RESULTADOS DE SIMULACIÓN
        resultadosSimulacion: {
            titulo: 'Caracterización del TIA (OPA140, Rf=50kΩ, Cf=3.2pF)',
            tabla: [
                { frecuencia: '60 Hz', zt: '50000 Ω', db: '93.98 dB', vout: '0.250 V' },
                { frecuencia: '1 kHz', zt: '50000 Ω', db: '93.98 dB', vout: '0.250 V' },
                { frecuencia: '100 kHz', zt: '49750 Ω', db: '93.94 dB', vout: '0.249 V' },
                { frecuencia: '1 MHz', zt: '35260 Ω', db: '90.95 dB', vout: '0.176 V' },
                { frecuencia: '5 MHz', zt: '9756 Ω', db: '79.79 dB', vout: '48 mV' }
            ],
            observaciones: [
                'Respuesta plana (±0.04 dB) desde DC hasta 100 kHz',
                'Caída de -3 dB cerca de 1 MHz, confirmando fc teórica',
                'Atenuación significativa (-14.2 dB) a 5 MHz'
            ]
        },

        // ERRORES ENCONTRADOS (ANÁLISIS CRÍTICO)
        errores: [
            {
                problema: 'Inestabilidad con rate of closure ≈ 40 dB/dec',
                descripcion: 'El cruce de ganancia de lazo abierto con 1/β ocurre con pendiente de 40 dB/dec, resultando en margen de fase insuficiente. Esto genera oscilaciones o respuesta sobreamortiguada.',
                evidencia: 'Análisis de Bode muestra "Unstable!!" en región de cruce'
            },
            {
                problema: 'Diferencia entre simulación e implementación',
                descripcion: 'El OPA140 (GBW=11MHz) usado en simulación no está disponible para implementación física. El TL084 tiene GBW menor (~3MHz), limitando el ancho de banda.',
                evidencia: 'Cambio de componente principal del diseño'
            },
            {
                problema: 'Sensibilidad insuficiente en primera etapa',
                descripcion: 'Con Rf=50kΩ, las corrientes típicas de fotodiodos (~nA) generan voltajes muy pequeños difíciles de medir.',
                evidencia: 'Necesidad de aumentar Rf para aplicación práctica'
            }
        ],

        // SOLUCIONES IMPLEMENTADAS
        soluciones: [
            {
                accion: 'Compensación de estabilidad',
                detalle: 'Dos alternativas: (1) Usar AO de mayor GBW como OPA828 (45 MHz), o (2) Aumentar Cf sacrificando ancho de banda pero ganando margen de fase.',
                resultado: 'Se optó por aumentar Cf en implementación práctica'
            },
            {
                accion: 'Sustitución por TL084 con diseño en dos etapas',
                detalle: 'Etapa 1: TIA con Rf=470kΩ para mayor transimpedancia. Etapa 2: Amplificador no inversor para ganancia adicional de voltaje.',
                resultado: 'Sistema funcional con componentes accesibles'
            },
            {
                accion: 'Aumento de resistencia de realimentación',
                detalle: 'Rf aumentada de 50kΩ a 470kΩ, incrementando sensibilidad 9.4x a costa de reducir ancho de banda.',
                resultado: 'Detección efectiva de corrientes en rango 34-79 nA'
            }
        ],

        // RESULTADOS DE IMPLEMENTACIÓN
        resultadosImplementacion: {
            titulo: 'Validación Experimental (TL084, Rf=470kΩ)',
            mediciones: [
                {
                    condicion: 'Luz alejada del fotodiodo',
                    etapa1: '0.016 V',
                    etapa2: '1.776 V',
                    corriente: '~34 nA'
                },
                {
                    condicion: 'Luz cerca del fotodiodo',
                    etapa1: '0.037 V',
                    etapa2: '2.454 V',
                    corriente: '~79 nA'
                }
            ],
            analisis: [
                'Incremento de salida Etapa 1: ΔV = 0.021 V (0.037 - 0.016)',
                'Incremento de salida Etapa 2: ΔV = 0.678 V (2.454 - 1.776)',
                'Amplificación incremental del sistema: ≥ 32× en conjunto medido',
                'El prototipo responde correctamente a variaciones de iluminación'
            ]
        },

        // LOGROS Y CONCLUSIONES
        logros: [
            'Diseño teórico completo con ecuaciones de transimpedancia, frecuencia de corte y límites prácticos',
            'Simulación exitosa alcanzando fc = 995 kHz con respuesta plana hasta 100 kHz (error < 0.04 dB)',
            'Identificación y análisis del problema de estabilidad (rate of closure 40 dB/dec)',
            'Implementación funcional con componentes económicos (TL084 vs OPA140)',
            'Validación experimental: detección de corrientes 34-79 nA con amplificación ≥32×',
            'Documentación completa del proceso incluyendo errores y soluciones'
        ],

        // REFLEXIÓN CRÍTICA
        reflexion: {
            aprendizajes: [
                'La estabilidad en TIAs depende críticamente del producto GBW del op-amp y la capacitancia del fotodiodo',
                'Existe un compromiso fundamental entre ancho de banda y sensibilidad (ganancia)',
                'La simulación es herramienta valiosa pero debe validarse con implementación real',
                'Los componentes comerciales disponibles determinan la viabilidad del diseño'
            ],
            mejoras: [
                'Implementar compensación activa de polo para mejorar estabilidad sin sacrificar BW',
                'Explorar topología de bootstrapping para reducir efecto de capacitancia del fotodiodo',
                'Diseñar PCB con plano de tierra para reducir ruido en mediciones de alta impedancia'
            ]
        },

        // CONTRIBUCIÓN AL EQUIPO
        contribucionEquipo: {
            rolPersonal: 'Diseño teórico, simulación en LTSpice y análisis de estabilidad',
            colaboracion: 'Trabajo conjunto en implementación física y validación experimental',
            impacto: 'Documentación técnica que sirve como referencia para futuros proyectos del curso'
        },

        // TECNOLOGÍAS UTILIZADAS
        tecnologias: ['OPA140AID', 'TL084/TL082', 'Multisim', 'Fotodiodo', 'Osciloscopio Digital', 'Fuente DC ±15V', 'Protoboard'],
        
         // DOCUMENTO PDF LOCAL
        documentoPDF: {
            titulo: 'Informe Técnico Completo',
            archivo: './docs/lluvia_de_aplicaciones.pdf',
            altura: '500px'
        },

        // GALERÍA DE IMÁGENES
        imagenes: [
            { url: 'images/projects/proyecto1-circuito.jpg', caption: 'Esquemático del circuito TIA', tipo: 'esquematico' },
            { url: 'images/projects/proyecto1-pcb.jpg', caption: 'Respuesta en frecuencia 5(MHz) - Multisim', tipo: 'simulacion' },
            { url: 'images/projects/proyecto1-simulacion.jpg', caption: 'Salida de voltaje 5(MHz)  ', tipo: 'simulacion' },
            { url: 'images/projects/proyecto1-prototipo.jpg', caption: 'Prototipo en protoboard', tipo: 'implementacion' }
        ]
    },

    // ============================================
    // PROYECTO 2: AMPLIFICADOR DE INSTRUMENTACIÓN
    // ============================================
    2: {
        icon: '🔌',
        title: 'Amplificador de Instrumentación con TL084',
        tech: 'TL084 • Análisis de Circuitos',
        gradient: 'from-orange-400 to-red-600',
        descripcion: 'Diseño, simulación e implementación de un amplificador de instrumentación de bajo costo como alternativa educativa al AD620, validado con 15 estudiantes de ingeniería.',
        objetivos: [
            'Diseñar amplificador con componentes económicos y accesibles',
            'Alcanzar CMRR > 80dB y precisión comparable al AD620',
            'Validar funcionamiento en aplicaciones reales de medición',
            'Documentar proceso completo para replicación académica'
        ],
        proceso: [
            { etapa: 'Análisis teórico', actividades: ['Cálculo de ganancia, CMRR y rechazo de modo común'] },
            { etapa: 'Simulación', actividades: ['Verificación de respuesta en frecuencia en LTSpice'] },
            { etapa: 'Prototipado', actividades: ['Construcción en protoboard con ajuste fino'] },
            { etapa: 'Medición', actividades: ['Validación con osciloscopio y generador de señales'] },
            { etapa: 'Validación', actividades: ['Pruebas con grupo de estudiantes (N=15)'] }
        ],
        errores: [
            { problema: 'CMRR inicial de 65dB', descripcion: 'Inferior a especificación de 80dB', evidencia: 'Medición directa' },
            { problema: 'Offset de voltaje excesivo', descripcion: 'Sin resistencias de precisión', evidencia: 'Deriva en salida' },
            { problema: 'Ruido elevado', descripcion: 'Sin filtrado capacitivo adecuado', evidencia: 'Oscilaciones en señal' }
        ],
        soluciones: [
            { accion: 'Resistencias 1% para mejor matching', detalle: 'Mejora del balance entre etapas', resultado: 'CMRR > 85dB' },
            { accion: 'Ajuste de trimmer', detalle: 'Eliminación de offset de entrada', resultado: 'Offset < 1mV' },
            { accion: 'Filtros RC y bypass', detalle: 'Desacoplo en alimentación', resultado: 'Ruido reducido 90%' }
        ],
        logros: [
            'CMRR > 85dB alcanzado (superior a meta de 80dB)',
            'Reducción de costos del 72% vs AD620 comercial',
            'Validación exitosa: 14 de 15 estudiantes aprobaron práctica',
            'Documentación completa con esquemáticos y PCB diseñado'
        ],
        tecnologias: ['TL084', 'Multisim', 'KiCad 7.0', 'Osciloscopio Digital', 'Multímetro de Precisión'],
        documentoPDF: {
            titulo: 'Informe Técnico Completo',
            archivo: './docs/Proyecto1.pdf',
            altura: '500px'
        },
        // GALERÍA DE IMÁGENES
        imagenes: [
            { url: 'images/projects/proyecto2-esquematico.png', caption: 'Diagrama esquemático completo', tipo: 'esquematico' },
            { url: 'images/projects/proyecto2-primer_prototipo.jpg', caption: 'Primer prototipo', tipo: 'Mediciones' },
            { url: 'images/projects/proyecto2-mediciones.jpg', caption: 'Mediciones con osciloscopio', tipo: 'resultados'},
            { url: 'images/projects/proyecto2-pcb.jpg', caption: 'Layout PCB diseñado', tipo: 'pcb'}
        ]
    },

    // ============================================
    // PROYECTO 3: POSTER MVP
    // ============================================
    3: {
        icon: '📊',
        title: 'Póster MVP: Metodología Lean Startup en Electrónica',
        tech: 'Divulgación Científica • Trabajo en Equipo • Validación con Usuarios',
        gradient: 'from-teal-400 to-cyan-600',
        
        // DESCRIPCIÓN DEL PROYECTO
        descripcion: `Proyecto de divulgación científica mediante la elaboración de un póster académico (80×160 cm) 
        que documenta la aplicación de la metodología Producto Mínimo Viable (MVP) y Lean Startup en el diseño 
        de circuitos electrónicos. El póster integra los resultados de 4 equipos de trabajo, demostrando que 
        estas metodologías ágiles no son exclusivas del software sino aplicables a la ingeniería electrónica 
        con resultados excepcionales: 95% de productos funcionales, 14 ciclos de iteración y reducción 
        significativa de costos.`,

        // MARCO TEÓRICO
        marcoTeorico: {
            titulo: 'Metodología MVP en Electrónica Analógica',
            conceptos: [
                {
                    nombre: 'Producto Mínimo Viable (MVP)',
                    descripcion: 'Versión simplificada del producto que permite validar la funcionalidad básica con usuarios reales, reduciendo tiempo de desarrollo y detectando errores tempranamente mediante iteraciones rápidas.',
                    ecuacion: 'MVP = Funcionalidad mínima + Validación real'
                },
                {
                    nombre: 'Ciclo Build-Measure-Learn',
                    descripcion: 'Metodología iterativa: Construir prototipo → Medir resultados → Aprender de datos → Ajustar diseño. Permite pivotar cuando los datos lo indican.',
                    ecuacion: 'Idea → Construir → Medir → Datos → Aprender'
                },
                {
                    nombre: 'Validación Temprana',
                    descripcion: 'Probar especificaciones reales antes de fabricar PCBs costosos. Ajustar valores de componentes según mediciones experimentales.',
                    ecuacion: 'Costo_error_temprano << Costo_error_tardío'
                },
                {
                    nombre: 'Pivoteo Informado',
                    descripcion: 'Cambio de dirección basado en evidencia experimental, no en suposiciones. Permite optimizar recursos y tiempo.',
                    ecuacion: 'Pivote = f(Datos, Feedback, Restricciones)'
                }
            ]
        },

        // OBJETIVOS
        objetivos: [
            'Diseñar póster científico de alta calidad visual (80×160 cm) siguiendo estándares académicos',
            'Integrar y analizar resultados de 4 equipos aplicando metodología MVP',
            'Demostrar la aplicabilidad de Lean Startup en ingeniería electrónica',
            'Desarrollar habilidades de comunicación técnica y trabajo colaborativo',
            'Presentar en jornada pública universitaria con interacción con audiencia'
        ],

        // PROCESO DE DESARROLLO
        proceso: [
            {
                etapa: 'Recopilación de Datos',
                actividades: [
                    'Análisis de resultados del Grupo 1: Kit Interactivo de Filtrado',
                    'Análisis de resultados del Grupo 2: Amplificador de Instrumentación',
                    'Análisis de resultados del Grupo 3: Comprobador de Circuitos TTL',
                    'Análisis de resultados del Grupo 4: Generador de Señales Portátil',
                    'Consolidación de métricas: ciclos de iteración, costos, funcionalidad'
                ]
            },
            {
                etapa: 'Diseño del Contenido',
                actividades: [
                    'Estructuración de secciones: MVP, Por qué en electrónica, Resultados, Conclusiones',
                    'Redacción concisa (máx. 100 palabras por sección)',
                    'Selección de figuras representativas de cada grupo',
                    'Creación de infografías con datos cuantitativos'
                ]
            },
            {
                etapa: 'Diseño Visual',
                actividades: [
                    'Definición de paleta de colores (máx. 4 colores)',
                    'Tipografía: Título 48-60pt, Subtítulos 36-40pt, Cuerpo 28-32pt',
                    'Layout en formato vertical 80×160 cm a 300 dpi',
                    'Inclusión de código QR funcional para recursos complementarios'
                ]
            },
            {
                etapa: 'Revisión Colaborativa',
                actividades: [
                    'Socialización con todo el curso para retroalimentación',
                    'Corrección de errores ortográficos y técnicos',
                    'Validación de legibilidad a 2 metros de distancia',
                    'Verificación de QR con datos móviles'
                ]
            },
            {
                etapa: 'Impresión y Presentación',
                actividades: [
                    'Impresión en vinilo con sistema de montaje colgante',
                    'Presentación en jornada pública universitaria',
                    'Interacción con audiencia y respuesta a preguntas',
                    'Documentación fotográfica del evento'
                ]
            }
        ],

        // RESULTADOS DE LOS 4 GRUPOS ANALIZADOS
        resultadosGrupos: {
            titulo: 'Síntesis de Resultados por Equipo',
            grupos: [
                {
                    nombre: 'Grupo 1: Kit Interactivo de Filtrado',
                    color: 'verde',
                    problema: 'Falta de herramientas prácticas para filtrado de señales en laboratorio',
                    solucion: 'Kit de 3 filtros activos con frecuencia de corte variable (Pasa-Bajos, Pasa-Altos, Pasa-Banda)',
                    resultado: 'Prototipo funcional validado con estudiantes de diferentes semestres',
                    aprendizaje: 'Excesiva inversión inicial en frecuencia variable → mejor hacer 4 circuitos diferentes'
                },
                {
                    nombre: 'Grupo 2: Amplificador de Instrumentación',
                    color: 'azul',
                    problema: 'Amplificadores comerciales (AD620) cuestan $30,000-$50,000 COP, inaccesibles para estudiantes',
                    solucion: 'Topología clásica de 3 OpAmps (TL084) con costo < $5,000 COP',
                    resultado: 'CMRR > 80dB, validado con 14 de 15 estudiantes',
                    aprendizaje: '83.3% rechazó complejidad alta con estudio pequeño → validó que el problema es real'
                },
                {
                    nombre: 'Grupo 3: Comprobador de Circuitos TTL',
                    color: 'rojo',
                    problema: 'CIs TTL llegan defectuosos de fábrica, pérdida de tiempo en prácticas',
                    solucion: 'Comprobador analógico para verificar AND y NAND antes de uso',
                    resultado: 'Detección correcta de compuertas funcionales y defectuosas',
                    aprendizaje: 'Identificó que AND/NAND son compuertas más usadas → descartó OR/NOR/XOR a tiempo'
                },
                {
                    nombre: 'Grupo 4: Generador de Señales Portátil',
                    color: 'amarillo',
                    problema: 'Generadores de laboratorio tienen disponibilidad limitada (4 hrs) y alto costo ($2,000,000+)',
                    solucion: 'Generador miniatura portátil con XR2206, rango 1Hz-100kHz, costo < $50,000',
                    resultado: 'Ondas senoidal, triangular y cuadrada funcionales',
                    aprendizaje: '64.3% necesita generador frecuentemente → confirmó demanda antes de invertir recursos'
                }
            ]
        },

        // MÉTRICAS CONSOLIDADAS
        metricasConsolidadas: {
            titulo: 'Datos Relevantes del Proyecto',
            metricas: [
                { indicador: 'Inversión Inicial', valor: '$78K COP', descripcion: 'Total de los 4 grupos (~$20 USD)' },
                { indicador: 'Ciclos de Iteración', valor: '14', descripcion: 'En 4-5 semanas de desarrollo' },
                { indicador: 'Prototipos Construidos', valor: '14', descripcion: 'Múltiples versiones por grupo' },
                { indicador: 'Productos Funcionales', valor: '95%', descripcion: 'Tasa de éxito excepcional' }
            ]
        },

        // ERRORES Y SOLUCIONES
        errores: [
            {
                problema: 'Contenido demasiado extenso inicialmente',
                descripcion: 'Primera versión excedía límite de 100 palabras por sección, dificultando lectura rápida',
                evidencia: 'Revisión a 2m de distancia mostró texto ilegible'
            },
            {
                problema: 'Código QR no funcionaba con datos móviles',
                descripcion: 'URL inicial requería acceso a red universitaria',
                evidencia: 'Prueba con celular externo falló'
            },
            {
                problema: 'Paleta de colores con bajo contraste',
                descripcion: 'Colores seleccionados inicialmente no cumplían estándares de accesibilidad',
                evidencia: 'Retroalimentación del curso en socialización'
            }
        ],
        soluciones: [
            {
                accion: 'Síntesis agresiva del contenido',
                detalle: 'Reescritura de cada sección priorizando datos cuantitativos sobre texto descriptivo',
                resultado: 'Todas las secciones dentro del límite de 100 palabras'
            },
            {
                accion: 'Migración a URL pública',
                detalle: 'Cambio a repositorio GitHub Pages accesible desde cualquier red',
                resultado: 'QR funcional verificado en múltiples dispositivos'
            },
            {
                accion: 'Aplicación de paleta científica',
                detalle: 'Uso de recursos de SimplifiedSciencePublishing para selección de colores',
                resultado: 'Contraste WCAG AA cumplido, legibilidad mejorada'
            }
        ],

        // LOGROS
        logros: [
            'Póster científico profesional de 80×160 cm impreso en vinilo',
            'Integración exitosa de resultados de 4 equipos con análisis comparativo',
            'Demostración cuantitativa: Lean Startup aplicable a electrónica con 95% de éxito',
            'Presentación pública con interacción positiva de la audiencia universitaria',
            'Código QR funcional enlazando a documentación completa del proyecto',
            'Trabajo colaborativo efectivo con retroalimentación iterativa del curso completo'
        ],

        // REFLEXIÓN CRÍTICA
        reflexion: {
            aprendizajes: [
                'La diferencia entre un buen ingeniero y un gran ingeniero no es el conocimiento técnico — es la capacidad de validar hipótesis, pivotar cuando los datos lo indican, e iterar hasta lograr una solución elegante',
                'Validar antes de construir evita desperdicios: los 4 grupos hubieran hecho diseños diferentes sin MVP',
                'La comunicación técnica es tan importante como el diseño técnico mismo',
                'El trabajo en equipo multiplica resultados cuando hay metodología clara'
            ],
            mejoras: [
                'Incluir video complementario con demostración de los 4 prototipos funcionando',
                'Crear versión interactiva digital del póster para mayor alcance',
                'Documentar el proceso de diseño del póster como guía para futuros estudiantes'
            ]
        },

        // CONCLUSIONES DEL PÓSTER
        conclusiones: {
            titulo: 'Lecciones Clave del Proyecto',
            puntos: [
                'VALIDACIÓN: Está desperdiciada cuando no se hace — los grupos hubieran hecho 4 diseños diferentes sin ella',
                'ITERACIÓN: 14 ciclos en 4-5 semanas (más rápido que metodología tradicional)',
                'PIVOTEO: +1 problema detectado y resuelto tempranamente por grupo',
                'RESULTADO: 4 productos funcionales al 95% promedio',
                'INVERSIÓN: $78K COP total (~$20 USD) — prueba de bajo costo de validación temprana'
            ],
            leccionFinal: 'Los estudiantes NO obtienen "productos académicos" para aprobar una materia. Obtienen herramientas reales que ellos u otros estudiantes podrían comprar o continuar desarrollando.'
        },

        // CONTRIBUCIÓN AL EQUIPO
        contribucionEquipo: {
            rolPersonal: 'Coordinación de recopilación de datos, diseño de layout y análisis comparativo de métricas',
            colaboracion: 'Integración con los 4 grupos para obtener información precisa y actualizada',
            impacto: 'Póster como recurso de referencia para futuras generaciones del curso'
        },
         // DOCUMENTO PDF LOCAL
        documentoPDF: {
            titulo: 'Informe Técnico Completo',
            archivo: './docs/Poster_2.pdf',
            altura: '500px'
        },

        // TECNOLOGÍAS/HERRAMIENTAS
        tecnologias: ['Diseño Gráfico (Canva/Illustrator)', 'Metodología Lean Startup', 'Análisis de Datos', 'Comunicación Técnica', 'Trabajo Colaborativo', 'Impresión Gran Formato', 'QR Codes'],

        
    },

    // ============================================
    // PROYECTO 4: FUENTE DE ALIMENTACIÓN REGULADA 5V
    // ============================================
    4: {
        icon: '⚡',
        title: 'Fuente de Alimentación Regulada 5V',
        tech: 'LM7805 • PCB CNC • Regulación Lineal',
        gradient: 'from-green-400 to-teal-600',
        
        descripcion: `Fuente de alimentación regulada de 5V diseñada con el regulador lineal LM7805, con entrada 
        mediante adaptador jack de 2.1mm. El proyecto integra el proceso completo de diseño en KiCad, simulación 
        en Multisim, fabricación de PCB mediante fresadora CNC, y ensamble final con soldadura y pruebas de 
        continuidad. Proporciona una salida estable de 5V para alimentación de circuitos digitales y microcontroladores.`,

        // MARCO TEÓRICO
        marcoTeorico: {
            titulo: 'Fundamentos de Regulación de Voltaje',
            conceptos: [
                {
                    nombre: 'Regulador LM7805',
                    descripcion: 'Regulador de voltaje lineal de la serie 78xx que proporciona una salida fija de 5V con capacidad de hasta 1A. Requiere disipación térmica para corrientes elevadas.',
                    ecuacion: 'Vout = 5V ± 4%'
                },
                {
                    nombre: 'Dropout Voltage',
                    descripcion: 'Diferencia mínima entre voltaje de entrada y salida para regulación correcta. El 7805 requiere al menos 2V de dropout.',
                    ecuacion: 'Vin(min) = Vout + Vdropout = 5V + 2V = 7V'
                },
                {
                    nombre: 'Disipación de Potencia',
                    descripcion: 'Potencia que debe disipar el regulador en forma de calor, determinada por la diferencia de voltaje y la corriente de carga.',
                    ecuacion: 'Pd = (Vin - Vout) × Iload'
                },
                {
                    nombre: 'Capacitores de Filtrado',
                    descripcion: 'Capacitores de entrada (0.33µF) y salida (0.1µF) recomendados para estabilidad y reducción de ripple.',
                    ecuacion: 'Cin ≥ 0.33µF, Cout ≥ 0.1µF'
                }
            ]
        },

        objetivos: [
            'Diseñar fuente regulada de 5V con protección y estabilidad',
            'Aplicar el proceso completo de diseño de PCB con KiCad',
            'Fabricar la placa mediante fresadora CNC',
            'Validar funcionamiento con simulación previa en Multisim',
            'Implementar buenas prácticas de soldadura y pruebas de continuidad',
            'Documentar el proceso como referencia para futuros proyectos'
        ],

        proceso: [
            {
                etapa: 'Diseño del Circuito',
                actividades: [
                    'Selección de componentes: LM7805, capacitores, diodo de protección, LED indicador',
                    'Simulación en Multisim para verificar funcionamiento',
                    'Montaje en protoboard para validación práctica',
                    'Medición de voltaje de salida y ripple'
                ]
            },
            {
                etapa: 'Diseño de PCB en KiCad',
                actividades: [
                    'Creación de esquemático en Eeschema',
                    'Asignación de huellas (footprints) según componentes reales',
                    'Diseño de PCB en PCBnew con trazado de pistas',
                    'Visualización 3D para verificación de dimensiones',
                    'Exportación de archivos Gerber'
                ]
            },
            {
                etapa: 'Generación de G-code con FlatCAM',
                actividades: [
                    'Importación de archivos Gerber y Drill',
                    'Configuración de herramienta (Tool dia: 0.1mm)',
                    'Generación de Isolation Geometry para pistas',
                    'Creación de archivo de taladrado',
                    'Configuración de corte del contorno'
                ]
            },
            {
                etapa: 'Fabricación en CNC',
                actividades: [
                    'Fijación de placa de cobre con cinta doble cara',
                    'Calibración de ejes X, Y, Z en Mach3',
                    'Fresado de pistas (Cut Z: -0.05mm a -0.1mm)',
                    'Taladrado de agujeros para componentes',
                    'Corte del contorno de la placa'
                ]
            },
            {
                etapa: 'Ensamble y Pruebas',
                actividades: [
                    'Limpieza de placa con alcohol isopropílico',
                    'Soldadura de componentes (primero pequeños, luego grandes)',
                    'Limpieza de flux residual',
                    'Pruebas de continuidad con multímetro',
                    'Medición de voltaje de salida bajo carga'
                ]
            }
        ],

        // ESPECIFICACIONES TÉCNICAS
        especificaciones: {
            titulo: 'Especificaciones de la Fuente',
            parametros: [
                { nombre: 'Voltaje de Entrada', valor: '7V - 35V DC', nota: 'Via jack 2.1mm' },
                { nombre: 'Voltaje de Salida', valor: '5V ± 0.2V', nota: 'Regulado' },
                { nombre: 'Corriente Máxima', valor: '1A', nota: 'Con disipador' },
                { nombre: 'Ripple de Salida', valor: '< 10mV', nota: 'A plena carga' },
                { nombre: 'Protección', valor: 'Térmica + Sobrecorriente', nota: 'Integrada en 7805' },
                { nombre: 'Indicador', valor: 'LED rojo', nota: 'Encendido = funcionando' }
            ]
        },

        // LISTA DE COMPONENTES
        componentesBOM: {
            titulo: 'Lista de Materiales (BOM)',
            componentes: [
                { referencia: 'U1', descripcion: 'Regulador LM7805CT', cantidad: 1, huella: 'TO-220' },
                { referencia: 'D1', descripcion: 'Diodo 1N5819 (protección)', cantidad: 1, huella: 'DO-41' },
                { referencia: 'C1', descripcion: 'Capacitor 0.33µF cerámico', cantidad: 1, huella: 'Radial' },
                { referencia: 'C2', descripcion: 'Capacitor 0.1µF cerámico', cantidad: 1, huella: 'Radial' },
                { referencia: 'C3', descripcion: 'Capacitor 10µF electrolítico', cantidad: 1, huella: 'Radial' },
                { referencia: 'C4', descripcion: 'Capacitor 100µF electrolítico', cantidad: 1, huella: 'Radial' },
                { referencia: 'R1', descripcion: 'Resistencia 330Ω', cantidad: 1, huella: 'Axial' },
                { referencia: 'D2', descripcion: 'LED rojo 5mm', cantidad: 1, huella: '5mm' },
                { referencia: 'J1', descripcion: 'Jack DC 2.1mm', cantidad: 1, huella: 'Through-hole' },
                { referencia: 'J2', descripcion: 'Conector salida 2 pines', cantidad: 1, huella: '2.54mm' }
            ]
        },

        errores: [
            {
                problema: 'Regulador sobrecalentamiento',
                descripcion: 'Sin disipador con carga > 500mA y Vin = 12V',
                evidencia: 'Temperatura > 80°C, protección térmica activa'
            },
            {
                problema: 'Ripple excesivo en salida',
                descripcion: 'Capacitor de filtrado insuficiente',
                evidencia: '50mV de ripple medido con osciloscopio'
            },
            {
                problema: 'Pistas no aisladas correctamente',
                descripcion: 'Profundidad de corte insuficiente en CNC',
                evidencia: 'Cortocircuito entre pistas adyacentes'
            },
            {
                problema: 'Polaridad invertida del LED',
                descripcion: 'LED no encendía por conexión invertida',
                evidencia: 'LED no iluminaba con circuito energizado'
            }
        ],

        soluciones: [
            {
                accion: 'Agregar disipador de calor',
                detalle: 'Disipador TO-220 con Rth < 10°C/W',
                resultado: 'Temperatura < 60°C a plena carga'
            },
            {
                accion: 'Aumentar capacitancia de salida',
                detalle: 'Capacitor 100µF electrolítico en paralelo',
                resultado: 'Ripple < 5mV medido'
            },
            {
                accion: 'Ajustar profundidad de corte',
                detalle: 'Cut Z = -0.08mm en FlatCAM',
                resultado: 'Pistas correctamente aisladas'
            },
            {
                accion: 'Verificar datasheet del LED',
                detalle: 'Identificar ánodo (pata larga) y cátodo',
                resultado: 'LED funcionando como indicador'
            }
        ],

        logros: [
            'Voltaje de salida estable: 5.02V ± 0.05V',
            'Ripple medido < 5mV a 500mA de carga',
            'PCB fabricada exitosamente en CNC con 100% de pistas funcionales',
            'Proceso completo documentado desde diseño hasta pruebas',
            'Circuito utilizado para alimentar proyectos posteriores del curso',
            'Primera experiencia exitosa con fabricación de PCB en fresadora CNC'
        ],

        reflexion: {
            aprendizajes: [
                'La simulación previa en protoboard evita errores costosos en fabricación',
                'La calibración del eje Z es crítica para el éxito del fresado de PCB',
                'Los capacitores de filtrado son esenciales para estabilidad del regulador',
                'El proceso integrado KiCad → FlatCAM → Mach3 es eficiente y reproducible'
            ],
            mejoras: [
                'Agregar fusible de protección en la entrada',
                'Implementar versión con voltaje ajustable (LM317)',
                'Diseñar enclosure impreso en 3D para protección'
            ]
        },

        contribucionEquipo: {
            rolPersonal: 'Diseño de PCB, configuración de FlatCAM y supervisión de fresado CNC',
            colaboracion: 'Trabajo en equipo con Felipe Dussan, Dumar Delgado, Felipe Gomez y Juan Diaz',
            impacto: 'Circuito base para alimentación de proyectos del laboratorio'
        },

        tecnologias: ['LM7805', 'KiCad', 'Multisim', 'FlatCAM', 'Mach3', 'Fresadora CNC', 'Soldadura', 'Multímetro'],

        // DOCUMENTO PDF LOCAL
        documentoPDF: {
            titulo: 'Manual de Diseño y Fabricación de PCB en CNC',
            archivo: './docs/Manual_PCB_CNC.pdf',
            altura: '500px'
        },

        imagenes: [
            { url: 'images/projects/proyecto4-esquematico.png', caption: 'Esquemático del regulador 5V', tipo: 'esquematico' },
            { url: 'images/projects/proyecto4-pcb-kicad.png', caption: 'Diseño de PCB en KiCad', tipo: 'pcb' },
            { url: 'images/projects/proyecto4-fresado.png', caption: 'Fresado de pistas en CNC', tipo: 'proceso' },
            { url: 'images/projects/proyecto4-final.png', caption: 'Fuente ensamblada y funcionando', tipo: 'resultado' }
        ]
    },


    // ============================================
    // PROYECTO 5: DOCUMENTACIÓN EG ADSR + LFO
    // ============================================
    5: {
        icon: '🎚️',
        title: 'Investigación y Simulación de EG ADSR + LFO',
        tech: 'NE555 / ICM7555 / TL07x • Multisim',
        gradient: 'from-purple-500 to-blue-500',
        
        descripcion: `Proyecto de investigación centrado en el estudio, documentación y simulación de dos bloques clásicos de síntesis analógica: el generador de envolvente ADSR (EG) y el oscilador de baja frecuencia (LFO). A partir de hojas de datos y esquemas de referencia, se modelaron en simulador SPICE un EG basado en 555/7555 con diodos y buffer TL07x, y un LFO de onda variable en rango sub-audio. Se analizaron tiempos A/D/S/R, rango de frecuencias del LFO y su uso conjunto para modular filtros y VCA.`,

        // MARCO TEÓRICO (resumido)
        marcoTeorico: {
            titulo: 'Fundamentos EG + LFO',
            conceptos: [
                {
                    nombre: 'Envolvente ADSR',
                    descripcion: 'Modelo que define Attack, Decay, Sustain y Release para controlar la amplitud de una nota o la apertura de un filtro.',
                    ecuacion: 'Vout(t) = f(A, D, S, R, gate)'
                },
                {
                    nombre: 'Temporizador 555/7555',
                    descripcion: 'Según los datasheets, usa umbrales 1/3 y 2/3 VCC para cargar y descargar un capacitor. Con diodos y potenciómetros se obtienen los tiempos A/D/R.',
                    ecuacion: 't = R × C × ln(2) ≈ 0.693 × R × C'
                },
                {
                    nombre: 'LFO (Low Frequency Oscillator)',
                    descripcion: 'Oscilador de baja frecuencia (≈0.1–20 Hz) usado para modular parámetros como tono, cutoff o nivel. Se estudió una topología basada en XR2206 / integrador + comparador.',
                    ecuacion: 'f = 1 / (R × C)'
                },
                {
                    nombre: 'Buffer TL07x',
                    descripcion: 'Operacionales TL071/TL074 configurados como seguidor/amplificador para obtener salidas 0–10 V de baja impedancia tanto para el EG como para el LFO.',
                    ecuacion: 'Vout = Vin (seguidor), Zout < 100Ω'
                }
            ]
        },

        objetivos: [
            'Revisar documentación y ejemplos de EG ADSR y LFO en sintetizadores modulares',
            'Modelar en simulación el EG basado en 555/7555 y el LFO RC/XR2206',
            'Medir tiempos de Attack/Decay/Release y el rango de frecuencia del LFO',
            'Evaluar cómo el LFO modula la envolvente y otros bloques (VCA/VCF)',
            'Documentar curvas de envolvente y formas de onda del LFO',
            'Establecer rangos de valores útiles para aplicaciones musicales'
        ],

        proceso: [
            {
                etapa: 'Revisión documental',
                actividades: [
                    'Búsqueda de esquemas de EG y LFO en libros, artículos y proyectos DIY',
                    'Estudio de datasheets NE555/ICM7555, TL071 y XR2206',
                    'Análisis de circuitos de referencia de sintetizadores comerciales',
                    'Identificación de topologías más adecuadas para implementación'
                ]
            },
            {
                etapa: 'Modelado en simulador',
                actividades: [
                    'Implementación del EG con rutas A/D/R separadas por diodos y control de Sustain',
                    'Modelado del LFO con ajuste de frecuencia y selección de forma de onda (triangular/seno aproximado)',
                    'Configuración de modelos Multisim para 555, TL071 y componentes pasivos',
                    'Verificación de rangos de operación según especificaciones'
                ]
            },
            {
                etapa: 'Simulación y análisis',
                actividades: [
                    'Medición de curvas ADSR para distintos valores de RA, RD, RR y Cenv',
                    'Barrido de frecuencia del LFO y observación de la modulación sobre un VCA o filtro simulado',
                    'Registro de capturas de osciloscopio virtual para el informe',
                    'Análisis de respuesta transitoria y estabilidad del circuito'
                ]
            },
            {
                etapa: 'Documentación de resultados',
                actividades: [
                    'Compilación de gráficas de envolvente y señales LFO',
                    'Elaboración de tablas con rangos de tiempos y frecuencias medidas',
                    'Redacción de conclusiones sobre viabilidad de implementación física',
                    'Preparación de informe técnico con capturas y análisis'
                ]
            }
        ],

        // ESPECIFICACIONES TÉCNICAS
        especificaciones: {
            titulo: 'Parámetros Simulados',
            parametros: [
                { nombre: 'EG – Tipo de envolvente', valor: 'ADSR', nota: 'Salida 0–10 V (TL07x)' },
                { nombre: 'EG – Rango de tiempos', valor: '≈1 ms – varios s', nota: 'A/D/R según R·C' },
                { nombre: 'EG – Nivel de Sustain', valor: '0–100% Vpeak', nota: 'Ajustable con potenciómetro' },
                { nombre: 'LFO – Rango de frecuencia', valor: '≈0.1–20 Hz', nota: 'Ajustable con potenciómetro y C' },
                { nombre: 'LFO – Formas de onda', valor: 'Triangular / casi senoidal', nota: 'Según topología seleccionada' },
                { nombre: 'Herramienta de simulación', valor: 'Multisim / LTspice / Proteus', nota: 'Modelos Multisim estándar' }
            ]
        },

        // LISTA DE COMPONENTES
        componentesBOM: {
            titulo: 'Elementos Clave Modelados',
            componentes: [
                { referencia: 'U1', descripcion: 'NE555 / ICM7555 (núcleo EG)', cantidad: 1, huella: 'DIP-8' },
                { referencia: 'U2', descripcion: 'TL071/TL074 (buffer EG y LFO)', cantidad: 1, huella: 'DIP-8/DIP-14' },
                { referencia: 'U3', descripcion: 'XR2206 o bloque RC oscilador LFO', cantidad: 1, huella: 'DIP-16' },
                { referencia: 'D1–D6', descripcion: 'Diodos 1N4148 / Schottky para rutas A/D/R', cantidad: 6, huella: 'DO-35' },
                { referencia: 'POT_A/D/S/R', descripcion: 'Potenciómetros de control de envolvente', cantidad: 4, huella: '10kΩ lineal' },
                { referencia: 'POT_LFO', descripcion: 'Potenciómetro de frecuencia LFO', cantidad: 1, huella: '100kΩ log' },
                { referencia: 'Cenv', descripcion: 'Capacitor de tiempo EG (120nF típico)', cantidad: 1, huella: 'Cerámico/Film' },
                { referencia: 'CLFO', descripcion: 'Capacitor de tiempo LFO (10µF típico)', cantidad: 1, huella: 'Electrolítico' }
            ]
        },

        errores: [
            {
                problema: 'Tiempos de envolvente inconsistentes',
                descripcion: 'Valores de R·C mal calculados en primera iteración',
                evidencia: 'Attack demasiado rápido (< 1ms) para aplicaciones musicales'
            },
            {
                problema: 'LFO con frecuencia inestable',
                descripcion: 'Componentes con tolerancia muy amplia en simulación inicial',
                evidencia: 'Frecuencia variaba ±30% del valor nominal'
            },
            {
                problema: 'Forma de onda LFO distorsionada',
                descripcion: 'Carga del buffer afectando la generación de onda',
                evidencia: 'Onda triangular con picos redondeados'
            },
            {
                problema: 'Nivel de Sustain no ajustable',
                descripcion: 'Falta de divisor de voltaje en etapa de Sustain',
                evidencia: 'Sustain siempre al 100% de Vpeak'
            }
        ],

        soluciones: [
            {
                accion: 'Recalcular constantes R·C',
                detalle: 'Usar rangos típicos: Attack 1-500ms, Decay 10ms-2s, Release 10ms-5s',
                resultado: 'Envolventes con tiempos musicalmente útiles'
            },
            {
                accion: 'Usar componentes con tolerancia ≤5%',
                detalle: 'Resistencias de película metálica, capacitores de poliéster',
                resultado: 'Estabilidad de frecuencia LFO ±5%'
            },
            {
                accion: 'Implementar buffer seguidor de voltaje',
                detalle: 'TL071 en configuración de ganancia unitaria',
                resultado: 'Forma de onda limpia sin distorsión'
            },
            {
                accion: 'Agregar potenciómetro de Sustain',
                detalle: 'Divisor resistivo entre salida Decay y tierra',
                resultado: 'Nivel de Sustain ajustable 0-100%'
            }
        ],

        logros: [
            'Obtención de curvas ADSR claras y ajustables en simulación',
            'Verificación del rango de frecuencia y formas de onda del LFO',
            'Visualización de efectos de modulación LFO → EG/VCA en el osciloscopio virtual',
            'Base teórica y simulada para el diseño físico del módulo de síntesis',
            'Documentación completa de rangos útiles para síntesis musical',
            'Modelo de simulación reutilizable para futuros proyectos'
        ],

        reflexion: {
            aprendizajes: [
                'La combinación EG + LFO es fundamental para dar movimiento y expresividad al sonido',
                'La simulación permite ajustar rangos de tiempos y frecuencias antes de fabricar la PCB',
                'Los datasheets son esenciales para configurar correctamente los modelos en Multisim',
                'El uso de diodos para separar rutas A/D/R permite control independiente de cada segmento'
            ],
            mejoras: [
                'Explorar LFO con formas cuadrada/diente de sierra y sincronía con tempo',
                'Implementar curvas exponenciales en los segmentos de la envolvente',
                'Añadir control de voltaje (CV) para modular los parámetros externamente'
            ]
        },

        contribucionEquipo: {
            rolPersonal: 'Levantamiento de esquemas, configuración de modelos en Multisim y análisis de resultados',
            colaboracion: 'Discusión de parámetros con el equipo para definir rangos musicales útiles',
            impacto: 'Punto de partida para el diseño de un pequeño sistema de síntesis modular académico'
        },

        tecnologias: ['NE555 / ICM7555', 'XR2206 / oscilador RC', 'TL071 / TL074', 'Simulador Multisim', 'Proteus', 'Datasheets y notas de aplicación'],

        // DOCUMENTO PDF LOCAL
        
        documentoPDF: {
            titulo: 'Documentacion requerimientos EG ADSR + LFO',
            archivo: './docs/Informe_EG_LFO.pdf',
            altura: '500px'
        },

        imagenes: [
            { url: 'images/projects/eg-lfo-esquema.png', caption: 'Esquema base del EG ADSR', tipo: 'esquematico base ADSR' },
            { url: 'images/projects/eg-lfo-env-lfo.png', caption: 'Curvas de envolvente y señal ADSR en el osciloscopio virtual', tipo: 'Simulación ADSR' },
            { url: 'images/projects/eg-lfo-modulation.png', caption: 'Esquema base del LFO', tipo: 'esquematico base LFO' },
            { url: 'images/projects/eg-lfo-pcb-preview.png', caption: 'Curvas de envolvente y señal ADSR en el osciloscopio virtual', tipo: 'Simulación LFO' }
        ]
    },
     // ============================================
    // PROYECTO 6: IMPLEMENTACIÓN ADSR + LFO - SINTETIZADOR MOOG
    // ============================================
    6: {
        icon: '🎹',
        title: 'Implementación ADSR + LFO: Sintetizador Moog',
        tech: 'NE555/TLC555 • TL071/TL074 • KiCad • Síntesis Analógica',
        gradient: 'from-indigo-500 to-purple-600',
        
        descripcion: `Diseño, desarrollo y validación completa de los módulos LFO (Low Frequency Oscillator) y ADSR 
        (Attack-Decay-Sustain-Release) para un sintetizador analógico tipo Moog. El proyecto integra simulación en 
        Multisim, prototipado en protoboard, diseño de PCB en KiCad y preparación de archivos Gerber para fabricación 
        comercial (JLCPCB/PCBWay) con costo inferior a 15 USD por módulo. Los módulos generan envolventes musicalmente 
        expresivas y oscilaciones de modulación con formas de onda SQR, TRI y SINE de 1-20 Hz.`,

        // MARCO TEÓRICO
        marcoTeorico: {
            titulo: 'Fundamentos de Síntesis Analógica Modular',
            conceptos: [
                {
                    nombre: 'Envolvente ADSR',
                    descripcion: 'Generador que define Attack (subida), Decay (caída inicial), Sustain (nivel sostenido) y Release (caída final). Controla la evolución temporal de amplitud o filtro.',
                    ecuacion: 'Vout(t) = f(A, D, S, R, gate)'
                },
                {
                    nombre: 'Arquitectura 555 + Op-Amp',
                    descripcion: 'El NE555/TLC555 actúa como comparador y control de fases. El TL071/TL072 proporciona buffer de Sustain y attenuverter de salida (−10V a +10V).',
                    ecuacion: 't = 0.693 × R × C'
                },
                {
                    nombre: 'LFO Schmitt + Integrador',
                    descripcion: 'Núcleo oscilador donde el Schmitt trigger define umbrales de conmutación y el integrador genera rampas lineales para onda triangular.',
                    ecuacion: 'f = 1 / (4 × R × C × ΔV/Vth)'
                },
                {
                    nombre: 'Sine Shaper',
                    descripcion: 'Conversión de onda triangular a senoidal mediante red de diodos que redondea los picos, logrando THD < 5%.',
                    ecuacion: 'THD = √(V2² + V3² + ...) / V1 × 100%'
                }
            ]
        },

        objetivos: [
            'Diseñar módulos ADSR y LFO funcionales para sintetizador tipo Moog',
            'Implementar arquitectura híbrida NE555 + TL071/TL072 con mejoras de estabilidad',
            'Lograr envolventes con tiempos ajustables: Attack 1ms-1s, Decay 50ms-1.2s, Release 50ms-1.5s',
            'Generar LFO con rango 1-20 Hz y formas de onda SQR, TRI, SINE',
            'Diseñar PCB compatible con fabricación comercial (< 15 USD/módulo)',
            'Validar integración con VCO/VCF/VCA del sistema modular',
            'Documentar proceso completo para replicación académica'
        ],

        proceso: [
            {
                etapa: 'Diseño del Circuito ADSR',
                actividades: [
                    'Selección de arquitectura: NE555/TLC555 + TL071/TL072',
                    'Diseño de redes RC independientes para A, D, R con diodos Schottky BAT54',
                    'Implementación de buffer de Sustain para independizar de Decay',
                    'Diseño de attenuverter de salida (−10V a +10V)',
                    'Driver LED aislado para visualización sin afectar envolvente'
                ]
            },
            {
                etapa: 'Diseño del Circuito LFO',
                actividades: [
                    'Implementación de núcleo Schmitt Trigger + Integrador con TL074',
                    'Resistencia de arranque 10MΩ para inicio garantizado',
                    'Selector de rango con capacitores 100nF/1µF (1-20 Hz)',
                    'Diseño de Sine Shaper con diodos y trimmer de calibración',
                    'Buffers dedicados para salidas SQR, TRI, SINE (Zout ≤ 1kΩ)'
                ]
            },
            {
                etapa: 'Simulación en Multisim',
                actividades: [
                    'Verificación de fases ADSR: Attack lineal, Decay exponencial, Sustain estable',
                    'Medición de tiempos con diferentes valores de potenciómetros',
                    'Análisis de formas de onda LFO: duty 50%±5%, amplitud 10Vpp',
                    'Validación de THD < 5% en salida senoidal',
                    'Prueba de modulación cruzada ADSR→VCA, LFO→VCO'
                ]
            },
            {
                etapa: 'Prototipado en Protoboard',
                actividades: [
                    'Montaje de ADSR con diodos Schottky y buffer de Sustain',
                    'Montaje de LFO con selector de frecuencia y shaper de seno',
                    'Mediciones con osciloscopio: envolventes, formas de onda, frecuencias',
                    'Ajustes de valores para normalizar amplitudes a 10Vpp',
                    'Pruebas de integración con módulos VCO/VCF/VCA'
                ]
            },
            {
                etapa: 'Diseño de PCB en KiCad',
                actividades: [
                    'Creación de esquemáticos con símbolos estándar',
                    'Layout de PCB doble cara, FR-4 1.6mm, cobre 1oz',
                    'Trazado con ancho mínimo 10mil, separación 10mil',
                    'Planos de tierra para reducción de ruido',
                    'Verificación DRC/ERC sin errores'
                ]
            },
            {
                etapa: 'Generación de Archivos de Fabricación',
                actividades: [
                    'Exportación de Gerbers (F.Cu, B.Cu, máscara, serigrafía)',
                    'Generación de archivos de taladrado (drill files)',
                    'Creación de BOM optimizada para costo < 15 USD',
                    'Empaquetado .zip compatible con JLCPCB/PCBWay',
                    'Cotización: ~1-1.5 USD por PCB (lote de 5)'
                ]
            }
        ],

        // ESPECIFICACIONES TÉCNICAS
        especificaciones: {
            titulo: 'Especificaciones de los Módulos',
            parametros: [
                { nombre: 'ADSR - Attack', valor: '1 ms – 1 s', nota: 'Ajustable con potenciómetro' },
                { nombre: 'ADSR - Decay', valor: '50 ms – 1.2 s', nota: 'Independiente de Sustain' },
                { nombre: 'ADSR - Sustain', valor: '0 – 100%', nota: 'Referencia bufereada' },
                { nombre: 'ADSR - Release', valor: '50 ms – 1.5 s', nota: 'Caída suave controlada' },
                { nombre: 'ADSR - Salida', valor: '0–10V / ±10V', nota: 'Con attenuverter' },
                { nombre: 'LFO - Frecuencia', valor: '1 – 20 Hz', nota: 'Selector de rango' },
                { nombre: 'LFO - Formas de onda', valor: 'SQR, TRI, SINE', nota: 'Bufferizadas' },
                { nombre: 'LFO - Amplitud', valor: '10 Vpp ±5%', nota: 'Normalizada' },
                { nombre: 'LFO - THD (seno)', valor: '< 5%', nota: 'Con shaper calibrado' },
                { nombre: 'Impedancia salida', valor: '≤ 1 kΩ', nota: 'Ambos módulos' },
                { nombre: 'Gate mínimo', valor: '≥ 5V', nota: 'Compatibilidad modular' },
                { nombre: 'Alimentación', valor: '±12V / ±15V', nota: 'Estándar Eurorack/Moog' }
            ]
        },

        // LISTA DE COMPONENTES
        componentesBOM: {
            titulo: 'Componentes Principales (BOM)',
            componentes: [
                { referencia: 'U1', descripcion: 'NE555 / TLC555 (núcleo ADSR)', cantidad: 1, huella: 'DIP-8' },
                { referencia: 'U2', descripcion: 'TL071/TL072 (buffer + attenuverter)', cantidad: 1, huella: 'DIP-8' },
                { referencia: 'U3', descripcion: 'TL074 (núcleo LFO + buffers)', cantidad: 1, huella: 'DIP-14' },
                { referencia: 'D1-D6', descripcion: 'BAT54/BAT43 Schottky (rutas A/D/R)', cantidad: 6, huella: 'SOD-323' },
                { referencia: 'Q1', descripcion: '2N2222 (driver LED)', cantidad: 2, huella: 'TO-92' },
                { referencia: 'POT A/D/S/R', descripcion: 'Potenciómetros 10kΩ lineal', cantidad: 4, huella: '9mm' },
                { referencia: 'POT Rate', descripcion: 'Potenciómetro 100kΩ log (LFO)', cantidad: 1, huella: '9mm' },
                { referencia: 'C1 (LFO)', descripcion: 'Selector 100nF / 1µF', cantidad: 2, huella: 'Film/Electrolítico' },
                { referencia: 'R arranque', descripcion: 'Resistencia 10MΩ (arranque LFO)', cantidad: 1, huella: '0805' },
                { referencia: 'Trimmer', descripcion: 'Trimmer 10kΩ (calibración seno)', cantidad: 1, huella: '3296W' }
            ]
        },

        errores: [
            {
                problema: 'Decay dependiente del nivel de Sustain',
                descripcion: 'Sin buffer, la resistencia del potenciómetro de Sustain afectaba la curva de Decay',
                evidencia: 'Curvas de Decay inconsistentes en simulación inicial'
            },
            {
                problema: 'Clics audibles al activar gate',
                descripcion: 'El NE555 bipolar genera picos de corriente que se acoplan a la alimentación',
                evidencia: 'Ruido audible en VCA conectado al mismo riel'
            },
            {
                problema: 'LFO no arrancaba en frío',
                descripcion: 'Condición de simetría del integrador impedía inicio de oscilación',
                evidencia: 'Oscilador detenido al encender el sistema'
            },
            {
                problema: 'THD elevada en salida senoidal',
                descripcion: 'Shaper de diodos sin calibración generaba distorsión > 10%',
                evidencia: 'Forma de onda con picos visibles en osciloscopio'
            }
        ],

        soluciones: [
            {
                accion: 'Buffer de Sustain con TL071',
                detalle: 'Seguidor de voltaje que aísla el potenciómetro del nodo de Decay',
                resultado: 'Curvas de Decay predecibles e independientes de Sustain'
            },
            {
                accion: 'Migración a TLC555 CMOS',
                detalle: 'Versión pin-compatible con menor consumo y sin picos de corriente',
                resultado: 'Eliminación de clics, menor ruido en alimentación'
            },
            {
                accion: 'Resistencia de arranque 10MΩ',
                detalle: 'Conectada de salida cuadrada al nodo del integrador',
                resultado: 'Arranque garantizado en frío, oscilación inmediata'
            },
            {
                accion: 'Trimmer de calibración en shaper',
                detalle: 'Ajuste fino de la red de diodos para minimizar distorsión',
                resultado: 'THD < 5% en rango de 0.1-5 Hz'
            }
        ],

        logros: [
            'Módulos ADSR y LFO 100% funcionales validados en protoboard',
            'Envolventes musicalmente expresivas con tiempos ajustables según especificación',
            'LFO con 3 formas de onda (SQR, TRI, SINE) y rango 1-20 Hz cumplido',
            'Integración exitosa con VCO/VCF/VCA del sintetizador modular',
            'PCB diseñada en KiCad lista para fabricación comercial',
            'Costo de fabricación < 15 USD por módulo (objetivo cumplido)',
            'Archivos Gerber y BOM generados para JLCPCB/PCBWay',
            'Documentación técnica completa para replicación académica'
        ],

        reflexion: {
            aprendizajes: [
                'La combinación EG + LFO es fundamental para dar movimiento y expresividad al sonido',
                'El buffer de Sustain es crítico para envolventes predecibles y musicales',
                'La resistencia de arranque en LFO elimina problemas de inicio en frío',
                'Los diodos Schottky mejoran significativamente los tiempos de transición',
                'La migración a CMOS reduce ruido sin cambiar el diseño base'
            ],
            mejoras: [
                'Implementar curvas exponenciales en Attack/Decay para sonido más natural',
                'Añadir entrada CV para control externo de parámetros ADSR',
                'Explorar sincronización de LFO con tempo externo (clock)',
                'Diseñar panel frontal Eurorack para integración completa'
            ]
        },

        contribucionEquipo: {
            rolPersonal: 'Diseño de circuitos, simulación en Multisim y documentación técnica',
            colaboracion: 'Trabajo en equipo con Dumar Delgado, Juan Díaz, Daniel Gómez, Felipe Dussan',
            impacto: 'Módulos base para el sintetizador modular del curso de Electrónica Analógica III'
        },

        tecnologias: ['NE555/TLC555', 'TL071/TL072/TL074', 'Multisim', 'KiCad 7.x', 'Osciloscopio Digital', 'Diodos Schottky BAT54', 'Protoboard', 'Archivos Gerber'],

        // DOCUMENTO PDF LOCAL
        documentoPDF: {
            titulo: 'Informe Técnico Completo - Proyecto ADSR + LFO',
            archivo: './docs/Proyecto_ADSR_LFO.pdf',
            altura: '500px'
        },

        // VIDEO DEL PROYECTO
        videoProyecto: {
            titulo: 'Demostración del Funcionamiento',
            url: './videos/demo-adsr-lfo.mp4',
            tipo: 'local', // 'local' o 'youtube'
            youtubeId: null // Si es YouTube, poner el ID del video
        },

        imagenes: [
            { url: 'images/projects/proyecto6-adsr-protoboard.jpg', caption: 'Prototipo del módulo ADSR', tipo: 'Implementacion ADSR' },
            { url: 'images/foto3.png', caption: 'Medicion osciloscopio módulo LFO', tipo: 'Medición' },
            { url: 'images/projects/proyecto6-protoboard.jpg', caption: 'Prototipo en protoboard LFO', tipo: 'Implementacion LFO' },
            { url: 'images/projects/proyecto6-mediciones.jpg', caption: 'Mediciones onda cuadrada LFO', tipo: 'Medicion Osciloscopio' }
        ]
    },
};


// ============================================
// FUNCIONES DEL MODAL - VERSIÓN MEJORADA
// ============================================

function openProjectModal(projectId) {
    const proyecto = proyectos[projectId];
    const modal = document.getElementById('projectModal');
    
    if (!proyecto || !modal) return;
    
    // Actualizar header
    document.getElementById('modalIcon').textContent = proyecto.icon;
    document.getElementById('modalTitle').textContent = proyecto.title;
    document.getElementById('modalTech').textContent = proyecto.tech;
    
    // Generar contenido según estructura del proyecto
    let content = `<div class="space-y-6">`;
    
    // Descripción
    content += `
        <div>
            <h4 class="text-lg font-bold text-gray-800 mb-2">📋 Descripción del Proyecto</h4>
            <p class="text-gray-600 leading-relaxed">${proyecto.descripcion}</p>
        </div>
    `;
    // PDF Local (si existe)
    if (proyecto.documentoPDF) {
        content += `
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 class="text-lg font-bold text-gray-800 mb-3">📄 ${proyecto.documentoPDF.titulo}</h4>
                <div class="rounded-lg overflow-hidden border border-gray-300 shadow-inner bg-white">
                    <iframe 
                        src="${proyecto.documentoPDF.archivo}"
                        width="100%" 
                        height="${proyecto.documentoPDF.altura}"
                        frameborder="0"
                        class="bg-white"
                        loading="lazy"
                        style="min-height: ${proyecto.documentoPDF.altura};">
                    </iframe>
                </div>
                <div class="flex items-center justify-center gap-4 mt-3">
                    <a href="${proyecto.documentoPDF.archivo}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 hover:underline transition-colors">
                            <span>📖</span> Abrir en nueva pestaña ↗
                    </a>
                    <a href="${proyecto.documentoPDF.archivo}" 
                        download
                        class="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-800 hover:underline transition-colors">
                            <span>📥</span> Descargar PDF
                    </a>
                </div>
            </div>
        `;
    }
    // Video del Proyecto (si existe)
    if (proyecto.videoProyecto) {
        let videoContent = '';
        if (proyecto.videoProyecto.tipo === 'youtube' && proyecto.videoProyecto.youtubeId) {
            // Renderiza iframe de YouTube
            videoContent = `
                <div class="aspect-video rounded-lg overflow-hidden border border-gray-300 shadow-inner">
                    <iframe 
                        src="https://www.youtube.com/embed/${proyecto.videoProyecto.youtubeId}"
                        width="100%" 
                        height="100%"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            `;
        } else {
            // Renderiza video local con controles
            videoContent = `
                <div class="aspect-video rounded-lg overflow-hidden border border-gray-300 shadow-inner bg-black">
                    <video 
                        src="${proyecto.videoProyecto.url}"
                        controls
                        class="w-full h-full">
                        Tu navegador no soporta el elemento de video.
                    </video>
                </div>
            `;
        }
        
        content += `
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <h4 class="text-lg font-bold text-indigo-900 mb-3">🎬 ${proyecto.videoProyecto.titulo}</h4>
                ${videoContent}
            </div>
        `;
    }
    // Galería de Imágenes (si existen)
    if (proyecto.imagenes && proyecto.imagenes.length > 0) {
        content += `
            <div>
                <h4 class="text-lg font-bold text-gray-800 mb-3">🖼️ Galería del Proyecto</h4>
                <div class="grid grid-cols-2 gap-3">
                    ${proyecto.imagenes.map(img => `
                        <div class="group relative bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 cursor-pointer aspect-video" onclick="openImageModal('${img.url}', '${img.caption}')">
                            <img src="${img.url}" alt="${img.caption}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27300%27%3E%3Crect fill=%27%23e5e7eb%27 width=%27400%27 height=%27300%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 font-family=%27monospace%27 font-size=%2720%27 fill=%27%236b7280%27%3EImagen no disponible%3C/text%3E%3C/svg%3E'"/>
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <p class="text-white text-xs font-semibold p-2 leading-tight">${img.caption}</p>
                            </div>
                            <div class="absolute top-2 right-2 bg-purple-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                ${img.tipo}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p class="text-xs text-gray-500 mt-2 text-center italic">Haz clic en cualquier imagen para ampliarla</p>
            </div>
        `;
    }

    // Marco Teórico (si existe)
    if (proyecto.marcoTeorico) {
        content += `
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 class="text-lg font-bold text-blue-900 mb-3">📚 ${proyecto.marcoTeorico.titulo}</h4>
                <div class="space-y-3">
                    ${proyecto.marcoTeorico.conceptos.map(c => `
                        <div class="bg-white rounded p-3 border border-blue-100">
                            <p class="font-semibold text-blue-800">${c.nombre}</p>
                            <p class="text-sm text-gray-600 mb-1">${c.descripcion}</p>
                            <code class="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-purple-700">${c.ecuacion}</code>
                        </div>
                    `).join('')}
                </div>
                ${proyecto.marcoTeorico.modosPolarizacion ? `
                    <div class="mt-4">
                        <p class="font-semibold text-blue-800 mb-2">Modos de Polarización:</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            ${proyecto.marcoTeorico.modosPolarizacion.map(m => `
                                <div class="bg-white rounded p-2 border border-blue-100 text-sm">
                                    <p class="font-medium text-gray-800">${m.modo}</p>
                                    <p class="text-gray-600 text-xs">${m.caracteristica}</p>
                                    <p class="text-blue-600 text-xs">→ ${m.aplicacion}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Objetivos
    content += `
        <div>
            <h4 class="text-lg font-bold text-gray-800 mb-3">🎯 Objetivos Técnicos</h4>
            <ul class="space-y-2">
                ${proyecto.objetivos.map(obj => `
                    <li class="flex items-start gap-2">
                        <span class="text-purple-600 mt-1 flex-shrink-0">✓</span>
                        <span class="text-gray-600">${obj}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    // Proceso (formato mejorado)
    content += `
        <div>
            <h4 class="text-lg font-bold text-gray-800 mb-3">⚙️ Proceso de Desarrollo</h4>
    `;
    
    if (Array.isArray(proyecto.proceso) && proyecto.proceso[0]?.etapa) {
        // Formato nuevo con etapas
        content += `
            <div class="space-y-3">
                ${proyecto.proceso.map((paso, i) => `
                    <div class="border-l-4 border-purple-400 pl-4 py-2">
                        <p class="font-semibold text-purple-800">Etapa ${i + 1}: ${paso.etapa}</p>
                        <ul class="mt-1 space-y-1">
                            ${paso.actividades.map(act => `
                                <li class="text-sm text-gray-600 flex items-start gap-2">
                                    <span class="text-purple-400">•</span>
                                    <span>${act}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        // Formato antiguo (array de strings)
        content += `
            <ol class="space-y-2">
                ${proyecto.proceso.map((paso, i) => `
                    <li class="flex items-start gap-3">
                        <span class="text-purple-600 font-bold flex-shrink-0 bg-purple-50 rounded-full w-6 h-6 flex items-center justify-center text-sm">${i + 1}</span>
                        <span class="text-gray-600 pt-0.5">${paso}</span>
                    </li>
                `).join('')}
            </ol>
        `;
    }
    content += `</div>`;

    // Resultados de Simulación (si existe)
    if (proyecto.resultadosSimulacion) {
        content += `
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 class="text-lg font-bold text-green-900 mb-3">📊 ${proyecto.resultadosSimulacion.titulo}</h4>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="bg-green-600 text-white">
                                <th class="px-3 py-2 text-left">Frecuencia</th>
                                <th class="px-3 py-2 text-left">Zt</th>
                                <th class="px-3 py-2 text-left">dB</th>
                                <th class="px-3 py-2 text-left">Vout (5µA)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${proyecto.resultadosSimulacion.tabla.map(row => `
                                <tr class="border-b border-green-100">
                                    <td class="px-3 py-2 font-mono" style="color: #111827;">${row.frecuencia}</td>
                                    <td class="px-3 py-2 font-mono" style="color: #111827;">${row.zt}</td>
                                    <td class="px-3 py-2 font-mono" style="color: #111827;">${row.db}</td>
                                    <td class="px-3 py-2 font-mono" style="color: #111827;">${row.vout}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="mt-3 space-y-1">
                    ${proyecto.resultadosSimulacion.observaciones.map(obs => `
                        <p class="text-sm text-green-800">• ${obs}</p>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Errores y Soluciones (formato mejorado)
    if (proyecto.errores && proyecto.errores.length > 0) {
        content += `
            <div>
                <h4 class="text-lg font-bold text-gray-800 mb-3">🔧 Análisis de Errores y Soluciones</h4>
                <div class="space-y-4">
        `;
        
        proyecto.errores.forEach((error, i) => {
            const solucion = proyecto.soluciones[i];
            const errorText = typeof error === 'string' ? error : error.problema;
            const errorDesc = typeof error === 'object' ? error.descripcion : '';
            const errorEvidencia = typeof error === 'object' ? error.evidencia : '';
            
            const solText = typeof solucion === 'string' ? solucion : solucion?.accion;
            const solDetalle = typeof solucion === 'object' ? solucion.detalle : '';
            const solResultado = typeof solucion === 'object' ? solucion.resultado : '';
            
            content += `
                <div class="bg-gradient-to-r from-red-50 to-green-50 rounded-lg overflow-hidden border border-gray-200">
                    <div class="p-3 bg-red-50 border-b border-red-100">
                        <p class="font-semibold text-red-800 flex items-center gap-2">
                            <span>❌</span> Error ${i + 1}: ${errorText}
                        </p>
                        ${errorDesc ? `<p class="text-sm text-red-700 mt-1">${errorDesc}</p>` : ''}
                        ${errorEvidencia ? `<p class="text-xs text-red-600 mt-1 italic">Evidencia: ${errorEvidencia}</p>` : ''}
                    </div>
                    <div class="p-3 bg-green-50">
                        <p class="font-semibold text-green-800 flex items-center gap-2">
                            <span>✅</span> Solución: ${solText}
                        </p>
                        ${solDetalle ? `<p class="text-sm text-green-700 mt-1">${solDetalle}</p>` : ''}
                        ${solResultado ? `<p class="text-xs text-green-600 mt-1 font-medium">→ Resultado: ${solResultado}</p>` : ''}
                    </div>
                </div>
            `;
        });
        
        content += `</div></div>`;
    }

    // Resultados de Implementación (si existe)
    if (proyecto.resultadosImplementacion) {
        content += `
            <div class="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h4 class="text-lg font-bold text-amber-900 mb-3">🔬 ${proyecto.resultadosImplementacion.titulo}</h4>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm mb-3">
                        <thead>
                            <tr class="bg-amber-500 text-white">
                                <th class="px-3 py-2 text-left font-semibold">Condición</th>
                                <th class="px-3 py-2 text-left font-semibold">Etapa 1</th>
                                <th class="px-3 py-2 text-left font-semibold">Etapa 2</th>
                                <th class="px-3 py-2 text-left font-semibold">I estimada</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${proyecto.resultadosImplementacion.mediciones.map(row => `
                                <tr class="border-b border-amber-100">
                                    <td class="px-3 py-2" style="color: #111827;">${row.condicion}</td>
                                    <td class="px-3 py-2 font-mono" style="color: #111827;">${row.etapa1}</td>
                                    <td class="px-3 py-2 font-mono" style="color: #111827;">${row.etapa2}</td>
                                    <td class="px-3 py-2 font-mono" style="color: #111827;">${row.corriente}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="space-y-1">
                    ${proyecto.resultadosImplementacion.analisis.map(a => `
                        <p class="text-sm text-amber-800">• ${a}</p>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Logros
    content += `
        <div>
            <h4 class="text-lg font-bold text-gray-800 mb-3">🏆 Logros y Resultados</h4>
            <ul class="space-y-2">
                ${proyecto.logros.map(logro => `
                    <li class="flex items-start gap-2 bg-green-50 p-3 rounded border border-green-100">
                        <span class="text-green-600 text-xl flex-shrink-0">★</span>
                        <span class="text-gray-700">${logro}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    // Reflexión Crítica (si existe)
    if (proyecto.reflexion) {
        content += `
            <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 class="text-lg font-bold text-purple-900 mb-3">💭 Reflexión Crítica</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="font-semibold text-purple-800 mb-2">Aprendizajes Clave:</p>
                        <ul class="space-y-1">
                            ${proyecto.reflexion.aprendizajes.map(a => `
                                <li class="text-sm text-purple-700 flex items-start gap-2">
                                    <span>📌</span>
                                    <span>${a}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div>
                        <p class="font-semibold text-purple-800 mb-2">Mejoras Futuras:</p>
                        <ul class="space-y-1">
                            ${proyecto.reflexion.mejoras.map(m => `
                                <li class="text-sm text-purple-700 flex items-start gap-2">
                                    <span>🔮</span>
                                    <span>${m}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // Contribución al Equipo (si existe)
    if (proyecto.contribucionEquipo) {
        content += `
            <div class="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 class="text-lg font-bold text-indigo-900 mb-3">👥 Contribución al Equipo</h4>
                <div class="space-y-2">
                    <p class="text-sm"><span class="font-semibold text-indigo-800">Rol Personal:</span> <span class="text-gray-700">${proyecto.contribucionEquipo.rolPersonal}</span></p>
                    <p class="text-sm"><span class="font-semibold text-indigo-800">Colaboración:</span> <span class="text-gray-700">${proyecto.contribucionEquipo.colaboracion}</span></p>
                    <p class="text-sm"><span class="font-semibold text-indigo-800">Impacto:</span> <span class="text-gray-700">${proyecto.contribucionEquipo.impacto}</span></p>
                </div>
            </div>
        `;
    }

    // Tecnologías
    content += `
        <div>
            <h4 class="text-lg font-bold text-gray-800 mb-3">💻 Stack Tecnológico</h4>
            <div class="flex flex-wrap gap-2">
                ${proyecto.tecnologias.map(tech => `
                    <span class="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full font-medium shadow-sm">
                        ${tech}
                    </span>
                `).join('')}
            </div>
        </div>
    `;

    // Valor del Proyecto
    content += `
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
            <h4 class="text-lg font-bold text-purple-900 mb-2">💡 Valor y Aprendizaje</h4>
            <p class="text-purple-800 text-sm">
                Este proyecto demuestra competencias en ${proyecto.tecnologias.slice(0, 3).join(', ')}, 
                con énfasis en metodología científica, resolución de problemas técnicos y documentación profesional.
                ${proyecto.reflexion ? ' La reflexión crítica evidencia madurez académica y capacidad de autoevaluación.' : ''}
            </p>
        </div>
    `;

    content += `</div>`;
    
    document.getElementById('modalContent').innerHTML = content;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
});

// ============================================
// MODAL DE IMAGEN AMPLIADA
// ============================================

function openImageModal(imageUrl, caption) {
    // Crear modal si no existe
    let imageModal = document.getElementById('imageModal');

    if (!imageModal) {
        imageModal = document.createElement('div');
        imageModal.id = 'imageModal';
        imageModal.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] hidden items-center justify-center p-4';
        imageModal.innerHTML = `
            <div class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
                <button onclick="closeImageModal()" class="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors text-4xl leading-none" aria-label="Cerrar">×</button>
                <img id="modalImage" src="" alt="" class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"/>
                <p id="modalImageCaption" class="text-white text-sm mt-4 text-center bg-black/50 px-4 py-2 rounded-lg"></p>
            </div>
        `;
        document.body.appendChild(imageModal);

        // Cerrar al hacer clic fuera
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }

    // Actualizar contenido
    document.getElementById('modalImage').src = imageUrl;
    document.getElementById('modalImage').alt = caption;
    document.getElementById('modalImageCaption').textContent = caption;

    // Mostrar modal
    imageModal.classList.remove('hidden');
    imageModal.classList.add('flex');
}

function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.classList.add('hidden');
        imageModal.classList.remove('flex');
    }
}

// ============================================
// CARRUSEL INFINITO
// ============================================

let carouselPaused = false;

function initInfiniteCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const items = track.querySelectorAll('.carousel-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
}

function pauseCarousel() {
    const track = document.querySelector('.carousel-track');
    if (track) {
        track.style.animationPlayState = 'paused';
        carouselPaused = true;
    }
}

function resumeCarousel() {
    const track = document.querySelector('.carousel-track');
    if (track) {
        track.style.animationPlayState = 'running';
        carouselPaused = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initInfiniteCarousel();
    
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', pauseCarousel);
        carousel.addEventListener('mouseleave', resumeCarousel);
    }
});