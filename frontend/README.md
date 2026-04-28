# Frontend — Sistema de Exploración Astronómica

El frontend está integrado dentro del proyecto ASP.NET Core MVC siguiendo el patrón **Razor Views**, donde el HTML se genera en el servidor y se enriquece con JavaScript del lado del cliente.

## Ubicación del código

| Tipo | Ruta |
|------|------|
| Vistas HTML (Razor) | `backend/AstronomiaApp/Views/` |
| CSS personalizado | `backend/AstronomiaApp/wwwroot/css/` |
| JavaScript | `backend/AstronomiaApp/wwwroot/js/` |
| Imágenes y estáticos | `backend/AstronomiaApp/wwwroot/` |

## Vistas principales

| Vista | Ruta | Descripción |
|-------|------|-------------|
| Catálogo | `/` o `/?tipo=Planeta` | Lista paginada de objetos con filtro por tipo |
| Detalle | `/Objetos/Detalle/{id}` | Ficha completa de un objeto astronómico |
| Buscar | `/Objetos/Buscar?nombre=...` | Búsqueda por nombre (tabla hash + lista enlazada) |
| Ordenar | `/Objetos/Ordenar` | Ordenamiento por atributos usando árbol AVL |
| Grafo | `/Grafo` | Visualización de relaciones entre objetos (Canvas 2D) |
| Sistema 3D | `/Objetos/Sistema` | Sistema Solar interactivo 3D (Three.js) |

## Tecnologías frontend

| Tecnología | Uso | Fuente |
|------------|-----|--------|
| Bootstrap 5.3 | Layout, componentes UI | CDN |
| jQuery 3.7 | Llamadas AJAX al API | CDN |
| Three.js r150 | Renderizado 3D del Sistema Solar | CDN |
| GSAP 3.12 | Animaciones de cámara en vista 3D | CDN |
| Canvas 2D (nativo) | Visualizador de grafo de relaciones | Nativo |
| Razor (.cshtml) | Generación de HTML en servidor | ASP.NET Core |

## Decisión arquitectónica

Se eligió **Razor Views integradas en el backend** (en lugar de un SPA separado) porque:

- El catedrático solicitó ASP.NET Core MVC con Razor como tecnología de presentación.
- Permite generar HTML en servidor con datos tipados en C#.
- Reduce complejidad al no necesitar un proyecto frontend independiente.
- El JavaScript se limita a interactividad (AJAX, Canvas, Three.js) sin framework SPA.
