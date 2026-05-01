using AstronomiaApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace AstronomiaApp.Controllers;

public class GrafoController : Controller
{
    private readonly GrafoService _grafoService;
    private readonly ConsultaService _consultas;

    public GrafoController(GrafoService grafoService, ConsultaService consultas)
    {
        _grafoService = grafoService;
        _consultas = consultas;
    }

    // GET /Grafo
    public async Task<IActionResult> Index()
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();
        var vm = await _grafoService.ObtenerGrafoCompletoAsync();
        sw.Stop();
        _consultas.Registrar("Grafo", "vista-completa", vm.Nodos.Count() + vm.Aristas.Count(), (int)sw.ElapsedMilliseconds);
        return View(vm);
    }
}
