# SaVia Pastelería — sitio catálogo estático

Sitio de una sola página creado únicamente con HTML5, CSS3 y JavaScript vanilla. No necesita Node.js, npm, base de datos ni proceso de compilación.

## Estructura

```text
/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── images/
    └── icons/
```

## Vista local

1. Descarga o clona la carpeta completa.
2. Abre `index.html` con un navegador moderno.
3. Para una vista más cercana a producción, también puedes usar la extensión **Live Server** de Visual Studio Code, aunque no es obligatoria.

El proyecto utiliza rutas relativas, por lo que también funciona al abrir `index.html` directamente.

## Publicación en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos conservando la estructura de carpetas.
3. Abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama `main` y la carpeta `/ (root)`.
6. Guarda los cambios y espera a que GitHub genere la URL pública.

## Reemplazar imágenes

Las imágenes editables están en `assets/images/`. Puedes reemplazar cada archivo conservando el mismo nombre o modificar las rutas `src` dentro de `index.html`.

Archivos principales:

- `pastel-chocolate.svg`, `pastel-limon.svg`, etc.: productos del catálogo.
- `pastel-personalizado-1.svg` y `pastel-personalizado-2.svg`: ejemplos personalizados.
- `galeria-01.svg` a `galeria-08.svg`: galería de trabajos.
- `equipo.svg`: fotografía de equipo o fundadora.
- `colaboracion.svg`: prints y colaboraciones.
- `og-savia-placeholder.png`: imagen para compartir en redes.

Para fotografías reales, se recomienda exportar archivos WebP o JPG optimizados. Mantén dimensiones cercanas a 1200 × 900 px para conservar buena calidad sin archivos excesivamente pesados.

## Actualizar información de contacto

Busca y reemplaza estos valores en `index.html`:

- `hola@tudominio.com`
- `colaboraciones@tudominio.com`
- `@tuusuario`
- `TU-USUARIO`
- `TU-DOMINIO.com`
- `Dirección por confirmar`
- `Ciudad por confirmar`
- `Horario: por confirmar`

También actualiza los mismos datos dentro del bloque JSON-LD ubicado en el `<head>` de `index.html`.

## Cambiar el número de WhatsApp

Abre `script.js` y edita esta constante:

```js
const WHATSAPP_NUMBER = "593000000000";
```

Usa el código de país y el número completo, sin `+`, espacios ni guiones. Ejemplo de formato: `593999999999`.

El formulario de pedido genera automáticamente un mensaje con tipo de producto, porciones, sabor, fecha, personalización y modalidad de entrega.

## Editar productos y precios

Los productos están escritos directamente en la sección `#catalogo` de `index.html`. Cada producto es un elemento `<article class="product-card">`.

Puedes editar:

- Nombre del producto.
- Descripción.
- Categorías del atributo `data-category`.
- Etiquetas de sabor.
- Número de porciones.
- Texto de precio, actualmente configurado como `Desde $00`.
- Imagen y texto alternativo.

Categorías disponibles para los filtros:

- `chocolate`
- `frutales`
- `clasicos`
- `temporada`

Un producto puede pertenecer a varias categorías separándolas con espacios, por ejemplo:

```html
data-category="chocolate clasicos"
```

## Variables de color

La paleta completa está al inicio de `styles.css`, dentro de `:root`:

```css
--forest-moss: #5A7D19;
--pastel-petals: #F5C1D3;
--amethyst-smoke: #A486AD;
--floral-white: #FFF9F1;
--cream: #F5FDC6;
--soft-mint: #EDFFEC;
--bright-lemon: #FFF234;
```

Estas variables controlan fondos, texto, bordes, botones, stickers y detalles decorativos.

## Funciones incluidas

- Menú móvil accesible.
- Navegación por anclas.
- Filtros estáticos del catálogo.
- Galería con lightbox.
- Animaciones de revelado suaves.
- Compatibilidad con `prefers-reduced-motion`.
- Formulario que genera un mensaje de WhatsApp sin almacenar datos.
- Año del copyright actualizado automáticamente.

## Antes de publicar

- Sustituye todos los datos marcados como editables.
- Reemplaza las ilustraciones por fotografías reales cuando estén disponibles.
- Verifica los precios y las políticas de pedido.
- Prueba el número de WhatsApp.
- Actualiza la imagen Open Graph.
- Revisa el sitio en móvil y escritorio.
