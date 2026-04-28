# Tarea Integrante 3 — Vista Sistema Solar 3D

**Rama de trabajo:** `develop`  
**Tiempo estimado:** 2–3 horas

---

## Antes de empezar — Resetear la base de datos

La BD tiene datos del seed antiguo. Hay que limpiarla y reimportar desde la API.

### Paso 1 — Ejecutar reset en SSMS

1. Abrir **SQL Server Management Studio**
2. Conectarse al servidor (`NOMBRE_TU_PC` o `NOMBRE_TU_PC\SQLEXPRESS`)
3. `Archivo → Abrir → Archivo...` → seleccionar `database/reset.sql`
4. En el desplegable de arriba, seleccionar **AstronomiaDB**
5. Presionar **F5**
6. Resultado esperado al final: `BD limpia. Abrir la app y llamar POST /api/admin/importar`

### Paso 2 — Levantar la app e importar

```bash
cd backend/AstronomiaApp
dotnet run
```

Abrir en browser: `http://localhost:5133`

Presionar el botón **"Importar desde API"** en el catálogo.
Resultado esperado: `Importados: 530, Actualizados: 0, Errores: 0`

> Si el catálogo ya tiene objetos, el botón importar igual funciona — solo actualizará en vez de insertar.

---

## Tarea principal — Integrar el Sistema Solar 3D

### Paso 3 — Copiar y renombrar archivos JS/CSS

Copiar desde `html_20260423_356nnxat1\` hacia `backend\AstronomiaApp\wwwroot\`:

| Archivo origen | Destino | Renombrar a |
|---------------|---------|-------------|
| `api.js` | `wwwroot/js/` | **`solar-api.js`** |
| `script.js` | `wwwroot/js/` | **`solar-script.js`** |
| `navigator.js` | `wwwroot/js/` | **`solar-navigator.js`** |
| `destinations.js` | `wwwroot/js/` | **`solar-destinations.js`** |
| `styles.css` | `wwwroot/css/` | **`sistema-solar.css`** |

> **Importante:** NO copiar `index.html`, `SPEC.md`, `STACK_OPTIMO.txt`  
> **Importante:** El `api.js` que ya existe en `wwwroot/js/` es del proyecto MVC — NO tocarlo

### Paso 4 — Modificar `solar-api.js`

Abrir `wwwroot/js/solar-api.js` y **quitar la API key hardcodeada**.

Buscar esta línea (aproximadamente línea 8):
```js
const API_KEY = '3bba602f-94b5-4c2a-ad34-2eb2ae0259cd';
```

Reemplazar con:
```js
const API_KEY = document.getElementById('solar-canvas-container')?.dataset.apiKey ?? '';
```

### Paso 5 — Crear la vista Razor

Crear el archivo `backend\AstronomiaApp\Views\Objetos\Sistema.cshtml` con este contenido:

```html
@{
    ViewData["Title"] = "Sistema Solar 3D";
    Layout = null;
}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema Solar — Astronomía</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="~/css/sistema-solar.css" asp-append-version="true" />
</head>
<body>

    <!-- Botón volver al catálogo -->
    <a asp-controller="Objetos" asp-action="Index"
       style="position:fixed;top:1rem;left:1rem;z-index:9999;
              color:#00d4ff;font-family:Orbitron,sans-serif;font-size:.75rem;
              background:rgba(0,0,20,.7);padding:.4rem .8rem;border-radius:4px;
              border:1px solid #00d4ff33;text-decoration:none;">
        ← Catálogo
    </a>

    <!-- Contenedor principal — recibe la API key via data attribute -->
    <div id="solar-canvas-container"
         data-api-key="@ViewData["ApiKey"]">
    </div>

    <!--
        AQUÍ: copiar todo el contenido del <body> de index.html
        EXCEPTO los tags <script> del final
        (los divs del HUD, panel de planetas, controles, etc.)
    -->

    <!-- Three.js y dependencias vía CDN -->
    <script src="https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.150.1/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

    <!-- Scripts del sistema solar (orden importa) -->
    <script src="~/js/solar-destinations.js" asp-append-version="true"></script>
    <script src="~/js/solar-api.js" asp-append-version="true"></script>
    <script src="~/js/solar-script.js" asp-append-version="true"></script>
    <script src="~/js/solar-navigator.js" asp-append-version="true"></script>
</body>
</html>
```

### Paso 6 — Agregar la acción en el controlador

Abrir `backend\AstronomiaApp\Controllers\ObjetosController.cs`

**Modificar el constructor** para agregar `IConfiguration`:

```csharp
private readonly ObjetoService _service;
private readonly IConfiguration _configuration;

public ObjetosController(ObjetoService service, IConfiguration configuration)
{
    _service = service;
    _configuration = configuration;
}
```

**Agregar la acción** al final de la clase (antes del `}`):

```csharp
// GET /Objetos/Sistema
public IActionResult Sistema()
{
    ViewData["ApiKey"] = _configuration["SolarSystemApi:ApiKey"] ?? "";
    return View();
}
```

### Paso 7 — Agregar enlace en el navbar

Abrir `backend\AstronomiaApp\Views\Shared\_Layout.cshtml`

Buscar el link del Grafo:
```html
<a class="nav-link" asp-controller="Grafo" asp-action="Index">Grafo</a>
```

Agregar después:
```html
<li class="nav-item">
    <a class="nav-link" asp-controller="Objetos" asp-action="Sistema">Sistema 3D</a>
</li>
```

---

## Verificación

```bash
cd backend/AstronomiaApp
dotnet run
```

Abrir `http://localhost:5133/Objetos/Sistema`

Debe cargar el sistema solar 3D sin errores en la consola del browser (F12).

---

## Checklist antes del commit

- [ ] `solar-api.js` en `wwwroot/js/` con API key removida
- [ ] `solar-script.js` en `wwwroot/js/`
- [ ] `solar-navigator.js` en `wwwroot/js/`
- [ ] `solar-destinations.js` en `wwwroot/js/`
- [ ] `sistema-solar.css` en `wwwroot/css/`
- [ ] Vista `Sistema.cshtml` creada con el HTML del `index.html` original
- [ ] Constructor de `ObjetosController` actualizado con `IConfiguration`
- [ ] Acción `Sistema()` agregada en `ObjetosController`
- [ ] Link "Sistema 3D" visible en el navbar
- [ ] `http://localhost:5133/Objetos/Sistema` carga sin errores
- [ ] Botón "← Catálogo" regresa al catálogo

---

## Convención de commits

```
feat(ui): integrar vista Sistema Solar 3D con Three.js
```

**No modificar:** `ObjetoService.cs`, `GrafoService.cs`, archivos de estructuras de datos, `schema.sql`, `seed.sql`

---

## Tarea adicional — Paginación en el catálogo

El catálogo en `Views/Objetos/Index.cshtml` muestra todos los objetos de una vez (530+). Agregar paginación.

### Comportamiento esperado

- Mostrar **20 objetos por página**
- Controles: `« Anterior` / `Siguiente »` + indicador `Página X de Y`
- La paginación respeta el filtro activo por tipo (Planeta, Asteroide, etc.)
- URL refleja la página: `/?tipo=Planeta&pagina=2`

### Cambios requeridos

**1. `ObjetosController.cs` — acción `Index`:**

```csharp
public async Task<IActionResult> Index(string? tipo, int pagina = 1)
{
    const int porPagina = 20;
    var todos = await _service.ObtenerTodosAsync(tipo);
    var lista = todos.ToList();

    var vm = new CatalogoViewModel
    {
        Objetos    = lista.Skip((pagina - 1) * porPagina).Take(porPagina),
        Tipos      = await _service.ObtenerTiposAsync(),
        TipoActivo = tipo,
        PaginaActual   = pagina,
        TotalPaginas   = (int)Math.Ceiling(lista.Count / (double)porPagina),
        TotalObjetos   = lista.Count
    };
    return View(vm);
}
```

**2. `Models/ViewModels/CatalogoViewModel.cs` — agregar propiedades:**

```csharp
public int PaginaActual  { get; set; } = 1;
public int TotalPaginas  { get; set; } = 1;
public int TotalObjetos  { get; set; } = 0;
```

**3. `Views/Objetos/Index.cshtml` — agregar controles de paginación** al final de la lista de objetos:

```html
@if (Model.TotalPaginas > 1)
{
    <nav class="d-flex justify-content-between align-items-center mt-4">
        <small class="text-muted">
            @Model.TotalObjetos objetos — página @Model.PaginaActual de @Model.TotalPaginas
        </small>
        <ul class="pagination pagination-sm mb-0">
            <li class="page-item @(Model.PaginaActual <= 1 ? "disabled" : "")">
                <a class="page-link bg-dark text-light border-secondary"
                   asp-action="Index"
                   asp-route-tipo="@Model.TipoActivo"
                   asp-route-pagina="@(Model.PaginaActual - 1)">«</a>
            </li>
            <li class="page-item @(Model.PaginaActual >= Model.TotalPaginas ? "disabled" : "")">
                <a class="page-link bg-dark text-light border-secondary"
                   asp-action="Index"
                   asp-route-tipo="@Model.TipoActivo"
                   asp-route-pagina="@(Model.PaginaActual + 1)">»</a>
            </li>
        </ul>
    </nav>
}
```

### Checklist paginación

- [ ] Parámetro `pagina` en acción `Index`
- [ ] Propiedades `PaginaActual`, `TotalPaginas`, `TotalObjetos` en ViewModel
- [ ] Controles « / » visibles en catálogo
- [ ] Filtro por tipo + paginación funcionan juntos
- [ ] URL cambia al navegar páginas

### Commit sugerido

```
feat(ui): paginación en catálogo (20 por página)
```
