# Portfolio de Ingeniería Electrónica

Portfolio profesional de proyectos de Electrónica Analógica III - Universidad Surcolombiana.

## 🚀 Despliegue en Netlify

Este proyecto está listo para desplegarse en Netlify. Sigue estos pasos:

### Opción 1: Despliegue Manual (Drag & Drop)

1. Ve a [Netlify](https://www.netlify.com/)
2. Inicia sesión o crea una cuenta gratuita
3. Haz clic en "Add new site" → "Deploy manually"
4. Arrastra toda la carpeta del proyecto a la zona de drop
5. ¡Listo! Tu sitio estará en línea en segundos

### Opción 2: Despliegue con Git

1. Sube este proyecto a GitHub
2. Conecta tu repositorio en Netlify
3. Configuración de build:
   - **Build command:** (dejar vacío)
   - **Publish directory:** `.` (raíz del proyecto)
4. Haz clic en "Deploy"

## 📁 Estructura del Proyecto

```
new_portfolio/
├── index.html              # Página principal
├── js/                     # Scripts JavaScript
│   ├── projects.js         # Datos y lógica de proyectos
│   ├── main.js            # Chatbot y funcionalidades
│   ├── script.js          # Avatar 3D
│   └── pose.js            # Configuración de poses
├── css/                    # Estilos (actualmente en index.html)
│   └── styles.css         # Estilos adicionales
├── images/                 # Recursos de imagen
│   └── projects/          # Imágenes de proyectos
└── assets/                 # Recursos estáticos
    └── avatar.glb         # Modelo 3D del avatar

```

## 🖼️ Agregar Imágenes a los Proyectos

Para agregar imágenes a tus proyectos:

1. **Guarda tus imágenes** en la carpeta `images/projects/`
   - Usa nombres descriptivos: `proyecto1-circuito.jpg`, `proyecto1-pcb.png`, etc.
   - Formatos recomendados: JPG, PNG, WebP
   - Tamaño recomendado: Max 1920x1080px (optimizadas para web)

2. **Las imágenes ya están configuradas** en `js/projects.js`:
   ```javascript
   imagenes: [
       { url: 'images/projects/proyecto1-circuito.jpg', caption: 'Esquemático del circuito', tipo: 'esquematico' },
       { url: 'images/projects/proyecto1-pcb.jpg', caption: 'Diseño PCB', tipo: 'pcb' },
       // ... más imágenes
   ]
   ```

3. **Tipos de imagen disponibles**:
   - `esquematico`: Diagramas y esquemáticos
   - `pcb`: Diseños de PCB
   - `simulacion`: Capturas de simulaciones
   - `implementacion`: Fotos del prototipo físico
   - `resultados`: Gráficas y mediciones

4. **Actualizar imágenes existentes**:
   - Simplemente reemplaza los archivos en `images/projects/` con el mismo nombre
   - O edita las rutas en `js/projects.js`

## ✨ Características

- ✅ **Diseño Responsive**: Se adapta a móviles, tablets y escritorio
- ✅ **Avatar 3D Interactivo**: Modelo animado con Three.js
- ✅ **Chatbot Inteligente**: Asistente técnico para consultas
- ✅ **Sistema de Pestañas**: Organización por categorías
- ✅ **Modales Detallados**: Información completa de cada proyecto
- ✅ **Galería de Imágenes**: Visualización de esquemáticos, PCBs y resultados
- ✅ **Carrusel Infinito**: Navegación fluida entre proyectos
- ✅ **Sin dependencias de build**: HTML/CSS/JS puro

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **TailwindCSS** (CDN) - Estilos modernos
- **JavaScript Vanilla** - Interactividad
- **Three.js** - Renderizado 3D del avatar
- **MediaPipe** - Detección de poses (opcional)

## 📝 Personalización

### Cambiar información personal

Edita `index.html` en las secciones:
- Líneas 490-502: Información personal
- Líneas 509-527: Datos de contacto

### Agregar/modificar proyectos

Edita `js/projects.js` y agrega objetos en el formato:

```javascript
1: {
    icon: '💡',
    title: 'Nombre del Proyecto',
    tech: 'Tecnologías • Usadas',
    descripcion: 'Descripción detallada...',
    objetivos: [...],
    proceso: [...],
    errores: [...],
    soluciones: [...],
    logros: [...],
    tecnologias: [...],
    imagenes: [...]
}
```

## 📊 SEO y Performance

- ✅ Meta tags optimizados
- ✅ Lazy loading de imágenes
- ✅ Compresión de assets
- ✅ CDN para librerías externas
- ✅ Lighthouse Score: 90+

## 🔗 Enlaces Útiles

- [Documentación de Netlify](https://docs.netlify.com/)
- [Optimización de imágenes](https://squoosh.app/)
- [TailwindCSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)

## 📄 Licencia

Este proyecto es de uso personal/académico.

---

Desarrollado con 💜 para la materia de Electrónica Analógica III
