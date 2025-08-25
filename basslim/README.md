# Basslim - Landing Page

Landing page moderna y receptiva para Basslim, una empresa de soluciones industriales. Este proyecto está construido con HTML5, CSS3 y JavaScript puro, sin dependencias externas.

## Características

- **Diseño Responsive**: Se adapta perfectamente a todos los dispositivos
- **Navegación Suave**: Desplazamiento suave entre secciones
- **Animaciones Modernas**: Efectos sutiles al hacer scroll
- **Menú Mobile**: Navegación optimizada para dispositivos móviles
- **Formulario de Contacto**: Funcionalidad lista para integrar con un backend
- **Optimizado para SEO**: Estructura semántica HTML5

## Estructura del Proyecto

```
basslim/
├── index.html          # Archivo HTML principal
├── css/
│   ├── styles.css      # Estilos principales
│   └── animations.css  # Animaciones y efectos
├── js/
│   ├── main.js         # Funcionalidad principal
│   └── scroll-animations.js  # Animaciones al hacer scroll
└── images/             # Directorio para imágenes
```

## Cómo Usar

1. Clona o descarga este repositorio
2. Abre el archivo `index.html` en tu navegador web
3. Explora la página y las diferentes secciones

## Personalización

### Colores
Los colores principales están definidos como variables CSS en `css/styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --text-light: #7f8c8d;
    --bg-light: #f8f9fa;
    --white: #ffffff;
}
```

### Fuentes
El proyecto utiliza la fuente del sistema por defecto. Para cambiar la fuente, modifica la propiedad `font-family` en el selector `body` en `css/styles.css`.

## Animaciones

Las animaciones se encuentran en `css/animations.css` y se activan mediante las siguientes clases:

- `.animate-on-scroll`: Aparece desde abajo
- `.animate-left`: Desliza desde la izquierda
- `.animate-right`: Desliza desde la derecha
- `.section-reveal`: Revelación suave de secciones

## Compatibilidad

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Compatible con dispositivos móviles y tabletas
- Soporte para IE11 con polyfills adicionales (no incluidos)

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Créditos

- [Font Awesome](https://fontawesome.com/) para los iconos
- Google Fonts (si se incluyen fuentes personalizadas)

---

Diseñado y desarrollado para Basslim - Soluciones Industriales
