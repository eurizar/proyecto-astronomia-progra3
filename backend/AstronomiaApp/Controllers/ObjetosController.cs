using AstronomiaApp.Models.ViewModels;
using AstronomiaApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace AstronomiaApp.Controllers;

public class ObjetosController : Controller
{
    private const int TamanoPagina = 50;

    private readonly ObjetoService _service;
    private readonly IConfiguration _configuration;
    private readonly ConsultaService _consultas;
    private readonly HistorialService _historial;

    public ObjetosController(ObjetoService service, IConfiguration configuration, ConsultaService consultas, HistorialService historial)
    {
        _service = service;
        _configuration = configuration;
        _consultas = consultas;
        _historial = historial;
    }

    // GET /Objetos  o  /
    public async Task<IActionResult> Index(string? tipo, int pagina = 1)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();
        var objetos = (await _service.ObtenerTodosAsync(tipo)).ToList();
        var tipos = await _service.ObtenerTiposAsync();

        int totalPaginas = Math.Max(1, (int)Math.Ceiling((double)objetos.Count / TamanoPagina));
        pagina = Math.Clamp(pagina, 1, totalPaginas);
        var pagItems = objetos.Skip((pagina - 1) * TamanoPagina).Take(TamanoPagina);

        var vm = new CatalogoViewModel
        {
            Objetos = pagItems.Select(o => new ObjetoViewModel
            {
                Id = o.Id,
                Nombre = o.Nombre,
                Tipo = o.Tipo?.Nombre ?? "",
                MasaKg = o.MasaKg,
                RadioKm = o.RadioKm,
                DistanciaTierraAl = o.DistanciaTierraAl,
                TemperaturaK = o.TemperaturaK,
                Sistema = o.Sistema?.Nombre,
            }),
            FiltroTipo = tipo,
            Total = objetos.Count,
            PaginaActual = pagina,
            TamanoPagina = TamanoPagina
        };

        sw.Stop();
        _consultas.Registrar("Catalogo", tipo ?? "todos", objetos.Count, (int)sw.ElapsedMilliseconds);

        ViewBag.Tipos = tipos;
        return View(vm);
    }

    // GET /Objetos/Detalle/{id}
    public async Task<IActionResult> Detalle(int id)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();
        var obj = await _service.ObtenerPorIdAsync(id);
        if (obj == null) return NotFound();

        var vm = new ObjetoViewModel
        {
            Id = obj.Id,
            Nombre = obj.Nombre,
            Tipo = obj.Tipo?.Nombre ?? "",
            MasaKg = obj.MasaKg,
            RadioKm = obj.RadioKm,
            DistanciaTierraAl = obj.DistanciaTierraAl,
            TemperaturaK = obj.TemperaturaK,
            Luminosidad = obj.Luminosidad,
            Sistema = obj.Sistema?.Nombre,
            Constelacion = obj.Constelacion?.Nombre,
            Descripcion = obj.Descripcion
        };

        sw.Stop();
        _consultas.Registrar("Detalle", obj.Nombre, 1, (int)sw.ElapsedMilliseconds);
        _historial.Registrar(obj.Nombre, $"/Objetos/Detalle/{id}");

        return View(vm);
    }

    // GET /Objetos/Buscar?nombre=...
    public async Task<IActionResult> Buscar(string nombre)
    {
        if (string.IsNullOrWhiteSpace(nombre))
            return View(new BusquedaViewModel { Termino = "", Resultados = Enumerable.Empty<ObjetoViewModel>() });

        var (resultados, exacta) = await _service.BuscarPorNombreAsync(nombre);

        var vm = new BusquedaViewModel
        {
            Termino = nombre,
            Resultados = resultados.Select(o => new ObjetoViewModel
            {
                Id = o.Id,
                Nombre = o.Nombre,
                Tipo = o.Tipo?.Nombre ?? "",
                RadioKm = o.RadioKm,
                DistanciaTierraAl = o.DistanciaTierraAl,
                Sistema = o.Sistema?.Nombre,
            }),
            BusquedaExacta = exacta,
            TotalEncontrados = resultados.Count()
        };

        _consultas.Registrar("Busqueda", nombre, vm.TotalEncontrados);

        return View(vm);
    }

    // GET /Objetos/Ordenar?por=distancia&direccion=asc&tipo=Planeta
    public async Task<IActionResult> Ordenar(string por = "distancia", string direccion = "asc", string? tipo = null, int pagina = 1)
    {
        var objetos = (await _service.OrdenarAsync(por, descendente: direccion == "desc", tipo: tipo)).ToList();
        var tipos = await _service.ObtenerTiposAsync();

        int totalPaginas = Math.Max(1, (int)Math.Ceiling((double)objetos.Count / TamanoPagina));
        pagina = Math.Clamp(pagina, 1, totalPaginas);
        var pagItems = objetos.Skip((pagina - 1) * TamanoPagina).Take(TamanoPagina);

        var vm = new CatalogoViewModel
        {
            Objetos = pagItems.Select(o => new ObjetoViewModel
            {
                Id = o.Id,
                Nombre = o.Nombre,
                Tipo = o.Tipo?.Nombre ?? "",
                MasaKg = o.MasaKg,
                RadioKm = o.RadioKm,
                DistanciaTierraAl = o.DistanciaTierraAl,
                TemperaturaK = o.TemperaturaK,
                Sistema = o.Sistema?.Nombre,
            }),
            OrdenPor = por,
            Direccion = direccion,
            FiltroTipo = tipo,
            Total = objetos.Count,
            PaginaActual = pagina,
            TamanoPagina = TamanoPagina
        };

        ViewBag.Tipos = tipos;
        return View("Index", vm);
    }
    
    // GET /Objetos/BuscarRango?campo=distancia&min=0&max=5&pagina=1
    public async Task<IActionResult> BuscarRango(string campo = "distancia", double? min = null, double? max = null, int pagina = 1)
    {
        var vm = new BusquedaRangoViewModel { Campo = campo, Min = min, Max = max };

        if (min.HasValue && max.HasValue)
        {
            var sw = System.Diagnostics.Stopwatch.StartNew();
            var todos = (await _service.BuscarRangoAsync(campo, min.Value, max.Value))
                .Select(o => new ObjetoViewModel
                {
                    Id = o.Id,
                    Nombre = o.Nombre,
                    Tipo = o.Tipo?.Nombre ?? "",
                    MasaKg = o.MasaKg,
                    RadioKm = o.RadioKm,
                    DistanciaTierraAl = o.DistanciaTierraAl,
                    TemperaturaK = o.TemperaturaK,
                    Sistema = o.Sistema?.Nombre,
                }).ToList();
            sw.Stop();

            int total = todos.Count;
            int totalPaginas = Math.Max(1, (int)Math.Ceiling((double)total / TamanoPagina));
            pagina = Math.Clamp(pagina, 1, totalPaginas);

            vm.Resultados = todos.Skip((pagina - 1) * TamanoPagina).Take(TamanoPagina);
            vm.TotalEncontrados = total;
            vm.PaginaActual = pagina;
            vm.TotalPaginas = totalPaginas;
            vm.BusquedaRealizada = true;

            _consultas.Registrar("BuscarRango", $"{campo}:{min}-{max}", total, (int)sw.ElapsedMilliseconds);
        }

        return View(vm);
    }

    // GET /Objetos/Sistema
    public IActionResult Sistema()
    {
        ViewData["ApiKey"] = _configuration["SolarSystemApi:ApiKey"] ?? "";
        _consultas.Registrar("Sistema3D", "vista-3d", null);
        return View();
    }
}
