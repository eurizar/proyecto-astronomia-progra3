using AstronomiaApp.Data;
using AstronomiaApp.Models;
using AstronomiaApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AstronomiaApp.Controllers;

public class AdminController : Controller
{
    private readonly ConsultaService _consultas;
    private readonly AstronomiaDbContext _db;

    public AdminController(ConsultaService consultas, AstronomiaDbContext db)
    {
        _consultas = consultas;
        _db = db;
    }

    private const int PaginaSize = 20;

    // GET /Admin/Consultas
    public async Task<IActionResult> Consultas(int pagina = 1)
    {
        var enCola = _consultas.ObtenerEnCola().ToList();

        int total = await _db.ConsultasLog.CountAsync();
        int totalPaginas = Math.Max(1, (int)Math.Ceiling((double)total / PaginaSize));
        pagina = Math.Clamp(pagina, 1, totalPaginas);

        var historial = await _db.ConsultasLog
            .OrderByDescending(c => c.Fecha)
            .Skip((pagina - 1) * PaginaSize)
            .Take(PaginaSize)
            .ToListAsync();

        ViewBag.EnCola = enCola;
        ViewBag.Historial = historial;
        ViewBag.TamanioActual = _consultas.TamanioActual;
        ViewBag.PaginaActual = pagina;
        ViewBag.TotalPaginas = totalPaginas;
        ViewBag.Total = total;
        return View();
    }

    // POST /Admin/Flush
    [HttpPost]
    public async Task<IActionResult> Flush()
    {
        await _consultas.FlushAsync();
        return RedirectToAction("Consultas");
    }
}
